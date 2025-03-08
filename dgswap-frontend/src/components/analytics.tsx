"use client"
import { formatUSD, formatNumber } from "../utils/format"
import { useState } from "react"
import { useSubgraphData } from "../hooks/useSubgraphData"
import { Header } from "../components/Header"
import { OverviewStats } from "../components/overview-stats"
import { TabNavigation } from "../components/tab-navigation"
import { DataTable } from "../components/data-table"
import { SearchFilter } from "../components/search-filter"
import { TimeframeSelector } from "../components/timeframe-selector"
import { NavSelector } from "./navigation"
import { ArrowUpDown } from "lucide-react"
import { Tvl } from "./Area"
import { Barchart } from "./Barchart"

export function Analytics() {
  const [activeTab, setActiveTab] = useState<"overview" | "pools" | "tokens">("overview")
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d" | "all">("24h")
  const [searchQuery, setSearchQuery] = useState("")
  const [limit, _] = useState(10)
  const [activeNav, setActiveNav] = useState<"Pools" | "Tokens">("Pools")



  const { factories, pools, tokens, loading, error } = useSubgraphData(limit);
console.log("tokens", tokens);
console.log("factories", factories);
console.log("pools", pools);

  const totalVolumeUSD = factories.reduce((sum, f) => sum + Number(f.totalVolumeUSD), 0)
  const totalPools = factories.reduce((sum, f) => sum + Number(f.poolCount), 0)
  const totalTxs = factories.reduce((sum, f) => sum + Number(f.txCount), 0)
  const ethPrice = factories.length > 0 ? "2202.18" : "0" // Normally would come from bundles data

  return (
    <div className="min-h-screen bg-[#191B1F] text-white">
      <Header />
      <main className="res max-w-7xl flex gap-3 justify-around mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tvl value={1800000}/> <Barchart value={totalVolumeUSD}/>
        </main>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero section with key metrics */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-6 text-center">DragonSwap Analytics</h1>
          <OverviewStats
            totalVolumeUSD={totalVolumeUSD}
            totalPools={totalPools}
            totalTxs={totalTxs}
            ethPrice={ethPrice}
            loading={loading}
          />
        </div>

        {/* Tab navigation */}
        <TabNavigation activeTab={activeTab} onChange={setActiveTab} />

        {/* Filters and controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 my-6">
          <SearchFilter
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={`Search ${activeTab === "pools" ? "pools" : "tokens"}...`}
          />
          <TimeframeSelector value={timeframe} onChange={setTimeframe} />
        </div>

        {/* Main content area */}
        {error ? (
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-red-400">Error: {error}</div>
        ) : (
          <DataTable
            type={activeTab}
            data={activeTab === "overview" ? factories : pools}
            loading={loading}
            searchQuery={searchQuery}
          />
        )}
      </main>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <NavSelector value={activeNav} onChange={setActiveNav} />
   

{activeNav === 'Tokens' && (
  <div className="bg-[#212429] rounded-lg overflow-hidden mt-3">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-[#2C2F36]">
          <tr>
            <SortableHeader label="ID" sortKey="id" />
            <SortableHeader label="NAME" sortKey="name" />
            <SortableHeader label="SYMBOL" sortKey="symbol" />
            <SortableHeader label="PRICE" sortKey="priceUSD" />
            <SortableHeader label="1H %" sortKey="priceChange1h" />
            <SortableHeader label="24H %" sortKey="priceChange1d" />
            <SortableHeader label="VOLUME" sortKey="volumeUSD" />
            <SortableHeader label="TOTAL SUPPLY" sortKey="totalSupply" />
            <SortableHeader label="FDV" sortKey="fullyDilutedValuation" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800 bg-[#212429]">
          {tokens.map((token) => (
            <tr key={token.id} className="hover:bg-[#2C2F36] transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                {token.id.slice(0, 6)}...{token.id.slice(-4)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{token.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{token.symbol}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{formatUSD(token.priceUSD)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{token.priceChange1h.toFixed(2)}%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{token.priceChange1d.toFixed(2)}%</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{formatUSD(token.volumeUSD)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{formatNumber(token.totalSupply)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{formatUSD(token.fullyDilutedValuation)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
{activeNav === 'Pools' && (
  <div className="bg-[#212429] rounded-lg overflow-hidden mt-3">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-[#2C2F36]">
          <tr>
            <SortableHeader label="ID" sortKey="id" />
            <SortableHeader label="TOKEN PAIR" sortKey="token0.symbol" />
            <SortableHeader label="TVL" sortKey="totalValueLockedUSD" />
            <SortableHeader label="1D VOLUME" sortKey="volumeUSD1d" />
            <SortableHeader label="30D VOLUME" sortKey="volumeUSD30d" />
            <SortableHeader label="APR" sortKey="apr" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800 bg-[#212429]">
          {pools.map((pool) => (
            <tr key={pool.id} className="hover:bg-[#2C2F36] transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                {pool.id.slice(0, 6)}...{pool.id.slice(-4)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {pool.token0.symbol}/{pool.token1.symbol}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{formatUSD(pool.totalValueLockedUSD)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{formatUSD(pool.volumeUSD1d)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{formatUSD(pool.volumeUSD30d)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{pool.apr.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

     </main>
      
        
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-800">
        <p>
          Powered by{" "}
          <a href="https://thegraph.com" className="text-pink-400 hover:text-pink-300">
            The Graph on Kaia Blockchain
          </a>{" "}
          | DragonSwap
        </p>
      </footer>
    </div>
  )
}


interface SortableHeaderProps {
  label: string,
  sortKey?: string,
  requestSort?: (key: string) => void,
  sortConfig?: { key: string, direction: "asc" | "desc" },
 
}


function SortableHeader({ label}: SortableHeaderProps) {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
      
    >
      <div className="flex items-center">
        {label}
        <ArrowUpDown className={`ml-1 h-4 w-4  text-gray-500`} />
      </div>
    </th>
  )
}