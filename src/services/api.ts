import { client } from '../config/api.ts';
import type { 
  TalksResponse, 
  PostsResponse, 
  VideosResponse, 
  StatusResponse,
  Talk
} from '../types/index.ts';
import { getLanguageCode } from '../utils/language.ts';

/**
 * Fetches talks with optional filtering and pagination
 */
export async function fetchTalks(params: {
  id?: string;
  title?: string;
  language?: string;
  city?: string;
  country?: string;
  skip?: number;
  limit?: number;
  count_only?: boolean;
}): Promise<TalksResponse> {
  const { id, title, language, city, country, skip, limit, count_only } = params;
  const languageCode = getLanguageCode(language);

  return await client.query({
    getTalks: {
      __args: {
        _id: id,
        title,
        language: languageCode,
        city,
        country,
        skip,
        limit: count_only ? 0 : limit,
      },
      totalCount: true,
      retrieved: true,
      processedIn: true,
      talks: count_only ? {
        language: true,
        location: {
          country: true,
          city: true,
        }
      } : {
        _id: true,
        title: true,
        abstract: true,
        type: true,
        event: {
          link: true,
          name: true,
        },
        slides: true,
        video: true,
        tags: true,
        location: {
          country: true,
          city: true,
        },
        language: true,
        date: true,
      },
    },
  }) as TalksResponse;
}

/**
 * Fetches all talks for a specific year using pagination
 */
export async function fetchTalksByYear(params: {
  id?: string;
  title?: string;
  language?: string;
  city?: string;
  country?: string;
  year: number;
}): Promise<Talk[]> {
  const { id, title, language, city, country, year } = params;
  const languageCode = getLanguageCode(language);
  
  const allTalks: Talk[] = [];
  let currentSkip = 0;
  const BATCH_SIZE = 50;
  let shouldContinue = true;

  while (shouldContinue) {
    const result = await client.query({
      getTalks: {
        __args: {
          _id: id,
          title,
          language: languageCode,
          city,
          country,
          skip: currentSkip,
          limit: BATCH_SIZE,
        },
        totalCount: true,
        retrieved: true,
        processedIn: true,
        talks: {
          _id: true,
          title: true,
          abstract: true,
          type: true,
          event: {
            link: true,
            name: true,
          },
          slides: true,
          video: true,
          tags: true,
          location: {
            country: true,
            city: true,
          },
          language: true,
          date: true,
        },
      },
    }) as TalksResponse;

    if (!result.getTalks?.talks?.length) {
      shouldContinue = false;
      break;
    }

    const talks = result.getTalks.talks;
    const foundDifferentYear = talks?.some(talk => {
      if (!talk?.date) return false;
      const talkYear = new Date(talk.date).getFullYear();
      return talkYear < year;
    });

    // Filter talks for the specific year
    const yearFilteredTalks = talks?.filter(talk => {
      if (!talk?.date) return false;
      const talkYear = new Date(talk.date).getFullYear();
      return talkYear === year;
    }) || [];

    allTalks.push(...yearFilteredTalks);

    if (foundDifferentYear) {
      shouldContinue = false;
    } else {
      currentSkip += BATCH_SIZE;
    }
  }

  return allTalks;
}

/**
 * Fetches posts with optional filtering and pagination
 */
export async function fetchPosts(params: {
  id?: string;
  title?: string;
  language?: string;
  portal?: string;
  skip?: number;
  limit?: number;
}): Promise<PostsResponse> {
  const { id, title, language, portal, skip, limit } = params;
  const languageCode = getLanguageCode(language);

  return await client.query({
    getPosts: {
      __args: {
        _id: id,
        title,
        language: languageCode,
        portal,
        skip,
        limit,
      },
      totalCount: true,
      retrieved: true,
      processedIn: true,
      posts: {
        _id: true,
        title: true,
        abstract: true,
        type: true,
        link: true,
        additionalLinks: true,
        portal: {
          link: true,
          name: true,
        },
        tags: true,
        language: true,
        date: true,
      },
    },
  }) as PostsResponse;
}

/**
 * Fetches videos with optional filtering and pagination
 */
export async function fetchVideos(params: {
  id?: string;
  title?: string;
  language?: string;
  skip?: number;
  limit?: number;
}): Promise<VideosResponse> {
  const { id, title, language, skip, limit } = params;
  const languageCode = getLanguageCode(language);

  return await client.query({
    getVideos: {
      __args: {
        _id: id,
        title,
        language: languageCode,
        skip,
        limit,
      },
      totalCount: true,
      retrieved: true,
      processedIn: true,
      videos: {
        _id: true,
        title: true,
        abstract: true,
        type: true,
        link: true,
        additionalLinks: true,
        tags: true,
        language: true,
        date: true,
      },
    },
  }) as VideosResponse;
}

/**
 * Checks if the API is alive and responding
 */
export async function checkApiStatus(): Promise<StatusResponse> {
  return await client.query({
    isAlive: true,
  }) as StatusResponse;
} 