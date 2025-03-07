import { useState, useEffect } from "react";
import { sdk } from "../lib/sdk";
import { Factory, Pool } from "../../subgraph-dgswap/src";


type DataType = "factories" | "pools";

export const useSubgraphData = (dataType: DataType, limit: number = 5) => {
  const [factories, setFactories] = useState<Factory[]>([]);
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (dataType === "factories") {
          const data = await sdk.getFactories();
          setFactories(data);
          setPools([]); // Reset pools
          console.log("Fetched factories:", data);
        } else if (dataType === "pools") {
          const data = await sdk.getPools();
          setPools(data);
          setFactories([]); // Reset factories
          console.log("Fetched pools:", data);
        }
        else if (dataType === "tokens") {

          setFactories([])
          setPools([])
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : `Failed to fetch ${dataType}`;
        console.error("Fetch error:", err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dataType, limit]);

  return { factories, pools, loading, error };
};