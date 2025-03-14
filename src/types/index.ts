// Response types for GraphQL queries

export interface Location {
  country: string | null;
  city: string | null;
}

export interface Event {
  link: string | null;
  name: string | null;
}

export interface Talk {
  _id: string;
  title: string;
  abstract: string | null;
  type: string | null;
  event: Event | null;
  slides: string | null;
  video: string | null;
  tags: string[];
  location: Location | null;
  language: string;
  date: string;
}

export interface TalksResponse {
  getTalks: {
    totalCount: number;
    retrieved: number;
    processedIn: number;
    talks: Talk[];
  } | null;
}

export interface Post {
  _id: string;
  title: string;
  abstract: string | null;
  type: string | null;
  link: string | null;
  additionalLinks: string[];
  portal: {
    link: string | null;
    name: string | null;
  } | null;
  tags: string[];
  language: string;
  date: string;
}

export interface PostsResponse {
  getPosts: {
    totalCount: number;
    retrieved: number;
    processedIn: number;
    posts: Post[];
  } | null;
}

export interface Video {
  _id: string;
  title: string;
  abstract: string | null;
  type: string | null;
  link: string | null;
  additionalLinks: string[];
  tags: string[];
  language: string;
  date: string;
}

export interface VideosResponse {
  getVideos: {
    totalCount: number;
    retrieved: number;
    processedIn: number;
    videos: Video[];
  } | null;
}


export interface StatusResponse {
  isAlive: boolean;
}

// Tool parameters types
export interface TalksParams {
  id?: string;
  title?: string;
  language?: string;
  city?: string;
  country?: string;
  year?: number;
  skip?: number;
  limit?: number;
  count_only?: boolean;
  group_by?: string;
}

export interface PostsParams {
  id?: string;
  title?: string;
  language?: string;
  portal?: string;
  skip?: number;
  limit?: number;
}

export interface VideosParams {
  id?: string;
  title?: string;
  language?: string;
  skip?: number;
  limit?: number;
}


// MCP response types
export interface McpTextContent {
  type: "text";
  text: string;
  [key: string]: unknown;
}

export interface McpImageContent {
  type: "image";
  data: string;
  mimeType: string;
  [key: string]: unknown;
}

export interface McpResourceContent {
  type: "resource";
  resource: {
    text: string;
    uri: string;
    mimeType?: string;
    [key: string]: unknown;
  } | {
    uri: string;
    blob: string;
    mimeType?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export type McpContent = McpTextContent | McpImageContent | McpResourceContent;

export interface McpResponse {
  content: McpContent[];
  _meta?: Record<string, unknown>;
  isError?: boolean;
  [key: string]: unknown;
} 