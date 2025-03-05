import type React from "react"
interface TimeframeSelectorProps {
  value: "24h" | "7d" | "30d" | "all"
  onChange: (value: "24h" | "7d" | "30d" | "all") => void
}

export function TimeframeSelector({ value, onChange }: TimeframeSelectorProps) {
  return (
    <div className="flex bg-[#212429] rounded-lg p-1">
      <TimeframeButton active={value === "24h"} onClick={() => onChange("24h")}>
        24H
      </TimeframeButton>
      <TimeframeButton active={value === "7d"} onClick={() => onChange("7d")}>
        7D
      </TimeframeButton>
      <TimeframeButton active={value === "30d"} onClick={() => onChange("30d")}>
        30D
      </TimeframeButton>
      <TimeframeButton active={value === "all"} onClick={() => onChange("all")}>
        All
      </TimeframeButton>
    </div>
  )
}

interface TimeframeButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

function TimeframeButton({ active, onClick, children }: TimeframeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs font-medium rounded-md ${
        active ? "bg-pink-500 text-white" : "text-gray-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  )
}

