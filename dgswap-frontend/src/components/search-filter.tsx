import { Search } from "lucide-react"

interface SearchFilterProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

export function SearchFilter({ value, onChange, placeholder }: SearchFilterProps) {
  return (
    <div className="relative w-full sm:w-64">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-[#212429] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        placeholder={placeholder}
      />
    </div>
  )
}

