# MCP Server Capabilities

This document describes all the capabilities exposed by the Erick Wendel Contributions MCP server.

## Overview

The server implements the full Model Context Protocol specification with three main capability types:

- **Tools**: Executable functions that perform actions or retrieve data
- **Prompts**: Pre-configured prompt templates for common queries
- **Resources**: Static or dynamic data exposed via URI

## Tools

### get-talks

Retrieves talks with filtering and grouping capabilities.

**Parameters:**
- `id` (string, optional): Filter by specific talk ID
- `title` (string, optional): Filter by title keyword
- `language` (string, optional): Filter by language (e.g., 'english', 'portuguese', 'spanish')
- `city` (string, optional): Filter by city
- `country` (string, optional): Filter by country
- `year` (number, optional): Filter by year
- `limit` (number, optional, default: 10): Number of results to return
- `offset` (number, optional, default: 0): Pagination offset
- `groupBy` (string, optional): Group results by 'language', 'country', or 'city'

**Example Usage:**
```json
{
  "name": "get-talks",
  "arguments": {
    "language": "portuguese",
    "year": 2024,
    "limit": 20
  }
}
```

### get-posts

Fetches blog posts with filtering options.

**Parameters:**
- `id` (string, optional): Filter by specific post ID
- `title` (string, optional): Filter by title keyword
- `language` (string, optional): Filter by language
- `portal` (string, optional): Filter by portal/website
- `limit` (number, optional, default: 10): Number of results
- `offset` (number, optional, default: 0): Pagination offset

**Example Usage:**
```json
{
  "name": "get-posts",
  "arguments": {
    "portal": "dev.to",
    "limit": 15
  }
}
```

### get-videos

Retrieves videos with filtering capabilities.

**Parameters:**
- `id` (string, optional): Filter by specific video ID
- `title` (string, optional): Filter by title keyword
- `language` (string, optional): Filter by language
- `limit` (number, optional, default: 10): Number of results
- `offset` (number, optional, default: 0): Pagination offset

**Example Usage:**
```json
{
  "name": "get-videos",
  "arguments": {
    "title": "Node.js",
    "language": "english"
  }
}
```

### check-status

Verifies API health and availability.

**Parameters:** None

**Example Usage:**
```json
{
  "name": "check-status",
  "arguments": {}
}
```

## Prompts

### find-content

Generates optimized queries for finding specific content.

**Parameters:**
- `contentType` (enum: 'talks' | 'posts' | 'videos'): Type of content to search
- `topic` (string, optional): Topic or keyword to search for
- `language` (string, optional): Language filter

**Example Usage:**
```json
{
  "name": "find-content",
  "arguments": {
    "contentType": "talks",
    "topic": "Docker",
    "language": "portuguese"
  }
}
```

**Generated Prompt:**
> "Find talks about Docker in portuguese. Use the get-talks tool to retrieve the information."

### summarize-activity

Creates comprehensive summaries of content activity.

**Parameters:**
- `year` (number, optional): Filter by specific year

**Example Usage:**
```json
{
  "name": "summarize-activity",
  "arguments": {
    "year": 2024
  }
}
```

**Generated Prompt:**
> "Summarize Erick Wendel's content activity in 2024. Use get-talks, get-posts, and get-videos tools to gather all content and provide statistics."

## Resources

### erickwendel://about

Server metadata and information about capabilities.

**URI:** `erickwendel://about`

**MIME Type:** `application/json`

**Content Structure:**
```json
{
  "name": "Erick Wendel",
  "bio": "Developer Advocate, Microsoft MVP, and content creator...",
  "website": "https://erickwendel.com.br",
  "server": {
    "name": "erickwendel-api-service",
    "version": "1.0.0",
    "description": "...",
    "capabilities": ["tools", "prompts", "resources"],
    "tools": ["get-talks", "get-posts", "get-videos", "check-status"],
    "prompts": ["find-content", "summarize-activity"],
    "resources": ["about", "statistics"]
  }
}
```

### erickwendel://statistics

Information about available statistics and queries.

**URI:** `erickwendel://statistics`

**MIME Type:** `application/json`

**Content Structure:**
```json
{
  "description": "Use the available tools to fetch real-time statistics",
  "availableQueries": [
    "Total talks by language",
    "Total talks by country",
    "Posts by portal",
    "Videos by language"
  ],
  "tools": {
    "talks": "get-talks with groupBy parameter",
    "posts": "get-posts for blog content",
    "videos": "get-videos for video content"
  }
}
```

## Usage Examples

### Example 1: Find all talks in Spanish from 2024

```typescript
// Using tools directly
await client.callTool({
  name: 'get-talks',
  arguments: {
    language: 'spanish',
    year: 2024
  }
});
```

### Example 2: Use prompt to find content

```typescript
// Using prompts
const prompt = await client.getPrompt({
  name: 'find-content',
  arguments: {
    contentType: 'posts',
    topic: 'WebAssembly'
  }
});
// Then execute the generated prompt
```

### Example 3: Access server metadata

```typescript
// Using resources
const aboutData = await client.readResource({
  uri: 'erickwendel://about'
});
console.log(JSON.parse(aboutData.contents[0].text));
```

## Best Practices

1. **Use Prompts for Complex Queries**: When you need to combine multiple tools or create sophisticated queries, use the provided prompts as templates.

2. **Check Resources First**: Before making queries, read the `erickwendel://about` resource to understand available capabilities.

3. **Use Grouping for Statistics**: When you need aggregated data, use the `groupBy` parameter in `get-talks` instead of processing all records client-side.

4. **Pagination**: For large datasets, use `limit` and `offset` parameters to implement efficient pagination.

5. **Health Checks**: Regularly use `check-status` tool to verify API availability before making bulk requests.

## Integration with AI Assistants

This server is designed to work seamlessly with AI assistants like Claude, Cursor, and other MCP-compatible clients. The prompts are particularly useful for AI agents to understand how to query the data effectively.

### Example AI Query Patterns

**User:** "Show me all talks Erick gave in Brazil"
**AI Agent:** Uses `get-talks` with `country: "Brazil"`

**User:** "What content is available about Kubernetes?"
**AI Agent:** Uses `find-content` prompt or directly calls all three get-* tools with `title: "Kubernetes"`

**User:** "Give me statistics about content in 2024"
**AI Agent:** Uses `summarize-activity` prompt with `year: 2024`
