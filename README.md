# DragonSwap Frontend

A sleek, React-based frontend for querying DragonSwap data on the Kaia blockchain. Built with Vite and TypeScript, it integrates the [DragonSwap Subgraph SDK](https://github.com/PaulElisha/subgraph-dgswap) to display factory data from the DragonSwap DEX on Kaia Mainnet.

## Features

- **Sleek UI**: Dark theme with bold typography and subtle animations.
- **Real-Time Data**: Fetch factory details (pool count, tx count, total volume USD).
- **Scalable**: Modular components and hooks for extensibility.
- **Responsive**: Works across mobile, tablet, and desktop.
- **Submodule**: Uses `dgswapSubgraphSDK` for data access.

## Deployment

Live on Netlify: [https://dgswapapp.netlify.app/](https://dgswapapp.netlify.app/)

# Installation

```bash
git clone https://github.com/CoderOfPHCity/subgraphDgswap.git
cd subgraphDgswap/dgswap-frontend
npm install
```

# Prerequisites

- Node.js (v16+).
- Submodule initialized (see [Submodule Setup](#submodule-setup)).

# Usage

Run locally:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

# Configuration

Set the Graph API key in `dgswap-frontend/src/lib/sdk.ts`:

```typescript
const ENDPOINT = `https://gateway.thegraph.com/api/${process.env.VITE_GRAPH_API_KEY}/subgraphs/id/2QEZxd4f115iTkW38MFmL6KZsq9uAYmCaFF2KLrZeSjK`;
```

Add to `.env`:

```
VITE_GRAPH_API_KEY=
```

# Submodule Setup

Initialize the `dgswapSubgraphSDK` submodule:

```bash
git submodule update --init --recursive
```

Import SDK types:

```typescript
import { Factory } from "../../dgswapSubgraphSDK/src";
```

# Netlify Deployment

- **Base Directory**: `dgswap-frontend`
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

# License

MIT License. See [LICENSE](LICENSE).

# Contact

- GitHub: [PaulElisha](https://github.com/PaulElisha), [CoderOfPHCity](https://github.com/CoderOfPHCity)
