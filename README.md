# erickwendel-contributions-mcp

![CI Status](https://github.com/ErickWendel/erickwendel-contributions-mcp/workflows/Test%20MCP%20Server/badge.svg)
[![smithery badge](https://smithery.ai/badge/@ErickWendel/erickwendel-contributions-mcp)](https://smithery.ai/server/@ErickWendel/erickwendel-contributions-mcp)

A Model Context Protocol (MCP) server that provides tools to query [Erick Wendel's contributions](https://erickwendel.com.br/) across different platforms. Query talks, blog posts, and videos using natural language through Claude, Cursor or similars. This project was built using [Cursor](https://cursor.sh) IDE with the default agent (free version).

This MCP server is also available on [Smithery](https://smithery.ai/server/@ErickWendel/erickwendel-contributions-mcp) for direct integration.



## Features

- Built with Model Context Protocol (MCP)
- Type-safe with TypeScript and Zod schema validation
- Native TypeScript support in Node.js without transpilation
- Generated SDK using [GenQL](https://genql.dev)
- Modular architecture with separation of concerns
- Standard I/O transport for easy integration
- Structured error handling
- Compatible with Claude Desktop, Cursor, and [MCPHost](https://github.com/mark3labs/mcphost) (free alternative)


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

## Setup

1. Clone this repository:
```bash
git clone https://github.com/erickwendel/erickwendel-contributions-mcp.git
cd erickwendel-contributions-mcp
```

2. Restore dependencies:
```bash
npm ci
```

## Available Tools

This MCP server provides the following tools to interact with the API:

- `get-talks`: Retrieves a paginated list of talks with optional filtering
  - Supports filtering by ID, title, language, city, country, and year
  - Can return counts grouped by language, country, or city

- `get-posts`: Fetches posts with optional filtering and pagination
  - Supports filtering by ID, title, language, and portal

- `get-videos`: Retrieves videos with optional filtering and pagination
  - Supports filtering by ID, title, and language

- `check-status`: Verifies if the API is alive and responding

## Integration with AI Tools

## Inspect MCP Server Capabilities

You can inspect this MCP server's capabilities using Smithery:

```bash
npx -y @smithery/cli@latest inspect @ErickWendel/erickwendel-contributions-mcp
```

This will show you all available tools, their parameters, and how to use them.

## Integration with AI Tools

### Installing via Smithery

To install Erick Wendel Contributions for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@ErickWendel/erickwendel-contributions-mcp):

```bash
npx -y @smithery/cli install @ErickWendel/erickwendel-contributions-mcp --client claude
```

> **Note**: The Smithery CLI installation for Claude is currently experiencing issues. Please use the manual installation method below until this is resolved.

### Installing from the source (this repo)

1. Open Cursor Settings
2. Navigate to MCP section
3. Click "Add new MCP server"
4. Configure the server:
   ```
   Name = erickwendel-contributions
   Type = command
   Command = node ABSOLUTE_PATH_TO_PROJECT/src/index.ts
   ```
5. Make sure Cursor chat is in Agent mode by selecting "Agent" in the lower left side dropdown

### Claude Desktop Setup

Add the following configuration to your Claude Desktop config:

```json
{
  "mcpServers": {
    "erickwendel-contributions": {
      "command": "node",
      "args": ["ABSOLUTE_PATH_TO_PROJECT/src/index.ts"]
    }
  }
}
```

### Free Alternative Using MCPHost

If you don't have access to Claude, you can use [MCPHost](https://github.com/mark3labs/mcphost) with Ollama as a free alternative. MCPHost is a CLI tool that enables Large Language Models to interact with MCP servers.

1. Install MCPHost:
```bash
go install github.com/mark3labs/mcphost@latest
```

2. Create a config file (e.g., [./mcp.jsonc](./mcp.jsonc)`):
```json
{
  "mcpServers": {
    "erickwendel-contributions": {
      "command": "node",
      "args": ["ABSOLUTE_PATH_TO_PROJECT/src/index.ts"]
    }
  }
}
```

3. Run MCPHost with your preferred Ollama model:
```bash
ollama pull MODEL_NAME
mcphost --config ./mcp.jsonc -m ollama:MODEL_NAME
```

## Example Queries

Here are some examples of queries you can ask Claude, Cursor or any MCP Client:

1. "How many talks were given in 2023?"

![](./demos/talks-in-2023.jpeg)

2. "Show me talks in Spanish"

![](./demos/talks-in-spanish.jpeg)

3. "Find posts about WebXR"

![](./demos/posts-webxr.jpeg)

4. "Are there videos about RAG?"

![](./demos/videos-about-rag.jpeg)


## Development

The project uses TypeScript natively in Node.js. The SDK was generated using:
1. The GraphQL API at [https://tml-api.herokuapp.com/graphiql](https://tml-api.herokuapp.com/graphiql)
2. [GenQL](https://genql.dev/docs) to generate the TypeScript SDK
3. File extensions were changed to `.ts` to enable native TypeScript support

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

[Erick Wendel](https://github.com/erickwendel)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 