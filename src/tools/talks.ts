import { z } from "zod";
import type { TalksParams, Talk, McpResponse, McpTextContent } from '../types/index.ts';
import { fetchTalks, fetchTalksByYear } from '../services/api.ts';
import { TOOL_CONFIG } from '../config/api.ts';

/**
 * Calculates group counts from an array of talks
 */
function calculateGroupCounts(talks: Talk[], groupBy: string): Map<string, number> {
  const counts = new Map<string, number>();
  
  talks.forEach(talk => {
    if (!talk) return;
    
    let value = '';
    switch(groupBy) {
      case 'language':
        value = talk.language || 'unknown';
        break;
      case 'country':
        value = talk.location?.country || 'unknown';
        break;
      case 'city':
        value = talk.location?.city || 'unknown';
        break;
      default:
        return;
    }
    counts.set(value, (counts.get(value) || 0) + 1);
  });

  return counts;
}

/**
 * Formats the group counts for display
 */
function formatGroupCounts(counts: Map<string, number>, groupBy: string): string {
  let response = `\n\nBreakdown by ${groupBy}:`;
  for (const [key, count] of counts.entries()) {
    response += `\n${key}: ${count}`;
  }
  return response;
}

/**
 * MCP tool definition for getting talks
 */
export const getTalksTool = {
  name: TOOL_CONFIG.talks.name,
  description: TOOL_CONFIG.talks.description,
  parameters: {
    id: z.string().optional().describe("Filter talks by ID"),
    title: z.string().optional().describe("Filter talks by title"),
    language: z.string().optional().describe("Filter talks by language (e.g., 'spanish', 'english', 'portuguese' or direct codes like 'es', 'en', 'pt-br')"),
    city: z.string().optional().describe("Filter talks by city"),
    country: z.string().optional().describe("Filter talks by country"),
    year: z.number().optional().describe("Filter talks by year"),
    skip: z.number().optional().default(0).describe("Number of talks to skip"),
    limit: z.number().optional().default(10).describe("Maximum number of talks to return"),
    count_only: z.boolean().optional().default(false).describe("If true, returns only the count without talk details"),
    group_by: z.string().optional().describe("Group counts by a specific field (language, country, city)"),
  },
  handler: async (params: TalksParams): Promise<McpResponse> => {
    try {
      const { id, title, language, city, country, year, skip, limit, count_only, group_by } = params;
      
      // Handle year-specific filtering
      if (year) {
        const allTalks = await fetchTalksByYear({ id, title, language, city, country, year });
        
        if (count_only) {
          let response = `Total talks in ${year}: ${allTalks.length}`;
          
          if (group_by) {
            const counts = calculateGroupCounts(allTalks, group_by);
            response += formatGroupCounts(counts, group_by);
          }

          const content: McpTextContent = {
            type: "text",
            text: response
          };

          return {
            content: [content],
          };
        }

        // Apply pagination to filtered results
        const paginatedTalks = allTalks.slice(skip || 0, (skip || 0) + (limit || 10));

        const content: McpTextContent = {
          type: "text",
          text: `Talks Results for ${year}:\n\n${JSON.stringify({ 
            totalCount: allTalks.length,
            retrieved: paginatedTalks.length,
            talks: paginatedTalks 
          }, null, 2)}`
        };

        return {
          content: [content],
        };
      }

      // Regular query without year filtering
      const result = await fetchTalks({ id, title, language, city, country, skip, limit, count_only });

      if (!result.getTalks) {
        throw new Error('No results returned from API');
      }

      if (count_only) {
        let response = `Total talks: ${result.getTalks.totalCount}`;
        
        if (group_by && result.getTalks.talks) {
          const counts = calculateGroupCounts(result.getTalks.talks, group_by);
          response += formatGroupCounts(counts, group_by);
        }

        const content: McpTextContent = {
          type: "text",
          text: response
        };

        return {
          content: [content],
        };
      }

      const content: McpTextContent = {
        type: "text",
        text: `Talks Results:\n\n${JSON.stringify(result.getTalks, null, 2)}`
      };

      return {
        content: [content],
      };
    } catch (error) {
      throw new Error(`Failed to fetch talks: ${error.message}`);
    }
  }
}; 