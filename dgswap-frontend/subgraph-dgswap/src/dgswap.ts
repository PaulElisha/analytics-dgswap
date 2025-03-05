import { PoolCreated as PoolCreatedEvent } from "../generated/dgswap/dgswap";
import { Factory, Bundle, Pool } from "../generated/schema";
import { BigInt, BigDecimal } from "@graphprotocol/graph-ts";

let FACTORY_ADDRESS = "0x7431A23897ecA6913D5c81666345D39F27d946A4";
let ZERO_BI = BigInt.fromI32(0);
let ZERO_BD = BigDecimal.fromString("0");

function getOrCreateFactory(): Factory {
  let factory = Factory.load(FACTORY_ADDRESS);
  if (factory == null) {
    factory = new Factory(FACTORY_ADDRESS);
    factory.poolCount = ZERO_BI;
    factory.txCount = ZERO_BI;
    factory.totalVolumeUSD = ZERO_BD;
    factory.save();
  }
  return factory;
}

function getOrCreateBundle(): Bundle {
  let bundle = Bundle.load("1");
  if (bundle == null) {
    bundle = new Bundle("1");
    bundle.ethPriceUSD = ZERO_BD; // Placeholder;
    bundle.save();
  }
  return bundle;
}

export function handlePoolCreated(event: PoolCreatedEvent): void {
  // Factory
  let factory = getOrCreateFactory();
  factory.poolCount = factory.poolCount.plus(BigInt.fromI32(1));
  factory.txCount = factory.txCount.plus(BigInt.fromI32(1));
  factory.save();

  // Create Pool
  let pool = new Pool(event.transaction.hash.concatI32(event.logIndex.toI32()));
  pool.token0 = event.params.token0;
  pool.token1 = event.params.token1;
  pool.fee = event.params.fee;
  pool.tickSpacing = event.params.tickSpacing;
  pool.blockNumber = event.block.number;
  pool.blockTimestamp = event.block.timestamp;
  pool.transactionHash = event.transaction.hash;
  pool.save();

  // Ensure Bundle exists
  getOrCreateBundle();
}
