"use client"

import { useState } from "react"
import { useSubgraphData } from "../hooks/useSubgraphData"
import { Header } from "../components/Header"
import { OverviewStats } from "../components/overview-stats"
import { TabNavigation } from "../components/tab-navigation"
import { DataTable } from "../components/data-table"
import { SearchFilter } from "../components/search-filter"
import { TimeframeSelector } from "../components/timeframe-selector"

export function Analytics() {
  const [activeTab, setActiveTab] = useState<"overview" | "pools" | "tokens">("overview")
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d" | "all">("24h")
  const [searchQuery, setSearchQuery] = useState("")
  const [limit, _] = useState(10)

  const { factories, pools, loading, error } = useSubgraphData(activeTab === "overview" ? "factories" : "pools", limit)
  // Calculate aggregate stats
  const totalVolumeUSD = factories.reduce((sum, f) => sum + Number(f.totalVolumeUSD), 0)
  const totalPools = factories.reduce((sum, f) => sum + Number(f.poolCount), 0)
  const totalTxs = factories.reduce((sum, f) => sum + Number(f.txCount), 0)
  const ethPrice = factories.length > 0 ? "2202.18" : "0" // Normally would come from bundles data

  return (
    <div className="min-h-screen bg-[#191B1F] text-white">
      <Header />

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

