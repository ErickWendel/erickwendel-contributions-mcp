import { createClient } from '../../erickwendel-sdk/index.ts';

// GraphQL API endpoint
export const GRAPHQL_API = 'https://tml-api.herokuapp.com/graphql';

// Initialize the GraphQL client
export const client = createClient({
  url: GRAPHQL_API,
});

// Tool configurations
export const TOOL_CONFIG = {
  talks: {
    name: "get_talks",
    description: "Get a list of talks with optional filtering and pagination."
  },
  posts: {
    name: "get_posts",
    description: "Get a list of posts with optional filtering and pagination."
  },
  videos: {
    name: "get_videos",
    description: "Get a list of videos with optional filtering and pagination."
  },
  projects: {
    name: "get_projects",
    description: "Get a list of projects with optional filtering and pagination."
  },
  status: {
    name: "check_status",
    description: "Check if the API is alive and responding."
  }
};

// Server configuration
export const SERVER_CONFIG = {
  name: "erickwendel-api-service",
  version: "1.0.0",
  description: "A service that provides access to Erick Wendel's content including talks, posts, videos, and projects.",
}; 