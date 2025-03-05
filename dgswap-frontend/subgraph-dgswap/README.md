# DragonSwap Subgraph SDK

A TypeScript SDK for querying DragonSwap data on the Kaia blockchain via a custom subgraph. This SDK provides easy access to factory, bundle, and pool data from the DragonSwap decentralized exchange (DEX) deployed on Kaia Mainnet.

## Features

- Query factory data (e.g., pool count, transaction count, total volume in USD).
- Retrieve bundle data (e.g., Kaia price in USD).
- Fetch pool details (e.g., token pairs, fees, tick spacing).
- Lightweight and built with `graphql-request` for efficient GraphQL queries.

## Installation

Install the SDK via clone the repository and install dependencies:

```bash
git clone https://github.com/PaulElisha/subgraph-dgswap
cd subgraph-dgswap
npm install
npm run build
```

## Usage

### Prerequisites

- A Node.js environment (v16+ recommended).
- Access to the DragonSwap subgraph endpoint (see [Subgraph](#subgraph)).

### Example Usage

Access the dgswap subgraph studio playground here: `https://thegraph.com/explorer/subgraphs/DFu3UKnkVWq4xgYq5NFerMu6puA9SkqdMyjjWmauwqqM?view=Query&chain=arbitrum-one`

Endpoint Studio URL:`https://gateway.thegraph.com/api/[api-key]/subgraphs/id/2QEZxd4f115iTkW38MFmL6KZsq9uAYmCaFF2KLrZeSjK`

Deployed subgrpah tx: `https://arbiscan.io/tx/0x42f23c8481ab7d538c29adda02bf8594b4aecbbf24f4ad7e08ac62706aa15c92`
```typescript
import { DragonSwapSubgraphSDK } from "@PaulElisha/subgraph-dgswap"; // import here until npm publish "../src"

const endpoint = " "; //geneate a subgraph API on `https://gateway.thegraph.com/api/[api-key]/subgraphs/id/2QEZxd4f115iTkW38MFmL6KZsq9uAYmCaFF2KLrZeSjK`
const sdk = new DragonSwapSubgraphSDK(endpoint);

sdk.getFactories(5)
  .then(factories => console.log("Factories:", factories))
  .catch(error => console.error(error.message));
```

## Subgraph

This SDK queries a custom subgraph deployed at `https://gateway.thegraph.com/api/[api-key]/subgraphs/id/2QEZxd4f115iTkW38MFmL6KZsq9uAYmCaFF2KLrZeSjK`. 

It indexes data from the DragonSwap, starting at block `145316741`.


### Summary of Indexed Data
| Entity   | Field             | Description                          | Example Value                     |
|----------|-------------------|--------------------------------------|-----------------------------------|
| Factory  | `id`              | Factory address                      | `"0x7431A23897ecA6913D5c816..."` |
|          | `poolCount`       | Number of pools created              | `"5"`                            |
|          | `txCount`         | Approx. number of txs (pool creates) | `"5"`                            |
|          | `totalVolumeUSD`  | Total volume in USD (placeholder)    | `"0"`                            |
| Bundle   | `id`              | Fixed identifier                     | `"1"`                            |
|          | `ethPriceUSD`     | Kaia price in USD (placeholder)      | `"0"`                            |
| Pool     | `id`              | Tx hash + log index                  | `"0xabc123...-0"`               |
|          | `token0`          | First token address                  | `"0xsomeToken0"`                |
|          | `token1`          | Second token address                 | `"0xsomeToken1"`                |
|          | `fee`             | Fee tier                             | `"500"`                         |
|          | `tickSpacing`     | Tick spacing                         | `"10"`                          |
|          | `blockNumber`     | Creation block                       | `"145316742"`                   |
|          | `blockTimestamp`  | Creation timestamp                   | `"1698765432"`                  |
|          | `transactionHash` | Creation tx hash                     | `"0xabc123..."`                |

---
## Development

### Build

```bash
npm run build
```

### Test

Create a `dgswap.test.ts` file and run:

```bash
`npm test`
```

## License

MIT License. See [LICENSE](LICENSE) for details.

## Contact

- GitHub: [PaulElisha](https://github.com/PaulElisha)
- GitHub: [CoderOfPHCity)](https://github.com/CoderOfPHCity)
- Issues: [kaia issues](https://github.com/kaiachain/kaia-dapp-mono/issues/398)

---
Built with ❤️ for the Kaia blockchain community.