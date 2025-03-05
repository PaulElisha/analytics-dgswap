import { Analytics } from "../components/analytics"

export default function Home() {
  return <Analytics />
}




// import React, { useState } from "react";
// import { DataList } from "../components/DataList";
// import { Header } from "../components/Header";
// // import { ArrowTrendingUpIcon, ChartBarIcon, CubeIcon } from "@heroicons/react/24/outline";
// import { useSubgraphData } from "../hooks/useSubgraphData";
// // import { formatUSD } from "../utils/format";

// export const Home: React.FC = () => {
//   const [limit, setLimit] = useState<number>(5);
//   const { factories, loading, error } = useSubgraphData("factories", limit);

//   // // Aggregate stats.
//   // const totalVolumeUSD = factories.reduce((sum, f) => sum + Number(f.totalVolumeUSD), 0);
//   // const totalPools = factories.reduce((sum, f) => sum + Number(f.poolCount), 0);
//   // const totalTxs = factories.reduce((sum, f) => sum + Number(f.txCount), 0);

//   const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = Number(e.target.value);
//     if (value >= 1 && value <= 10) setLimit(value); // Restrict to 1-10
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
//       {/* Header */}
//       <Header />

//       {/* Hero Section */}
//       <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-center">
//         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-600">
//           DragonSwap Subgraph Aggregator
//         </h2>
//         <p className="mt-2 sm:mt-4 text-base sm:text-lg text-gray-300 max-w-xl sm:max-w-2xl mx-auto">
//           Explore real-time factory data from the DragonSwap ecosystem on Kaia.
//         </p>
//         {/* <div className="mt-4 sm:mt-6 lg:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-[280px] sm:max-w-xl lg:max-w-3xl mx-auto">
//           <StatCard
//             icon={<CubeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#4f46e5]" />}
//             label="Total Pools"
//             value={loading ? "..." : totalPools.toLocaleString()}
//           />
//           <StatCard
//             icon={<ArrowTrendingUpIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#2dd4bf]" />}
//             label="Total Volume"
//             value={loading ? "..." : formatUSD(totalVolumeUSD)}
//           />
//           <StatCard
//             icon={<ChartBarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#4f46e5]" />}
//             label="Transactions"
//             value={loading ? "..." : totalTxs.toLocaleString()}
//           />
//         </div> */}
//       </section>

//       {/* Data Fetch Controls */}
//       <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 text-center">
//         <div className="max-w-md sm:max-w-2xl lg:max-w-5xl mx-auto">
//           <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
//             <button
//               onClick={() => setLimit(limit)} // Trigger re-fetch with current limit
//               className="px-4 py-2 sm:px-6 sm:py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-500 transition-colors"
//             >
//               Get Factories
//             </button>
//             <div className="flex items-center gap-2 sm:gap-4">
//               <label htmlFor="limit" className="text-gray-300 text-sm sm:text-base">
//                 Select a Query (1-10):
//               </label>
//               <input
//                 id="limit"
//                 type="number"
//                 min="1"
//                 max="10"
//                 value={limit}
//                 onChange={handleLimitChange}
//                 className="w-16 sm:w-20 p-1 sm:p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 text-sm sm:text-base"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Data Display Section */}
//       <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50 backdrop-blur-md">
//         <div className="max-w-md sm:max-w-2xl lg:max-w-5xl mx-auto">
//           <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">DragonSwap Subgraph Explorer</h3>
//           <DataList factories={factories} pools={[]} loading={loading} error={error} />
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-6 sm:py-8 text-center text-gray-400 text-sm sm:text-base">
//         <p>
//           Powered by <a href="https://thegraph.com" className="text-indigo-400 hover:underline">The Graph on Kaia Blockchain</a> | Paul Elisha, Agantem
//         </p>
//       </footer>
//     </div>
//   );
// };
