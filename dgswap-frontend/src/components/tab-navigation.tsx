import type React from "react"
interface TabNavigationProps {
  activeTab: "overview" | "pools" | "tokens"
  onChange: (tab: "overview" | "pools" | "tokens") => void
}

export function TabNavigation({ activeTab, onChange }: TabNavigationProps) {
  return (
    <div className="border-b border-gray-800">
      <nav className="flex -mb-px space-x-8">
        <TabButton active={activeTab === "overview"} onClick={() => onChange("overview")}>
          Overview
        </TabButton>
        <TabButton active={activeTab === "pools"} onClick={() => onChange("pools")}>
          Pools
        </TabButton>
        <TabButton active={activeTab === "tokens"} onClick={() => onChange("tokens")}>
          Tokens
        </TabButton>
      </nav>
    </div>
  )
}

interface TabButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

function TabButton({ active, onClick, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
        active
          ? "border-pink-500 text-pink-500"
          : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-300"
      }`}
    >
      {children}
    </button>
  )
}

