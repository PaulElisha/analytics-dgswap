import { GraphQLClient, RequestDocument } from "graphql-request";
import { Factory, Bundle, Pool, Token } from "./types";

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

  // async getPools(first: number = 5): Promise<Pool[]> {
  //   const query = `
  //     query GetPools($first: Int!) {
  //       pools(first: $first) {
  //         id
  //         feeTier
  //         liquidity
  //         sqrtPrice
  //         token0 {
  //           id
  //           symbol
  //         }
  //         token1 {
  //           id
  //           symbol
  //         }
  //       }
  //     }
  //   `;
  //   const result = await this.requestData<{ pools: Pool[] }>(
  //     query,
  //     { first },
  //     "pools"
  //   );
  //   return result.pools;
  // }
  

  // async getTokens(first: number = 5): Promise<Token[]> {
  //   const query = `
  //     query GetTokens($first: Int!) {
  //       tokens(first: $first) {
  //         id
  //         name
  //         symbol
  //         decimals
  //         totalSupply
  //         txCount
  //         volume
  //       }
  //     }
  //   `;
  //   const result = await this.requestData<{ tokens: Token[] }>(
  //     query,
  //     { first },
  //     "tokens"
  //   );
  //   return result.tokens;
  // }

  async getPools(first: number = 20): Promise<Pool[]> { // 🔥 FIXED: Accepts `first`
    const query = `
      query GetPools($first: Int!) {
        pools(first: $first) {
          id
          feeTier
          liquidity
          sqrtPrice
          token0 {
            id
            symbol
          }
          token1 {
            id
            symbol
          }
        }
      }
    `;
  
    return this.requestData<{ pools: Pool[] }>(
      query,
      { first },
      "pools"
    ).then(result => result.pools);
  }
  
  async getTokens(first: number = 20): Promise<Token[]> { // 🔥 FIXED: Accepts `first`
    const query = `
      query GetTokens($first: Int!) {
        tokens(first: $first, orderBy: volume, orderDirection: desc) {
          id
          name
          symbol
          decimals
          totalSupply
          txCount
          volume
        }
      }
    `;
  
    return this.requestData<{ tokens: Token[] }>(
      query,
      { first },
      "tokens"
    ).then(result => result.tokens);
  }
  
  
  
}
