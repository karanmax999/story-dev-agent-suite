# Story Dev Agent Suite 🚀

**The ultimate OSS scaffolding and tooling suite for Story Protocol, featuring a reference "GenAI-to-IP" agent powered by ABV.dev.**

---

## 🏆 Tracks & Value Proposition

### 🛠️ Track 1: OSS / Dev Tooling
**Problem**: Building on Story Protocol requires setting up complex blockchain clients (`viem`, `wagmi`), managing ABIs, and understanding the Protocol SDK nuances. This friction slows down hackathon developers. 
**Solution**: `story-dev-agent` provides a **one-command scaffold** (`npx story-dev-agent init`) that instantly sets up a production-ready Monorepo with:
-   **`story-client`**: A custom, simplified TypeScript wrapper that abstracts "Mint & Register" into a single function.
-   **`ip-sandbox`**: A built-in dashboard to visualize and manage IP Assets (`Create`, `License`, `Register`).
-   **Zero-Config Environment**: Pre-wired for the Aeneid Testnet.

### 🤖 Track 2: ABV.dev GenAI IP Registration
**Goal**: Seamlessly bridge the gap between AI Generation and IP Ownership.
**Solution**: The **GenAI Reference Agent** (`apps/abv-genai-agent`) demonstrates a real-world flow:
1.  **Generate**: User prompts an AI (via specialized ABV gateway).
2.  **Trace**: Request is fully instrumented with OpenTelemetry for transparency.
3.  **Own**: The output is **automatically registered** as an IP Asset on Story Protocol in the same transaction.

---

## 🏗️ System Architecture

The project is structured as a generic `pnpm` monorepo:

### 1. `packages/story-client` (The Core)
A thin, powerful wrapper around `@story-protocol/core-sdk`. It handles:
-   **Simplified Registration**: `registerIpAsset()` handles both existing NFTs and new content (via SPG).
-   **Licensing**: `createLicenseTerms()` and `attachLicenseToIp()` with sensible defaults for Commercial/Non-Commercial use.
-   **Type Safety**: Full TypeScript support for clear developer experience.
-   **Aeneid Ready**: Pre-configured with testnet contract addresses (`RoyaltyPolicy`, `PILicenseTemplate`, `WIP`).

### 2. `apps/abv-genai-agent` (The Demo)
A Next.js application that integrates:
-   **ABV SDK**: For access to curated LLMs.
-   **OpenTelemetry**: For request tracing and observability.
-   **Story Integration**: automatically mints the AI output as an on-chain IP Asset.

### 3. `apps/ip-sandbox` (The Playground)
A developer dashboard to:
-   Manually register IP Assets from metadata URIs.
-   Create and manage License Terms.
-   **Dashboard**: Look up IP Assets on the [Story Scan Explorer](https://aeneid.storyscan.io/).

---

## 🚀 Quickstart Guide

### 1. Prerequisites
-   Node.js 18+
-   pnpm (`npm install -g pnpm`)
-   A Story Protocol Private Key (with Testnet IP tokens).
-   An ABV.dev API Key (for GenAI features).

### 2. Installation & Build
```bash
# Install dependencies
pnpm install

# Build the client package
pnpm --filter story-client build
```

### 3. Configuration
Create a `.env` file in the root directory:
```env
STORY_PRIVATE_KEY=your_private_key_here
STORY_RPC_URL=https://aeneid.storyrpc.io
ABV_API_KEY=your_abv_key_here
```

### 4. Running the Applications

#### option A: The IP Sandbox (Dashboard)
Manage your IP Assets and Licenses visually.
```bash
pnpm --filter ip-sandbox dev
```
> Open **http://localhost:3000**

#### Option B: The GenAI Agent
Generate AI content and register it instantly.
```bash
pnpm --filter abv-genai-agent dev
```
> Open **http://localhost:3001** (or 3000 if running alone)

---

## 🧪 Scaffolding New Projects
You can use our CLI to generate this structure for your own new projects.

```bash
# Build the CLI
pnpm --filter cli build

# Run the initialization wizard
node apps/cli/dist/index.js init
```
Follow the prompts to create a `basic-story` app or a full `abv-genai` agent.

---

## 📜 Verified Contracts (Aeneid)
This suite is pre-configured for the **Aeneid Testnet (Chain ID 1315)**.
-   **Royalty Policy**: `0xBe54FB168b3c982b7AaE60dB6CF75Bd8447b390E`
-   **License Template**: `0x2E896b0b2Fdb7457499B56AAaA4AE55BCB4Cd316`
-   **WIP Token**: `0x1514000000000000000000000000000000000000`

---

## 🤝 Contribution
1.  Fork the repo.
2.  Create a feature branch.
3.  Submit a Pull Request.

**Built with ❤️ for the Story Protocol Hackathon.**
