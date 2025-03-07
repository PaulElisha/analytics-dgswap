import type React from "react"
interface TimeframeSelectorProps {
  value: "Tokens" | "Pools" 
  onChange: (value: "Tokens" | "Pools" ) => void
}

export function NavSelector({ value, onChange }: TimeframeSelectorProps) {
  return (
    <div className="flex bg-[#212429] rounded-lg p-1 w-[200px] m-auto">
      <TimeframeButton active={value === "Tokens"} onClick={() => onChange("Tokens")}>
        Tokens
      </TimeframeButton>
      <TimeframeButton active={value === "Pools"} onClick={() => onChange("Pools")}>
        Pools
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
      className={`px-6 py-2 text-xs font-medium rounded-md ${
        active ? "bg-pink-500 text-white" : "text-gray-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  )
}

