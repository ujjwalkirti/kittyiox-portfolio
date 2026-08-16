'use server';

export interface YouTubeChannelStats {
  subscriberCount: string;
  rawSubscriberCount: number;
  viewCount: string;
  rawViewCount: number;
  videoCount: string;
  rawVideoCount: number;
  robloxFollowers: string;
  channelTitle: string;
  channelHandle: string;
  avatarUrl?: string;
  customUrl?: string;
  isLive: boolean;
  updatedAt: string;
  errorMessage?: string;
}

// Fallback values when API key is not configured or still loading
const FALLBACK_STATS: YouTubeChannelStats = {
  subscriberCount: '—',
  rawSubscriberCount: 0,
  viewCount: '—',
  rawViewCount: 0,
  videoCount: '—',
  rawVideoCount: 0,
  robloxFollowers: '@kittyiox',
  channelTitle: 'kittyiox',
  channelHandle: '@kittyiox',
  isLive: false,
  updatedAt: new Date().toISOString(),
};

export interface TopVideo {
  title: string;
  description: string;
  url: string;
  viewCount: number;
}

const FALLBACK_TOP_VIDEOS: TopVideo[] = [
  {
    title: 'Score 100, every round',
    description: 'The DTI scoring formula, fully decoded.',
    url: 'https://www.youtube.com/@kittyiox',
    viewCount: 0,
  },
  {
    title: 'Old money, new avatar',
    description: 'Quiet luxury built from free items.',
    url: 'https://www.youtube.com/@kittyiox',
    viewCount: 0,
  },
  {
    title: 'The villain era lookbook',
    description: 'When the prompt just says "evil".',
    url: 'https://www.youtube.com/@kittyiox',
    viewCount: 0,
  },
  {
    title: 'Y2K runway speedrun',
    description: 'Five full fits in under ten minutes.',
    url: 'https://www.youtube.com/@kittyiox',
    viewCount: 0,
  },
];

function truncateDescription(text: string, maxLen = 70): string {
  const firstLine = (text || '').split('\n')[0].trim();
  if (firstLine.length <= maxLen) return firstLine;
  const cut = firstLine.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim() + '…';
}

async function resolveChannelId(apiKey: string, channelHandle: string): Promise<string | null> {
  let url = `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${encodeURIComponent(
    channelHandle
  )}&key=${encodeURIComponent(apiKey)}`;
  let response = await fetch(url, { next: { revalidate: 3600 } });
  let data = await response.json();

  if (!data.items || data.items.length === 0) {
    if (channelHandle.startsWith('UC')) {
      return channelHandle;
    }
    url = `https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=${encodeURIComponent(
      channelHandle
    )}&key=${encodeURIComponent(apiKey)}`;
    response = await fetch(url, { next: { revalidate: 3600 } });
    data = await response.json();
  }

  return data.items?.[0]?.id || null;
}

/**
 * Server Function / Server Action to fetch the channel's top-viewed
 * YouTube Shorts (title, short description, url, view count).
 */
export async function getTopShorts(limit = 4): Promise<TopVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY || process.env.YT_API_KEY;
  const channelHandle = (process.env.YOUTUBE_CHANNEL_HANDLE || 'kittyiox').replace(/^@/, '');

  if (!apiKey) {
    return FALLBACK_TOP_VIDEOS.slice(0, limit);
  }

  try {
    const channelId = await resolveChannelId(apiKey, channelHandle);
    if (!channelId) {
      return FALLBACK_TOP_VIDEOS.slice(0, limit);
    }

    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=id&channelId=${encodeURIComponent(
      channelId
    )}&type=video&videoDuration=short&order=viewCount&maxResults=${limit}&key=${encodeURIComponent(
      apiKey
    )}`;
    const searchResponse = await fetch(searchUrl, { next: { revalidate: 3600 } });
    const searchData = await searchResponse.json();

    const videoIds: string[] = (searchData.items || [])
      .map((item: any) => item.id?.videoId)
      .filter(Boolean);

    if (videoIds.length === 0) {
      return FALLBACK_TOP_VIDEOS.slice(0, limit);
    }

    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds.join(
      ','
    )}&key=${encodeURIComponent(apiKey)}`;
    const videosResponse = await fetch(videosUrl, { next: { revalidate: 3600 } });
    const videosData = await videosResponse.json();

    const items = videosData.items || [];
    if (items.length === 0) {
      return FALLBACK_TOP_VIDEOS.slice(0, limit);
    }

    const topVideos: TopVideo[] = items
      .map((item: any) => ({
        title: item.snippet?.title || '',
        description: truncateDescription(item.snippet?.description || ''),
        url: `https://youtube.com/shorts/${item.id}`,
        viewCount: parseInt(item.statistics?.viewCount, 10) || 0,
      }))
      .sort((a: TopVideo, b: TopVideo) => b.viewCount - a.viewCount);

    return topVideos.length > 0 ? topVideos : FALLBACK_TOP_VIDEOS.slice(0, limit);
  } catch (error) {
    console.error('[Failed to fetch YouTube Top Shorts]', error);
    return FALLBACK_TOP_VIDEOS.slice(0, limit);
  }
}

