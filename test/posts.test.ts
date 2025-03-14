import { describe, it, after } from 'node:test';
import assert from 'node:assert';
import { createMcpClient } from './setup.ts';
import { TOOL_CONFIG } from '../src/config/api.ts';
import type { McpToolResponse } from './types.ts';

describe('Posts API Tests', async () => {
  const client = await createMcpClient();
  after(async () => {
    await client.close();
  });

  it('should get a list of posts with default pagination', async () => {
    const result = await client.callTool({
      name: TOOL_CONFIG.posts.name,
      arguments: {}
    }) as McpToolResponse;
    
    assert.ok(result.content[0].text.includes('Posts Results'));
    const data = JSON.parse(result.content[0].text.split('\n\n')[1]);
    assert.ok(data.totalCount > 0);
    assert.ok(Array.isArray(data.posts));
    assert.equal(data.posts.length, 10); // Default limit
  });

  it('should get a limited number of posts', async () => {
    const limit = 2;
    const result = await client.callTool({
      name: TOOL_CONFIG.posts.name,
      arguments: { limit }
    }) as McpToolResponse;
    
    const data = JSON.parse(result.content[0].text.split('\n\n')[1]);
    assert.equal(data.posts.length, limit);
  });

  it('should filter posts by language', async () => {
    const result = await client.callTool({
      name: TOOL_CONFIG.posts.name,
      arguments: { 
        language: 'en-us',
        limit: 5
      }
    }) as McpToolResponse;
    
    const data = JSON.parse(result.content[0].text.split('\n\n')[1]);
    assert.ok(data.posts.every(post => post.language === 'en-us'));
  });

  it('should filter posts by portal', async () => {
    const portal = 'Linkedin';
    const result = await client.callTool({
      name: TOOL_CONFIG.posts.name,
      arguments: { 
        portal,
        limit: 5
      }
    }) as McpToolResponse;
    
    const data = JSON.parse(result.content[0].text.split('\n\n')[1]);
    assert.ok(data.posts.every(post => post.portal?.name?.includes(portal)));
  });
}); 