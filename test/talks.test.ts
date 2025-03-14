import { describe, it, after } from 'node:test';
import assert from 'node:assert';
import { createMcpClient } from './setup.ts';
import { TOOL_CONFIG } from '../src/config/api.ts';
import type { McpToolResponse } from './types.ts';

describe('Talks API Tests', async () => {
  const client = await createMcpClient();
  after(async () => {
    await client.close();
  });
  it('should get a list of talks with default pagination', async () => {
    const result = await client.callTool({
      name: TOOL_CONFIG.talks.name,
      arguments: {}
    }) as McpToolResponse;
    
    assert.ok(result.content[0].text.includes('Talks Results'));
    const data = JSON.parse(result.content[0].text.split('\n\n')[1]);
    assert.ok(data.totalCount > 0);
    assert.ok(Array.isArray(data.talks));
    assert.equal(data.talks.length, 10); // Default limit
  });

  it('should get a limited number of talks', async () => {
    const limit = 2;
    const result = await client.callTool({
      name: TOOL_CONFIG.talks.name,
      arguments: { limit }
    }) as McpToolResponse;
    
    const data = JSON.parse(result.content[0].text.split('\n\n')[1]);
    assert.equal(data.talks.length, limit);
  });

  it('should filter talks by language', async () => {
    const result = await client.callTool({
      name: TOOL_CONFIG.talks.name,
      arguments: { 
        language: 'es',
        limit: 5
      }
    }) as McpToolResponse;
    
    const data = JSON.parse(result.content[0].text.split('\n\n')[1]);
    assert.ok(data.talks.every(talk => talk.language === 'es'));
  });

  // it('should filter talks by country', async () => {
  //   const country = 'Spain';
  //   const result = await client.callTool({
  //     name: TOOL_CONFIG.talks.name,
  //     arguments: { 
  //       country,
  //       limit: 5
  //     }
  //   }) as McpToolResponse;
  //   console.log('content', result.content);
  //   const data = JSON.parse(result.content[0].text.split('\n\n')[1]);
  //   assert.ok(data.talks.every(talk => talk.location?.country === country));
  // });

  // it('should get talk counts by group', async () => {
  //   const result = await client.callTool({
  //     name: TOOL_CONFIG.talks.name,
  //     arguments: { 
  //       count_only: true,
  //       group_by: 'language'
  //     }
  //   }) as McpToolResponse;
    
  //   assert.ok(result.content[0].text.includes('Total talks:'));
  //   assert.ok(result.content[0].text.includes('Breakdown by language:'));
  // });
}); 