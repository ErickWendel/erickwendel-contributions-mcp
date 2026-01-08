#!/usr/bin/env node --experimental-strip-types --no-warnings

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { SERVER_CONFIG } from './config/api.ts'
import { getTalksTool } from './tools/talks.ts'
import { getPostsTool } from './tools/posts.ts'
import { getVideosTool } from './tools/videos.ts'
import { checkStatusTool } from './tools/status.ts'
import { z } from 'zod'

/**
 * Initialize the MCP server and register all tools, prompts, and resources
 */
async function initializeServer () {
  // Create server instance
  const server = new McpServer({
    name: SERVER_CONFIG.name,
    version: SERVER_CONFIG.version,
    description: SERVER_CONFIG.description
  })

  // Register all tools
  server.tool(
    getTalksTool.name,
    getTalksTool.description,
    getTalksTool.parameters,
    getTalksTool.handler
  )

  server.tool(
    getPostsTool.name,
    getPostsTool.description,
    getPostsTool.parameters,
    getPostsTool.handler
  )

  server.tool(
    getVideosTool.name,
    getVideosTool.description,
    getVideosTool.parameters,
    getVideosTool.handler
  )

  server.tool(
    checkStatusTool.name,
    checkStatusTool.description,
    checkStatusTool.parameters,
    checkStatusTool.handler
  )

  // Register prompts for common queries
  server.registerPrompt(
    'find-content',
    {
      title: 'Find Content',
      description: 'Generate a query to find specific content from Erick Wendel\'s contributions',
      argsSchema: {
        contentType: z.enum(['talks', 'posts', 'videos']).describe('Type of content to search'),
        topic: z.string().optional().describe('Topic or keyword to search for'),
        language: z.string().optional().describe('Language filter (e.g., english, portuguese, spanish)')
      }
    },
    ({ contentType, topic, language }) => ({
      messages: [{
        role: 'user',
        content: {
          type: 'text',
          text: `Find ${contentType} about ${topic || 'any topic'}${language ? ` in ${language}` : ''}. Use the get-${contentType} tool to retrieve the information.`
        }
      }]
    })
  )

  server.registerPrompt(
    'summarize-activity',
    {
      title: 'Summarize Activity',
      description: 'Generate a summary of Erick Wendel\'s content activity',
      argsSchema: {
        year: z.number().optional().describe('Filter by specific year')
      }
    },
    ({ year }) => ({
      messages: [{
        role: 'user',
        content: {
          type: 'text',
          text: `Summarize Erick Wendel's content activity${year ? ` in ${year}` : ''}. Use get-talks, get-posts, and get-videos tools to gather all content and provide statistics.`
        }
      }]
    })
  )

  // Register resources for server information
  server.registerResource(
    'about',
    'erickwendel://about',
    {
      title: 'About Erick Wendel',
      description: 'Information about Erick Wendel and this MCP server',
      mimeType: 'application/json'
    },
    async (uri) => ({
      contents: [{
        uri: uri.href,
        mimeType: 'application/json',
        text: JSON.stringify({
          name: 'Erick Wendel',
          bio: 'Developer Advocate, Microsoft MVP, and content creator focused on Node.js, JavaScript, and web technologies',
          website: 'https://erickwendel.com.br',
          server: {
            name: SERVER_CONFIG.name,
            version: SERVER_CONFIG.version,
            description: SERVER_CONFIG.description,
            capabilities: ['tools', 'prompts', 'resources'],
            tools: ['get-talks', 'get-posts', 'get-videos', 'check-status'],
            prompts: ['find-content', 'summarize-activity'],
            resources: ['about', 'statistics']
          }
        }, null, 2)
      }]
    })
  )

  server.registerResource(
    'statistics',
    'erickwendel://statistics',
    {
      title: 'Content Statistics',
      description: 'Overall statistics about available content',
      mimeType: 'application/json'
    },
    async (uri) => ({
      contents: [{
        uri: uri.href,
        mimeType: 'application/json',
        text: JSON.stringify({
          description: 'Use the available tools to fetch real-time statistics',
          availableQueries: [
            'Total talks by language',
            'Total talks by country',
            'Posts by portal',
            'Videos by language'
          ],
          tools: {
            talks: 'get-talks with groupBy parameter',
            posts: 'get-posts for blog content',
            videos: 'get-videos for video content'
          }
        }, null, 2)
      }]
    })
  )

  return server
}

/**
 * Main entry point - starts the MCP server on stdio
 */
async function main () {
  const server = await initializeServer()
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Erick Wendel API MCP Server running on stdio')
}

main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
