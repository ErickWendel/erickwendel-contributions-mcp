import { z } from "zod";
import type { VideosParams, McpResponse, McpTextContent } from '../types/index.ts';
import { fetchVideos } from '../services/api.ts';
import { TOOL_CONFIG } from '../config/api.ts';

/**
 * MCP tool definition for getting videos
 */
export const getVideosTool = {
  name: TOOL_CONFIG.videos.name,
  description: TOOL_CONFIG.videos.description,
  parameters: {
    id: z.string().optional().describe("Filter videos by ID"),
    title: z.string().optional().describe("Filter videos by title"),
    language: z.string().optional().describe("Filter videos by language"),
    skip: z.number().optional().default(0).describe("Number of videos to skip"),
    limit: z.number().optional().default(10).describe("Maximum number of videos to return"),
  },
  handler: async (params: VideosParams): Promise<McpResponse> => {
    try {
      const result = await fetchVideos(params);

      if (!result.getVideos) {
        throw new Error('No results returned from API');
      }

      const content: McpTextContent = {
        type: "text",
        text: `Videos Results:\n\n${JSON.stringify(result.getVideos, null, 2)}`
      };

      return {
        content: [content],
      };
    } catch (error) {
      throw new Error(`Failed to fetch videos: ${error.message}`);
    }
  }
}; 