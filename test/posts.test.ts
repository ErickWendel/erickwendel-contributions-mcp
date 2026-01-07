import { describe, it, after } from 'node:test'
import assert from 'node:assert'
import { TOOL_CONFIG } from '../src/config/api.ts'
import type { McpToolResponse } from './types.ts'
import type { Post } from '../src/types/index.ts'
import { createTestClient, parseToolResponse } from './helpers.ts'

describe('Posts API Tests', async () => {
  const client = await createTestClient()

  after(async () => {
    await client.close()
  })

  it('should get a list of posts with default pagination', async () => {
    const result = await client.callTool({
      name: TOOL_CONFIG.posts.name,
      arguments: {}
    }) as McpToolResponse

    assert.ok(result.content[0]?.text.includes('Posts Results'))
    const data = parseToolResponse(result)
    assert.ok(data.posts.length > 0)
  })

  it('should filter posts by portal', async () => {
    const portal = 'DevTo'
    const result = await client.callTool({
      name: TOOL_CONFIG.posts.name,
      arguments: {
        portal,
        limit: 5
      }
    }) as McpToolResponse

    const data = parseToolResponse(result)
    assert.ok(data.posts.every((post: Post) => post.portal?.name?.includes(portal)))
  })
})
