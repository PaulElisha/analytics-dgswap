import { useState, useEffect } from "react";
import { sdk } from "../lib/sdk"; 
import { Factory, Pool, Token } from "../../subgraph-dgswap/src";

export const useSubgraphData = (limit: number = 5) => {
  const [factories, setFactories] = useState<Factory[]>([]);
  const [pools, setPools] = useState<Pool[]>([]);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [factoriesData, poolsData, tokensData] = await Promise.all([
          sdk.getFactories(limit),
          sdk.getPools(limit),
          sdk.getTokens(limit),
        ]);

        setFactories(factoriesData);
        setPools(poolsData);
        setTokens(tokensData);
        
        console.log("Factories:", factoriesData);
        console.log("Pools:", poolsData);
        console.log("Tokens:", tokensData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [limit]);

  return { factories, pools, tokens, loading, error };
};
