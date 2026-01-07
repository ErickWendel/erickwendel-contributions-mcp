import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import type { McpToolResponse } from './types.ts'

/**
 * Creates an MCP client connected to the server
 */
export async function createTestClient () {
  const transport = new StdioClientTransport({
    command: 'node',
    args: ['--experimental-strip-types', 'src/index.ts']
  })

  const client = new Client({
    name: 'test-client',
    version: '1.0.0'
  }, {
    capabilities: {}
  })

  await client.connect(transport)
  return client
}

/**
 * Parses the tool response and extracts the JSON data
 * @param result - The MCP tool response
 * @returns Parsed data object
 */
export function parseToolResponse<T = any> (result: McpToolResponse): T {
  const content = result.content[0]
  if (!content?.text) {
    throw new Error('Invalid tool response: missing content text')
  }

  // The response format is typically: "Header\n\nJSON"
  const parts = content.text.split('\n\n')
  const jsonString = parts.length > 1 ? parts[1] : parts[0]

  return JSON.parse(jsonString ?? '{}') as T
}
