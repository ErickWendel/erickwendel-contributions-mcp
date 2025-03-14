import { describe, it, after } from 'node:test';
import assert from 'node:assert';
import { createMcpClient } from './setup.ts';
import { TOOL_CONFIG } from '../src/config/api.ts';
import type { McpToolResponse } from './types.ts';

describe('Videos API Tests', async () => {
  const client = await createMcpClient();
  after(async () => {
    await client.close();
  });
  it('should get a list of videos with default pagination', async () => {
    const result = await client.callTool({
      name: TOOL_CONFIG.videos.name,
      arguments: {}
    }) as McpToolResponse;
    
    assert.ok(result.content[0].text.includes('Videos Results'));
    const data = JSON.parse(result.content[0].text.split('\n\n')[1]);
    assert.ok(data.totalCount > 0);
    assert.ok(Array.isArray(data.videos));
    assert.equal(data.videos.length, 10); // Default limit
  });

  it('should get a limited number of videos', async () => {
    const limit = 2;
    const result = await client.callTool({
      name: TOOL_CONFIG.videos.name,
      arguments: { limit }
    }) as McpToolResponse;
    
    const data = JSON.parse(result.content[0].text.split('\n\n')[1]);
    assert.equal(data.videos.length, limit);
  });

  it('should filter videos by language', async () => {
    const result = await client.callTool({
      name: TOOL_CONFIG.videos.name,
      arguments: { 
        language: 'en-us',
        limit: 5
      }
    }) as McpToolResponse;
    
    const data = JSON.parse(result.content[0].text.split('\n\n')[1]);
    assert.ok(data.videos.every(video => video.language === 'en-us'));
  });
}); 