function formatCompactNumber(num: number, suffixPlus = false): string {
  if (isNaN(num)) return '0';
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B' + (suffixPlus ? '+' : '');
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M' + (suffixPlus ? '+' : '');
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K' + (suffixPlus ? '+' : '');
  }
  return num.toLocaleString();
}

/**
 * Server Function / Server Action to fetch YouTube channel statistics
 * using YouTube Data API v3.
 */
export async function getYouTubeChannelStats(): Promise<YouTubeChannelStats> {
  const apiKey = process.env.YOUTUBE_API_KEY || process.env.YT_API_KEY;
  const channelHandle = (process.env.YOUTUBE_CHANNEL_HANDLE || 'kittyiox').replace(/^@/, '');
  const robloxFollowers = process.env.NEXT_PUBLIC_ROBLOX_FOLLOWERS || '@kittyiox';

  if (!apiKey) {
    return {
      ...FALLBACK_STATS,
      robloxFollowers,
      errorMessage: 'YOUTUBE_API_KEY is not configured in .env.local. Displaying default portfolio stats.',
      updatedAt: new Date().toISOString(),
    };
  }

  try {
    // 1. Try querying by handle
    let url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&forHandle=${encodeURIComponent(
      channelHandle
    )}&key=${encodeURIComponent(apiKey)}`;

    let response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache on server for 1 hour
    });

    let data = await response.json();

    // 2. If no items found with forHandle, check if channelHandle might be a Channel ID (e.g. UC...) or forUsername
    if (!data.items || data.items.length === 0) {
      if (channelHandle.startsWith('UC')) {
        url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${encodeURIComponent(
          channelHandle
        )}&key=${encodeURIComponent(apiKey)}`;
      } else {
        url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&forUsername=${encodeURIComponent(
          channelHandle
        )}&key=${encodeURIComponent(apiKey)}`;
      }

      response = await fetch(url, { next: { revalidate: 3600 } });
      data = await response.json();
    }

    if (data.error) {
      console.error('[YouTube API Error]', data.error);
      return {
        ...FALLBACK_STATS,
        robloxFollowers,
        isLive: false,
        errorMessage: data.error.message || 'Error communicating with YouTube API',
        updatedAt: new Date().toISOString(),
      };
    }

    if (!data.items || data.items.length === 0) {
      return {
        ...FALLBACK_STATS,
        robloxFollowers,
        isLive: false,
        errorMessage: `Channel @${channelHandle} not found on YouTube.`,
        updatedAt: new Date().toISOString(),
      };
    }

    const item = data.items[0];
    const stats = item.statistics || {};
    const snippet = item.snippet || {};

    const rawSubscribers = parseInt(stats.subscriberCount, 10) || 0;
    const rawViews = parseInt(stats.viewCount, 10) || 0;
    const rawVideos = parseInt(stats.videoCount, 10) || 0;

    return {
      subscriberCount: formatCompactNumber(rawSubscribers),
      rawSubscriberCount: rawSubscribers,
      viewCount: formatCompactNumber(rawViews, true),
      rawViewCount: rawViews,
      videoCount: formatCompactNumber(rawVideos, true),
      rawVideoCount: rawVideos,
      robloxFollowers,
      channelTitle: snippet.title || 'kittyiox',
      channelHandle: snippet.customUrl ? snippet.customUrl : `@${channelHandle}`,
      avatarUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
      isLive: true,
      updatedAt: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error('[Failed to fetch YouTube Stats]', error);
    return {
      ...FALLBACK_STATS,
      robloxFollowers,
      isLive: false,
      errorMessage: error.message || 'Network error fetching YouTube data',
      updatedAt: new Date().toISOString(),
    };
  }
}
