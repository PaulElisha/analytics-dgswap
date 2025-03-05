import type React from "react"
// import { Search, Menu } from "lucide-react"
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="bg-[#191B1F] border-b border-gray-800 sticky top-0 z-10 backdrop-blur-md bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                DragonSwap
              </span>
            </Link>
            <nav className="hidden md:flex ml-10 space-x-8">
              <NavLink href="/" active>
                Analytics
              </NavLink>
              <NavLink href="#">Swap</NavLink>
              <NavLink href="#">Pools</NavLink>
              <NavLink href="https://thegraph.com/explorer/subgraphs/DFu3UKnkVWq4xgYq5NFerMu6puA9SkqdMyjjWmauwqqM?view=Query&chain=arbitrum-one">
                Subgraph
              </NavLink>
            </nav>
          </div> */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
  <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
    <span style={{ 
      fontSize: '1.25rem', 
      fontWeight: 'bold', 
      backgroundImage: 'linear-gradient(to right, #ec4899, #8b5cf6)', 
      WebkitBackgroundClip: 'text', 
      color: 'transparent' 
    }}>
      DragonSwap
    </span>
  </Link>
  <nav style={{ 
    display: 'none', 
    marginLeft: '2.5rem', 
    gap: '2rem' 
  }} className="md:flex">
    <NavLink href="/" active>Analytics</NavLink>
    <NavLink href="#">Swap</NavLink>
    <NavLink href="#">Pools</NavLink>
    <NavLink href="https://thegraph.com/explorer/subgraphs/DFu3UKnkVWq4xgYq5NFerMu6puA9SkqdMyjjWmauwqqM?view=Query&chain=arbitrum-one">
      Subgraph
    </NavLink>
  </nav>
</div>
          <div className="flex items-center">
            {/* <div className="hidden md:block">
              <button className="p-2 rounded-full bg-[#212429] hover:bg-[#2C2F36] transition-colors">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </div> */}
            {/* <div className="md:hidden ml-4">
              <button className="p-2 rounded-full bg-[#212429] hover:bg-[#2C2F36] transition-colors">
                <Menu className="w-5 h-5" />
              </button>
            </div> */}
            {/* <button className="ml-4 px-4 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium transition-colors">
              Connect Wallet
            </button> */}
          </div>
        </div>
      </div>
    </header>
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
  active?: boolean
}

function NavLink({ href, children, active }: NavLinkProps) {
  return (
    <Link
      to={href}
      className={`px-3 py-2 text-sm font-medium rounded-full transition-colors ${
        active ? "bg-[#212429] text-white" : "text-gray-300 hover:text-white hover:bg-[#212429]"
      }`}
    >
      {children}
    </Link>
  )
}



