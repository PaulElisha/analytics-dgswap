import type { Factory, Pool } from "../../subgraph-dgswap/src";
import { formatUSD, formatNumber } from "../utils/format"
import { ArrowUpDown } from "lucide-react"
import { useState } from "react"

interface DataTableProps {
  type: "overview" | "pools" | "tokens"
  data: Factory[] | Pool[]
  loading: boolean
  searchQuery: string
}

export function DataTable({ type, data, loading, searchQuery }: DataTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "ascending" | "descending"
  }>({ key: "totalVolumeUSD", direction: "descending" })

  if (loading) {
    return <LoadingTable type={type} />
  }

  if (data.length === 0) {
    return (
      <div className="bg-[#212429] rounded-lg p-8 text-center">
        <p className="text-gray-400">No data available</p>
      </div>
    )
  }

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Determine which table to render based on the type
  if (type === "overview" || type === "pools") {
    return (
      <FactoriesTable
        data={data as Factory[]}
        sortConfig={sortConfig}
        requestSort={requestSort}
        searchQuery={searchQuery}
      />
    )
  }

  return (
    <TokensTable data={data as Pool[]} sortConfig={sortConfig} requestSort={requestSort} searchQuery={searchQuery} />
  )
}

function LoadingTable({ type }: { type: "overview" | "pools" | "tokens" }) {
  console.log(type)
  return (
    <div className="bg-[#212429] rounded-lg p-6 animate-pulse">
      <div className="h-8 bg-gray-700 rounded mb-4 w-1/4"></div>
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4">
            <div className="h-6 bg-gray-700 rounded"></div>
            <div className="h-6 bg-gray-700 rounded"></div>
            <div className="h-6 bg-gray-700 rounded"></div>
            <div className="h-6 bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface SortableTableProps {
  data: Factory[] | Pool[]
  sortConfig: {
    key: string
    direction: "ascending" | "descending"
  }
  requestSort: (key: string) => void
  searchQuery: string
}

function FactoriesTable({ data, sortConfig, requestSort, searchQuery }: SortableTableProps) {
  const factories = data as Factory[]

  // Filter by search query
  const filteredData = factories.filter((factory) => factory.id.toLowerCase().includes(searchQuery.toLowerCase()))

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key === "id") {
      return sortConfig.direction === "ascending" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
    }

    const aValue = Number(a[sortConfig.key as keyof Factory])
    const bValue = Number(b[sortConfig.key as keyof Factory])

    return sortConfig.direction === "ascending" ? aValue - bValue : bValue - aValue
  })

  return (
    <div className="bg-[#212429] rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-[#2C2F36]">
            <tr>
              <SortableHeader label="Factory Address" sortKey="id" sortConfig={sortConfig} requestSort={requestSort} />
              <SortableHeader label="Pools" sortKey="poolCount" sortConfig={sortConfig} requestSort={requestSort} />
              <SortableHeader
                label="Transactions"
                sortKey="txCount"
                sortConfig={sortConfig}
                requestSort={requestSort}
              />
              <SortableHeader
                label="Volume"
                sortKey="totalVolumeUSD"
                sortConfig={sortConfig}
                requestSort={requestSort}
              />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 bg-[#212429]">
            {sortedData.map((factory) => (
              <tr key={factory.id} className="hover:bg-[#2C2F36] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium">
                        {factory.id.slice(0, 6)}...{factory.id.slice(-4)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{formatNumber(Number(factory.poolCount))}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{formatNumber(Number(factory.txCount))}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{formatUSD(Number(factory.totalVolumeUSD))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function TokensTable({ data, sortConfig, requestSort, searchQuery }: SortableTableProps) {
  // This is a placeholder for the tokens table
  // In a real implementation, you would have token data
  return (
    <div className="bg-[#212429] rounded-lg p-8 text-center">
      <p className="text-gray-400">Token data would be displayed here</p>
    </div>
  )
}

interface SortableHeaderProps {
  label: string
  sortKey: string
  sortConfig: {
    key: string
    direction: "ascending" | "descending"
  }
  requestSort: (key: string) => void
}

function SortableHeader({ label, sortKey, sortConfig, requestSort }: SortableHeaderProps) {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
      onClick={() => requestSort(sortKey)}
    >
      <div className="flex items-center">
        {label}
        <ArrowUpDown className={`ml-1 h-4 w-4 ${sortConfig.key === sortKey ? "text-pink-500" : "text-gray-600"}`} />
      </div>
    </th>
  )
}

