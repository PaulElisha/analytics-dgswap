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

export interface Token {
  id: string;
  name: string;
  symbol: string;
  decimals: string;
  totalSupply: string;
  txCount: string;
  volume: string;
}

export interface Pool {
  id: string;
  feeTier: string;
  liquidity: string;
  sqrtPrice: string;
  token0: {
    id: string;
    symbol: string;
  };
  token1: {
    id: string;
    symbol: string;
  };
}
