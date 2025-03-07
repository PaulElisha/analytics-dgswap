// import { DragonSwapSubgraphSDK } from "@PaulElisha/subgraph-dgswap";

import { DragonSwapSubgraphSDK} from "../../subgraph-dgswap/src";

const ENDPOINT = `https://gateway.thegraph.com/api/${import.meta.env.VITE_GRAPH_API_KEY}/subgraphs/id/DFu3UKnkVWq4xgYq5NFerMu6puA9SkqdMyjjWmauwqqM`;
export const sdk = new DragonSwapSubgraphSDK(ENDPOINT);
