[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/erickwendel-erickwendel-contributions-mcp-badge.png)](https://mseep.ai/app/erickwendel-erickwendel-contributions-mcp)

# erickwendel-contributions-mcp

![CI Status](https://github.com/ErickWendel/erickwendel-contributions-mcp/workflows/Test%20MCP%20Server/badge.svg)
[![npm version](https://badge.fury.io/js/@erickwendel%2Fcontributions-mcp.svg)](https://www.npmjs.com/package/@erickwendel/contributions-mcp)
[![npm downloads](https://img.shields.io/npm/dt/@erickwendel/contributions-mcp.svg)](https://www.npmjs.com/package/@erickwendel/contributions-mcp)

A Model Context Protocol (MCP) server that provides tools to query [Erick Wendel's contributions](https://erickwendel.com.br/) across different platforms. Query talks, blog posts, and videos using natural language through Claude, Cursor or similars. This project was built using [Cursor](https://cursor.sh) IDE with the default agent (trial version).

## Quick Start

Use this MCP server directly with Claude Desktop or Cursor without installation:

```json
{
  "mcpServers": {
    "erickwendel-contributions": {
      "command": "npx",
      "args": ["-y", "@erickwendel/contributions-mcp"]
    }
  }
}
```

Add this configuration to:
- **Claude Desktop**: `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)
- **Cursor**: `~/.cursor/mcp.json`

## Available Tools

This MCP server provides the following **capabilities**:

### Tools
- `get-talks`: Retrieves a paginated list of talks with optional filtering
  - Supports filtering by ID, title, language, city, country, and year
  - Can return counts grouped by language, country, or city

- `get-posts`: Fetches posts with optional filtering and pagination
  - Supports filtering by ID, title, language, and portal

- `get-videos`: Retrieves videos with optional filtering and pagination
  - Supports filtering by ID, title, and language

- `check-status`: Verifies if the API is alive and responding

### Prompts
- `find-content`: Generate queries to find specific content by type, topic, and language
- `summarize-activity`: Create summaries of content activity by year

### Resources
- `erickwendel://about`: Server information and capabilities metadata
- `erickwendel://statistics`: Content statistics and available queries

# Integration with AI Tools

## Inspect MCP Server Capabilities

You can inspect this MCP server's capabilities using the MCP Inspector:

```bash
npm run inspect
```

This will show you all available tools, their parameters, and how to use them.

## Setup

1. Make sure you're using Node.js v20+
```bash
node -v
# v20.x.x or higher
```

2. Clone this repository:
```bash
git clone https://github.com/erickwendel/erickwendel-contributions-mcp.git
cd erickwendel-contributions-mcp
```

3. Install dependencies:
```bash
npm ci
```

4. Run the server:
```bash
npm start
```

## Integration with AI Tools

### Cursor Setup

Add the following configuration to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "erickwendel-contributions": {
      "command": "npx",
      "args": ["-y", "@erickwendel/contributions-mcp"]
    }
  }
}
```

![](./demos/cursor-mcp.png)

Make sure Cursor chat is in Agent mode by selecting "Agent" in the lower left side dropdown, then ask "how many videos were published about JavaScript in 2024":

![](./demos/cursor-videos-in-2024.png)

#### Local Development

For local development, use the absolute path to the project:

```json
{
  "mcpServers": {
    "erickwendel-contributions": {
      "command": "node",
      "args": ["--experimental-strip-types", "ABSOLUTE_PATH_TO_PROJECT/src/index.ts"]
    }
  }
}
```

### Claude Desktop Setup

1. Go to Claude settings
2. Click in the Developer tab
3. Click in edit config
4. Open the config in a code editor
5. Add the following configuration to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):

```json
{
  "mcpServers": {
    "erickwendel-contributions": {
      "command": "npx",
      "args": ["-y", "@erickwendel/contributions-mcp"]
    }
  }
}
```

#### Local Development

For local development, use the absolute path to the project:

```json
{
  "mcpServers": {
    "erickwendel-contributions": {
      "command": "node",
      "args": ["--experimental-strip-types", "ABSOLUTE_PATH_TO_PROJECT/src/index.ts"]
    }
  }
}
```
### MCPHost with Ollama (Free Alternative)

If you don't have access to Claude Desktop or Cursor, you can use [MCPHost](https://github.com/mark3labs/mcphost) with Ollama as a free alternative.

1. Install MCPHost:
```bash
go install github.com/mark3labs/mcphost@latest
```

2. Create a config file (e.g. [./mcp.jsonc](./mcp.jsonc)):
```json
{
  "mcpServers": {
    "erickwendel-contributions": {
      "command": "npx",
      "args": ["-y", "@erickwendel/contributions-mcp"]
    }
  }
}
```

3. Run with Ollama:
```bash
ollama pull MODEL_NAME
mcphost --config ./mcp.jsonc -m ollama:MODEL_NAME
```

#### Local Development

For local development, update the config:
```json
{
  "mcpServers": {
    "erickwendel-contributions": {
      "command": "node",
      "args": ["--experimental-strip-types", "ABSOLUTE_PATH_TO_PROJECT/src/index.ts"]
    }
  }
}
```

## Example Queries

Here are some examples of queries you can ask Claude, Cursor or any MCP Client:

1. "How many talks were given in 2023?"

![](./demos/talks-in-2023.jpeg)

2. "Show me talks in Spanish"

![](./demos/talks-in-spanish.jpeg)

3. "Find posts about WebXR"

![](./demos/posts-webxr.jpeg)


# Development
## Features

- Built with Model Context Protocol (MCP)
- **Full MCP Capabilities**: Tools, Prompts, and Resources
- Type-safe with TypeScript and Zod schema validation
- Native TypeScript support in Node.js without transpilation
- Generated SDK using [GenQL](https://genql.dev)
- Modular architecture with separation of concerns
- Standard I/O transport for easy integration
- Structured error handling
- Compatible with Claude Desktop, Cursor, and [MCPHost](https://github.com/mark3labs/mcphost) (free alternative)

> Note: This project requires Node.js v23+ as it uses the native TypeScript support added in the last year.

## Architecture

The codebase follows a modular structure:

```
src/
  ├── config/      # Configuration settings
  ├── types/       # TypeScript interfaces and types
  ├── tools/       # MCP tool implementations
  ├── utils/       # Utility functions
  ├── services/    # API service layer
  └── index.ts     # Main entry point
```

## Testing

To run the test suite:

```bash
npm test
```

For development mode with watch:

```bash
npm run test:dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

[Erick Wendel](https://linktr.ee/erickwendel)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.