# Story Dev Agent Suite 🚀

**The complete developer toolkit for Story Protocol - featuring a powerful CLI, GenAI agent, and production-ready templates.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with Story Protocol](https://img.shields.io/badge/Built%20with-Story%20Protocol-blueviolet)](https://story.foundation)

---

## ✨ What's New

- ⚡ **Powerful CLI** - Scaffold projects, register IP, manage licenses from your terminal
- 🤖 **Enhanced GenAI Agent** - AI generation with automatic IP registration and visual tags
- 🎨 **Modern UI** - Stunning landing page with electric effects and smooth animations
- 📦 **4 Templates** - Production-ready templates for common use cases
- 🔧 **Story Client SDK** - Simplified TypeScript wrapper around Story Protocol

---

## 🏆 Tracks & Value Proposition

### 🛠️ Track 1: OSS / Dev Tooling
**Problem**: Building on Story Protocol requires complex setup, managing ABIs, and understanding SDK nuances.

**Solution**: `story-dev-agent` provides a **one-command scaffold** that instantly sets up a production-ready environment with:
- **CLI Tool**: 6+ commands for IP registration, licensing, and project scaffolding
- **Story Client SDK**: Simplified TypeScript wrapper abstracting complex operations
- **Zero-Config**: Pre-wired for Aeneid Testnet with sensible defaults

### 🤖 Track 2: ABV.dev GenAI IP Registration
**Goal**: Seamlessly bridge AI generation and IP ownership.

**Solution**: The **GenAI Reference Agent** demonstrates:
1. **Generate**: AI content creation via ABV Gateway
2. **Structure**: JSON output with descriptions and visual tags
3. **Own**: Automatic IP registration on Story Protocol
4. **Verify**: Direct links to Story Explorer for on-chain verification

---

## 🏗️ System Architecture

```
story-dev-agent-suite/
├── packages/
│   ├── cli/                    # Command-line interface
│   │   ├── src/
│   │   │   ├── commands/       # CLI commands (init, register, license, etc.)
│   │   │   ├── templates/      # Project templates
│   │   │   └── utils/          # Config management
│   │   └── README.md
│   └── story-client/           # Story Protocol SDK wrapper
│       ├── src/
│       │   └── client.ts       # Simplified Story Client
│       └── dist/
├── apps/
│   ├── web/                    # Landing page & ecosystem hub
│   ├── abv-genai-agent/        # GenAI IP registration demo
│   └── ip-sandbox/             # IP management dashboard (coming soon)
└── README.md
```

### 1. `packages/cli` - The Command Center
A powerful CLI built with Commander.js featuring:
- **Project Scaffolding**: `init` command with interactive prompts
- **IP Management**: `register`, `license create/attach/mint` commands
- **Config Management**: Secure local storage of credentials
- **Developer Tools**: `info`, `explorer` commands for quick access

### 2. `packages/story-client` - The Core SDK
Simplified TypeScript wrapper around `@story-protocol/core-sdk`:
- **Simplified Registration**: `registerIpAsset()` handles NFT minting and IP registration
- **Licensing**: `createLicenseTerms()` and `attachLicenseToIp()` with defaults
- **Type Safety**: Full TypeScript support
- **Aeneid Ready**: Pre-configured for testnet

### 3. `apps/abv-genai-agent` - The GenAI Demo
Next.js application showcasing:
- **ABV Integration**: AI content generation with structured output
- **Visual Tags**: Extracted and displayed as UI chips
- **IP Registration**: Automatic on-chain registration
- **Explorer Links**: Direct links to Story Protocol Explorer

### 4. `apps/web` - The Ecosystem Hub
Modern landing page featuring:
- **Interactive UI**: Electric effects and smooth animations
- **Comprehensive Docs**: How-it-works section with examples
- **Feature Showcase**: Bento grid layout highlighting all tools
- **Quick Start**: Terminal-style installation guide

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (`npm install -g pnpm`)
- Story Protocol wallet with testnet tokens
- ABV.dev API Key (optional, for GenAI features)

### Installation

```bash
# Clone the repository
git clone https://github.com/karanmax999/story-dev-agent-suite
cd story-dev-agent-suite

# Install dependencies
pnpm install

# Build packages
pnpm --filter story-client build
pnpm --filter cli build
```

### Configuration

Create a `.env` file in the root:

```env
# Story Protocol (Required)
STORY_PRIVATE_KEY=0x...
STORY_RPC_URL=https://aeneid.storyrpc.io
STORY_NFT_CONTRACT_ADDRESS=0x...

# ABV.dev (Optional - for GenAI features)
ABV_API_KEY=your_api_key_here
```

---

## 📦 Running the Applications

### Option A: Ecosystem Hub (Landing Page)
```bash
pnpm --filter web dev
```
→ Open **http://localhost:3000**

### Option B: GenAI Agent
```bash
pnpm --filter abv-genai-agent dev -- -p 3001
```
→ Open **http://localhost:3001**

### Option C: Use the CLI
```bash
# View available commands
node packages/cli/dist/index.js --help

# Initialize a new project
node packages/cli/dist/index.js init my-app

# Register an IP asset
node packages/cli/dist/index.js register --metadata-uri ipfs://...

# Create a license
node packages/cli/dist/index.js license create --type commercial --royalty 10
```

---

## 🛠️ CLI Commands

### Project Scaffolding
```bash
# Interactive project creation
story-dev-agent init [project-name]

# With options
story-dev-agent init my-app --template genai-agent --skip-install
```

**Available Templates:**
- `basic` - Minimal Story Client setup
- `genai-agent` - Full ABV + Story integration
- `ip-sandbox` - IP management dashboard
- `full-suite` - Complete monorepo

### IP Asset Management
```bash
# Register IP asset
story-dev-agent register \
  --metadata-uri "ipfs://QmExample..." \
  --nft-contract "0x..." \
  --token-id "1"

# Create license terms
story-dev-agent license create \
  --type commercial \
  --royalty 10 \
  --transferable

# Attach license to IP
story-dev-agent license attach \
  --ip-id "0x..." \
  --license-id "1"

# Mint license tokens
story-dev-agent license mint \
  --ip-id "0x..." \
  --amount 5 \
  --receiver "0x..."
```

### Configuration
```bash
# Set private key
story-dev-agent config set PRIVATE_KEY 0x...

# Set RPC URL
story-dev-agent config set RPC_URL https://aeneid.storyrpc.io

# View all config
story-dev-agent config list
```

### Developer Utilities
```bash
# View IP asset info
story-dev-agent info 0x1234...

# Open in Story Explorer
story-dev-agent explorer 0x1234...
```

---

## 🎨 Features

### ✅ Powerful CLI
- 6+ commands for complete IP lifecycle management
- Interactive prompts with beautiful terminal UX
- Secure config management
- Template-based project scaffolding

### ✅ GenAI Integration
- AI content generation via ABV Gateway
- Structured JSON output with tags
- Automatic IP registration
- Visual tag display in UI

### ✅ Story Client SDK
- Simplified API for Story Protocol
- Type-safe TypeScript wrapper
- Handles complex ABI encoding
- Pre-configured for Aeneid testnet

### ✅ Modern UI/UX
- Electric effects and smooth animations
- Responsive design
- Interactive elements
- GPU-accelerated performance

### ✅ Production Ready
- Full TypeScript support
- Error handling and validation
- Comprehensive documentation
- Best practices baked in

---

## 📜 Verified Contracts (Aeneid Testnet)

This suite is pre-configured for **Aeneid Testnet (Chain ID: 1315)**

- **RPC URL**: `https://aeneid.storyrpc.io`
- **Explorer**: `https://aeneid.explorer.story.foundation`
- **Royalty Policy**: `0xBe54FB168b3c982b7AaE60dB6CF75Bd8447b390E`
- **License Template**: `0x2E896b0b2Fdb7457499B56AAaA4AE55BCB4Cd316`
- **WIP Token**: `0x1514000000000000000000000000000000000000`

---

## � Example Workflows

### Quick IP Registration
```bash
# 1. Configure your key (one-time)
story-dev-agent config set PRIVATE_KEY 0x...

# 2. Register IP
story-dev-agent register --metadata-uri ipfs://Qm...

# 3. View on explorer
story-dev-agent explorer 0x... # Use the IP ID from step 2
```

### Create Licensed IP
```bash
# 1. Register IP
story-dev-agent register --metadata-uri ipfs://Qm...

# 2. Create commercial license (10% royalty)
story-dev-agent license create --type commercial --royalty 10

# 3. Attach to IP
story-dev-agent license attach --ip-id 0x... --license-id 1
```

### GenAI to IP Flow
1. Visit `http://localhost:3001`
2. Enter a prompt (e.g., "A futuristic city")
3. Click "Execute Agent"
4. AI generates content with tags
5. Automatic IP registration on Story Protocol
6. View on Explorer with one click

---

## 🔧 Development

### Project Structure
- **Monorepo**: pnpm workspaces for shared dependencies
- **TypeScript**: Full type safety across all packages
- **Next.js**: Modern React framework for web apps
- **Framer Motion**: Smooth animations
- **Tailwind CSS**: Utility-first styling

### Build Commands
```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter story-client build
pnpm --filter cli build

# Development mode
pnpm --filter web dev
pnpm --filter abv-genai-agent dev
```

### Testing
```bash
# Run tests (when available)
pnpm test

# Lint
pnpm lint
```

---

## 📚 Documentation

- **Story Protocol Docs**: https://docs.story.foundation
- **ABV.dev Docs**: https://abv.dev
- **CLI README**: [packages/cli/README.md](packages/cli/README.md)
- **Story Client**: [packages/story-client/README.md](packages/story-client/README.md)

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Story Protocol** for the amazing IP infrastructure
- **ABV.dev** for the GenAI gateway
- **Story Protocol Hackathon** for the opportunity

---

## 🌟 Star Us!

If you find this project helpful, please consider giving it a ⭐ on GitHub!

---

**Built with ❤️ for the Story Protocol Hackathon**

[Website](http://localhost:3000) • [GenAI Demo](http://localhost:3001) • [Documentation](https://docs.story.foundation)
