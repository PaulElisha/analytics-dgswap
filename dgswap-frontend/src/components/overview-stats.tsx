import type React from "react"
import { formatUSD, formatNumber } from "../utils/format"
import { ArrowUpRight, ArrowDownRight, Layers, BarChart3, DollarSign } from "lucide-react"

interface OverviewStatsProps {
  totalVolumeUSD: number
  totalPools: number
  totalTxs: number
  ethPrice: string
  loading: boolean
}

export function OverviewStats({ totalVolumeUSD, totalPools, totalTxs, ethPrice, loading }: OverviewStatsProps) {
  // Placeholder data for 24h changes - in a real app, you'd calculate these
  const volumeChange = 5.67
  const txChange = -2.34

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Volume"
        value={loading ? "Loading..." : formatUSD(totalVolumeUSD)}
        change={volumeChange}
        icon={<DollarSign className="w-4 h-4  text-pink-400" />}
      />
      <StatCard
        title="Total Pools"
        value={loading ? "Loading..." : formatNumber(totalPools)}
        icon={<Layers className="w-4 h-4 text-blue-400" />}
      />
      <StatCard
        title="Total Transactions"
        value={loading ? "Loading..." : formatNumber(totalTxs)}
        change={txChange}
        icon={<BarChart3 className="w-4 h-4 text-green-400" />}
      />
      <StatCard
        title="ETH Price"
        value={loading ? "Loading..." : `$${ethPrice}`}
        icon={<DollarSign className="w-4 h-4 text-yellow-400" />}
      />
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  change?: number
  icon: React.ReactNode
}

function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <div className="bg-[#212429] rounded-2xl p-5 border border-gray-800 hover:border-gray-700 transition-all">
      <div className="flex justify-between items-center gap-2 mb-4">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <div className="p-2 bg-[#2C2F36] rounded-lg">{icon}</div>
      </div>
      <div className="text-2xl font-semibold mb-1">{value}</div>
      {change !== undefined && (
        <div className={`flex items-center text-sm ${change >= 0 ? "text-green-400" : "text-red-400"}`}>
          {change >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {Math.abs(change).toFixed(2)}% (24h)
        </div>
      )}
    </div>
  )
}

