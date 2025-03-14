import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SERVER_CONFIG } from './config/api.ts';
import { getTalksTool } from './tools/talks.ts';
import { getPostsTool } from './tools/posts.ts';
import { getVideosTool } from './tools/videos.ts';
import { checkStatusTool } from './tools/status.ts';

/**
 * Initialize the MCP server and register all tools
 */
async function initializeServer() {
  // Create server instance
  const server = new McpServer({
    name: SERVER_CONFIG.name,
    version: SERVER_CONFIG.version,
    description: SERVER_CONFIG.description,
  });

  // Register all tools
  server.tool(
    getTalksTool.name,
    getTalksTool.description,
    getTalksTool.parameters,
    getTalksTool.handler
  );

  server.tool(
    getPostsTool.name,
    getPostsTool.description,
    getPostsTool.parameters,
    getPostsTool.handler
  );

  server.tool(
    getVideosTool.name,
    getVideosTool.description,
    getVideosTool.parameters,
    getVideosTool.handler
  );

  server.tool(
    checkStatusTool.name,
    checkStatusTool.description,
    checkStatusTool.parameters,
    checkStatusTool.handler
  );

  return server;
}

/**
 * Main entry point
 */
async function main() {
  // Initialize the server
  const server = await initializeServer();
  
  // Connect to stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // console.error for claude-desktop so it won't process this output
  console.error("Erick Wendel API MCP Server running on stdio");
}

// Start the server
main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
}); 
