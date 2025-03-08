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

  async getPools(first: number = 20): Promise<Pool[]> { //  `first`
    const query = `
     query GetPools($first: Int!) {
  pools(first: $first, orderBy: totalValueLockedUSD, orderDirection: desc) {
    id
    token0 {
      symbol
      name
    }
    token1 {
      symbol
      name
    }
    totalValueLockedUSD  # TVL
    feeTier
    volumeUSD           # Cumulative volume
    volumeUSD1d: poolDayData(orderBy: date, orderDirection: desc, first: 1) {
      volumeUSD         # 1D volume
    }
    volumeUSD30d: poolDayData(orderBy: date, orderDirection: desc, first: 30) {
      volumeUSD         # 30D volume will need aggregation on client-side
    }
    apr: poolDayData(orderBy: date, orderDirection: desc, first: 1) {
      feesUSD
      volumeUSD
      # APR would need to be calculated: (feesUSD/volumeUSD) * 365 * 100
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
  
  async getTokens(first: number = 20): Promise<Token[]> { //  `first`
    const query = `
     query GetTokens($first: Int!) {
  tokens(first: $first, orderBy: volumeUSD, orderDirection: desc) {
    id
    name
    symbol
    totalSupply
    volumeUSD           # Total volume
    derivedUSD          # Price in USD
    fullyDilutedValuation: totalValueLockedUSD  # FDV = price * total supply
    tokenHourData(orderBy: periodStartUnix, orderDirection: desc, first: 1) {
      priceUSD          # Latest price
  
    }
    tokenDayData(orderBy: date, orderDirection: desc, first: 1) {
      priceUSD         # Latest price
      volumeUSD        # 1-day volume
    }
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
