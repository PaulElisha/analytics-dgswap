import { DragonSwapSubgraphSDK } from "../src";

type SDKMethod<T> = () => Promise<T[]>;

async function testQuery<T>(
  sdk: DragonSwapSubgraphSDK,
  method: SDKMethod<T>,
  name: string,
) {
  try {
    const result = await method();
    console.log(`${name}:`, JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(`Failed to fetch ${name}:`, error);
  }
}

async function testSDK() {
  // subgraph endpoint
  const endpoint =
    "https://gateway.thegraph.com/api/5733d860ca08946bf713149481b3acbd/subgraphs/id/DFu3UKnkVWq4xgYq5NFerMu6puA9SkqdMyjjWmauwqqM";
  const sdk = new DragonSwapSubgraphSDK(endpoint);

  await testQuery(sdk, () => sdk.getFactories(5), "Factories");
  await testQuery(sdk, () => sdk.getBundles(5), "Bundles");
  await testQuery(sdk, () => sdk.getPools(5), "Pools");
  await testQuery(sdk, () => sdk.getTokens(5), "Tokens");
}

testSDK();
