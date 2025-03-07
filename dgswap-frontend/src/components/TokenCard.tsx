import React from "react";
import { Token } from "../../subgraph-dgswap/src";

interface TokenCardProps {
  token: Token;
}

export const TokenCard: React.FC<TokenCardProps> = ({ token }) => {
  return (
    <div className="bg-gray-800/70 backdrop-blur-md p-6 rounded-lg shadow-lg border border-gray-700/50 hover:border-blue-500 transform hover:scale-105 transition-all duration-300">
      <h3 className="text-lg font-semibold text-blue-300">
        {token?.name} ({token.symbol})
      </h3>
      <p className="mt-2 text-gray-300">ID: <span className="font-mono text-white">{token.id.slice(0, 6)}...</span></p>
      <p className="mt-1 text-gray-300">Total Supply: <span className="font-mono text-white">{token.totalSupply}</span></p>
      <p className="mt-1 text-gray-300">Transactions: <span className="font-mono text-white">{token.txCount}</span></p>
      <p className="mt-1 text-gray-300">Volume: <span className="font-mono text-white">{token.volume}</span></p>
    </div>
  );
};
