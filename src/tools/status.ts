import type { McpResponse, McpTextContent } from '../types/index.ts';
import { checkApiStatus } from '../services/api.ts';
import { TOOL_CONFIG } from '../config/api.ts';

/**
 * MCP tool definition for checking API status
 */
export const checkStatusTool = {
  name: TOOL_CONFIG.status.name,
  description: TOOL_CONFIG.status.description,
  parameters: {},
  handler: async (): Promise<McpResponse> => {
    try {
      const result = await checkApiStatus();

      const content: McpTextContent = {
        type: "text",
        text: `API Status: ${result.isAlive ? "Online" : "Offline"}`
      };

      return {
        content: [content],
      };
    } catch (error) {
      throw new Error(`Failed to check API status: ${error.message}`);
    }
  }
}; 