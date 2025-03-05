import { GraphQLClient, RequestDocument } from "graphql-request";
import { Factory, Bundle, Pool } from "./types";

export class DragonSwapSubgraphSDK {
  private client: GraphQLClient;

  constructor(endpoint: string) {
    this.client = new GraphQLClient(endpoint);
  }

  private async requestData<T>(
    query: RequestDocument,
    variables: { first: number },
    entityName: string,
  ): Promise<T> {
    try {
      const result = await this.client.request<T>(query, variables);
      return result;
    } catch (error) {
      throw new Error(
        `Failed to fetch ${entityName}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  async getFactories(first: number = 5): Promise<Factory[]> {
    const query = `
      query GetFactories($first: Int!) {
        factories(first: $first) {
          id
          poolCount
          txCount
          totalVolumeUSD
        }
      }
    `;
    const result = await this.requestData<{ factories: Factory[] }>(
      query,
      { first },
      "factories",
    );
    return result.factories;
  }

  async getBundles(first: number = 5): Promise<Bundle[]> {
    const query = `
      query GetBundles($first: Int!) {
        bundles(first: $first) {
          id
          ethPriceUSD
        }
      }
    `;
    const result = await this.requestData<{ bundles: Bundle[] }>(
      query,
      { first },
      "bundles",
    );
    return result.bundles;
  }

  async getPools(first: number = 5): Promise<Pool[]> {
    const query = `
      query GetPools($first: Int!) {
        pools(first: $first) {
          id
          token0
          token1
          fee
          tickSpacing
          blockNumber
          blockTimestamp
          transactionHash
        }
      }
    `;
    const result = await this.requestData<{ pools: Pool[] }>(
      query,
      { first },
      "pools",
    );
    return result.pools;
  }
}
