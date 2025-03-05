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

export interface Pool {
  id: string;
  token0: string;
  token1: string;
  fee: string;
  tickSpacing: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
}
