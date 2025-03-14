import { z } from "zod";
import type { PostsParams, McpResponse, McpTextContent } from '../types/index.ts';
import { fetchPosts } from '../services/api.ts';
import { TOOL_CONFIG } from '../config/api.ts';

/**
 * MCP tool definition for getting posts
 */
export const getPostsTool = {
  name: TOOL_CONFIG.posts.name,
  description: TOOL_CONFIG.posts.description,
  parameters: {
    id: z.string().optional().describe("Filter posts by ID"),
    title: z.string().optional().describe("Filter posts by title"),
    language: z.string().optional().describe("Filter posts by language"),
    portal: z.string().optional().describe("Filter posts by portal"),
    skip: z.number().optional().default(0).describe("Number of posts to skip"),
    limit: z.number().optional().default(10).describe("Maximum number of posts to return"),
  },
  handler: async (params: PostsParams): Promise<McpResponse> => {
    try {
      const result = await fetchPosts(params);

      if (!result.getPosts) {
        throw new Error('No results returned from API');
      }

      const content: McpTextContent = {
        type: "text",
        text: `Posts Results:\n\n${JSON.stringify(result.getPosts, null, 2)}`
      };

      return {
        content: [content],
      };
    } catch (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
  }
}; 