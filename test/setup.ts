import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export async function createMcpClient() {
  const transport = new StdioClientTransport({
    command: "node",
    args: ["src/index.ts"]
  });

  const client = new Client(
    {
      name: "mcp-test-client",
      version: "1.0.0"
    },
    {
      capabilities: {
        prompts: {},
        resources: {},
        tools: {}
      }
    }
  );

  await client.connect(transport);
  return client;
} 