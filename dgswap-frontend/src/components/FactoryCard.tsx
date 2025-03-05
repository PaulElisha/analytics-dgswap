import React from "react";
import { Factory } from "../../subgraph-dgswap/src";
import { formatUSD } from "../utils/format";

interface FactoryCardProps {
  factory: Factory;
}

export const FactoryCard: React.FC<FactoryCardProps> = ({ factory }) => {
  return (
    <div className="bg-[#2d2d2d] p-4 rounded-md transition-all duration-300 hover:bg-[#333] hover:scale-105 cursor-pointer">
      <h3 className="text-base sm:text-lg font-semibold text-white truncate">
        Factory {factory.id.slice(0, 6)}...
      </h3>
      <p className="mt-2 text-sm text-gray-400">
        Pools: <span className="text-white">{factory.poolCount}</span>
      </p>
      <p className="mt-1 text-sm text-gray-400">
        Tx: <span className="text-white">{factory.txCount}</span>
      </p>
      <p className="mt-1 text-sm text-gray-400">
        Volume: <span className="text-white">{formatUSD(factory.totalVolumeUSD)}</span>
      </p>
    </div>
  );
};