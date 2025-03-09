import { useState, useEffect } from "react";
import { sdk } from "../lib/sdk"; 
import { Factory, Pool, Token } from "../../subgraph-dgswap/src";



interface ProcessedPool extends Pool {
  totalValueLockedUSD: number; // Override to number from string | undefined
  volumeUSD1d: any;
  volumeUSD30d:any;
  apr: any;
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
    // if (!previousPrice) return 0;
    return ((currentPrice - previousPrice) / previousPrice) * 100;
  };

  const processTokens = (tokensData: Token[]): ProcessedToken[] => {
    return tokensData.map((token) => {
      const hourData = token.tokenHourData || [];
      const dayData = token.tokenDayData || [];
  
      // Get current price (most recent hour or day)
      const currentPrice = Number(hourData[0]?.priceUSD || dayData[0]?.priceUSD || token.derivedUSD || 0);
  
      // Calculate 1-hour price change (compare current with previous hour)
      const latestHourPrice = Number(hourData[0]?.priceUSD || 0);
      const previousHourPrice = Number(hourData[1]?.priceUSD || latestHourPrice); // Use current if no previous
      const priceChange1h = hourData.length > 1 && previousHourPrice > 0
        ? calculatePriceChange(latestHourPrice, previousHourPrice)
        : 0;
  
      // Calculate 1-day price change (compare current with previous day)
      const latestDayPrice = Number(dayData[0]?.priceUSD || 0);
      const previousDayPrice = Number(dayData[1]?.priceUSD || latestDayPrice); // Use current if no previous
      const priceChange1d = dayData.length > 1 && previousDayPrice > 0
        ? calculatePriceChange(latestDayPrice, previousDayPrice)
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
        volumeUSD: Number(dayData[0]?.volumeUSD || token.volumeUSD || 0),
      };
    });
  };

  const processPools = (poolsData: Pool[]): ProcessedPool[] => {
    return poolsData.map((pool) => {
      // Latest day data for APR and 1-day volume
      const latestAprData = pool.apr?.[0]; 
      const latestVolume1dData = pool.volumeUSD1d?.[0]; 
  

      const volumeUSD30d = pool.volumeUSD30d
        ?.reduce((sum, day) => sum + Number(day.volumeUSD || 0), 0) || 0;
  

      const feesUSD = Number(latestAprData?.feesUSD || 0);
      const volumeUSD = Number(latestAprData?.volumeUSD || 0);
      const apr = volumeUSD > 0 ? (feesUSD / volumeUSD) * 365 * 100 : 0;
  
   
      const volumeUSD1d = Number(latestVolume1dData?.volumeUSD || 0);
  
      return {
        ...pool,
        totalValueLockedUSD: Number(pool.totalValueLockedUSD || 0),
        volumeUSD1d,
        volumeUSD30d,
        apr,
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