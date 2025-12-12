# Story Dev Agent CLI 🛠️

A powerful command-line tool for scaffolding and managing Story Protocol projects.

## Installation

```bash
# From the monorepo
pnpm --filter cli build

# Or link globally
cd packages/cli
npm link
```

## Quick Start

### Create a New Project

```bash
story-dev-agent init my-story-app
```

This will:
1. Prompt you to choose a template
2. Create the project structure
3. Install dependencies
4. Set up configuration files

### Available Templates

- **basic** - Minimal Story Client setup
- **genai-agent** - Full ABV + Story Protocol integration
- **ip-sandbox** - Dashboard for IP management  
- **full-suite** - Complete monorepo (current structure)

## Commands

### Project Scaffolding

```bash
# Interactive mode
story-dev-agent init

# With options
story-dev-agent init my-app --template genai-agent --skip-install
```

### IP Asset Management

#### Register IP Asset

```bash
story-dev-agent register \
  --metadata-uri "ipfs://QmExample..." \
  --nft-contract "0x..." \
  --token-id "1"
```

### License Management

#### Create License Terms

```bash
# Commercial license with 10% royalty
story-dev-agent license create \
  --type commercial \
  --royalty 10 \
  --transferable

# Non-commercial license
story-dev-agent license create \
  --type non-commercial
```

#### Attach License to IP

```bash
story-dev-agent license attach \
  --ip-id "0x1234..." \
  --license-id "1"
```

#### Mint License Tokens

```bash
story-dev-agent license mint \
  --ip-id "0x1234..." \
  --amount 5 \
  --receiver "0xabcd..."
```

### Configuration

```bash
# Set private key
story-dev-agent config set PRIVATE_KEY 0x...

# Set RPC URL
story-dev-agent config set RPC_URL https://aeneid.storyrpc.io

# View all config
story-dev-agent config list

# Get specific value
story-dev-agent config get PRIVATE_KEY
```

### Utilities

```bash
# View IP asset info
story-dev-agent info 0x1234...

# Open in Story Explorer
story-dev-agent explorer 0x1234...
```

## Configuration

The CLI stores configuration in `~/.story-dev-agent/config.json`.

Required settings:
- `PRIVATE_KEY` - Your wallet private key
- `RPC_URL` - Story Protocol RPC endpoint (default: Aeneid testnet)

Optional settings:
- `ABV_API_KEY` - For GenAI features
- `ADDRESS` - Your wallet address

## Example Workflows

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

# 2. Create commercial license
story-dev-agent license create --type commercial --royalty 10

# 3. Attach to IP
story-dev-agent license attach --ip-id 0x... --license-id 1
```

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Watch mode
pnpm dev
```

## Troubleshooting

### "Private key not configured"

Run: `story-dev-agent config set PRIVATE_KEY 0x...`

### "Command not found"

Make sure you've built the CLI: `pnpm build`

Or link it globally: `npm link` (from packages/cli)

## Learn More

- [Story Protocol Docs](https://docs.story.foundation)
- [Story Explorer](https://aeneid.explorer.story.foundation)
- [ABV.dev](https://abv.dev)
