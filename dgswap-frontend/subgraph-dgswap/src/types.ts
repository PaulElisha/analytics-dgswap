export interface Factory {
  id: string;
  poolCount: string;
  txCount: string;
  totalVolumeUSD: string;
}

export interface Bundle {
  id: string;
  ethPriceUSD: string;
}
export interface TokenHourData {
  priceUSD: string;         // Current price in USD
  priceUSDChange?: string;  // Price change (optional, might not always be present)
  hourStartUnix: string;    // Timestamp of hour start
}

// Interface for daily token data (used for 1-day price change and volume)
export interface TokenDayData {
  priceUSD: string;         // Current price in USD
  priceUSDChange?: string;  // Price change (optional)
  volumeUSD: string;        // Daily volume in USD
  date: string;            // Date timestamp
}

// Interface for Token with calculated fields
export interface Token {
  id: string;
  name: string;
  symbol: string;
  decimals: string;
  totalSupply: string;
  txCount: string;
  volume: string;          // Cumulative volume (renamed from volumeUSD in some cases)
  volumeUSD?: number;      // Total volume in USD (optional, from subgraph)
  derivedUSD?: string;     // Price in USD (optional, from subgraph)
  tokenHourData?: TokenHourData[];  // Hourly data for price changes
  tokenDayData?: TokenDayData[];    // Daily data for price changes and volume
  
  // Calculated fields added by useSubgraphData
  priceUSD?: number;              // Calculated current price
  priceChange1h?: number;         // Calculated 1-hour price change percentage
  priceChange1d?: number;         // Calculated 1-day price change percentage
  fullyDilutedValuation?: number; // Calculated FDV (price * totalSupply)
}

// Interface for daily pool data (used for volume and APR)
export interface PoolDayData {
  volumeUSD: string;       // Daily volume in USD
  feesUSD: string;         // Daily fees in USD
  date: string;           // Date timestamp
}

// Interface for Pool with calculated fields
export interface Pool {
  id: string;
  feeTier: string;
  liquidity: string;
  sqrtPrice: string;
  token0: {
    id: string;
    symbol: string;
    name?: string;        // Added for completeness
  };
  token1: {
    id: string;
    symbol: string;
    name?: string;        // Added for completeness
  };
  totalValueLockedUSD?: number;    // TVL in USD (optional, from subgraph)
  volumeUSD?: string;             // Cumulative volume (optional, from subgraph)
  poolDayData?: PoolDayData[];    // Daily data for volume and APR calculations
  
  // Calculated fields added by useSubgraphData
  volumeUSD1d?: number;          // Calculated 1-day volume
  volumeUSD30d?: number;         // Calculated 30-day volume
  apr?: number;                  // Calculated APR
}