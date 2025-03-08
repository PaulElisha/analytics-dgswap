import { useState, useEffect } from "react";
import { sdk } from "../lib/sdk"; 
import { Factory, Pool, Token } from "../../subgraph-dgswap/src";



interface ProcessedPool extends Pool {
  totalValueLockedUSD: number; // Override to number from string | undefined
  volumeUSD1d: number;
  volumeUSD30d: number;
  apr: number;
}

// Define the extended Token type including calculated fields
interface ProcessedToken extends Token {
  priceUSD: number;
  priceChange1h: number;
  priceChange1d: number;
  fullyDilutedValuation: number;
  volumeUSD: number;
}


export const useSubgraphData = (limit: number = 5) => {
  const [factories, setFactories] = useState<Factory[]>([]);
  const [pools, setPools] = useState<ProcessedPool[]>([]);
  const [tokens, setTokens] = useState<ProcessedToken[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to calculate percentage change
  const calculatePriceChange = (currentPrice: number, previousPrice: number) => {
    if (!previousPrice) return 0;
    return ((currentPrice - previousPrice) / previousPrice) * 100;
  };

  const processTokens = (tokensData: Token[]): ProcessedToken[] => {
    return tokensData.map(token => {
      const latestHourData = token.tokenHourData?.[0];
      const latestDayData = token.tokenDayData?.[0];
      
      // Get current price from either hour or day data (whichever is more recent)
      const currentPrice = Number(latestHourData?.priceUSD || latestDayData?.priceUSD || token.derivedUSD || 0);
      
      // Calculate 1-hour price change
      const hourPreviousPrice = Number(latestHourData?.priceUSDChange || 0);
      const priceChange1h = latestHourData 
        ? calculatePriceChange(currentPrice, currentPrice - hourPreviousPrice)
        : 0;

      // Calculate 1-day price change
      const dayPreviousPrice = Number(latestDayData?.priceUSDChange || 0);
      const priceChange1d = latestDayData
        ? calculatePriceChange(currentPrice, currentPrice - dayPreviousPrice)
        : 0;

      // Calculate FDV (price * total supply)
      const totalSupply = Number(token.totalSupply || 0);
      const fdv = currentPrice * totalSupply;

      return {
        ...token,
        priceUSD: currentPrice,
        priceChange1h,
        priceChange1d,
        fullyDilutedValuation: fdv,
        volumeUSD: Number(latestDayData?.volumeUSD || token.volumeUSD || 0)
      };
    });
  };

  const processPools = (poolsData: Pool[]): ProcessedPool[] => {
    return poolsData.map(pool => {
      const latestDayData = pool.poolDayData?.[0];
      
      // Calculate 30D volume
      const volumeUSD30d = pool.poolDayData
        ?.slice(0, 30)
        .reduce((sum, day) => sum + Number(day.volumeUSD || 0), 0) || 0;

      // Calculate APR
      const feesUSD = Number(latestDayData?.feesUSD || 0);
      const volumeUSD = Number(latestDayData?.volumeUSD || 0);
      const apr = volumeUSD > 0 ? (feesUSD / volumeUSD) * 365 * 100 : 0;

      return {
        ...pool,
        totalValueLockedUSD: Number(pool.totalValueLockedUSD || 0),
        volumeUSD1d: Number(latestDayData?.volumeUSD || 0),
        volumeUSD30d,
        apr
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [factoriesData, poolsData, tokensData] = await Promise.all([
          sdk.getFactories(limit),
          sdk.getPools(limit),
          sdk.getTokens(limit),
        ]);

        // Process data with calculations
        const processedPools = processPools(poolsData);
        const processedTokens = processTokens(tokensData);

        setFactories(factoriesData);
        setPools(processedPools);
        setTokens(processedTokens);
        
        console.log("Factories:", factoriesData);
        console.log("Processed Pools:", processedPools);
        console.log("Processed Tokens:", processedTokens);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [limit]);

  return { factories, pools, tokens, loading, error };
};