import Parser from 'rss-parser';
import SermonCarousel from './SermonCarousel';

const CHANNEL_ID = 'UCJB9nBcmRQJ3CeuORXQDAVg';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export const revalidate = 30; // Faster refresh for live + new uploads

type Sermon = {
  id: string;
  title: string;
  speaker: string;
  date: string;
  thumbnail: string;
  videoId: string;
  viewCount: number;
  published: string;
};

async function getLiveVideoId(): Promise<string | null> {
  try {
    const res = await fetch(`https://www.youtube.com/channel/${CHANNEL_ID}/live`, {
      cache: 'no-cache',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!res.ok) return null;

    const html = await res.text();

    // Primary: og:url canonical for active live stream
    const ogMatch = html.match(/"og:url"[^>]*content="https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"/);
    if (ogMatch) {
      // Extra check: ensure page indicates it's live (avoid false positives)
      if (html.includes('"isLive":true') || html.includes('Live stream') || html.includes('watching now')) {
        return ogMatch[1];
      }
    }

    return null; // No strict match → no live
  } catch (err) {
    console.error('Live detection failed:', err);
    return null;
  }
}

export default async function YouTubeFeed() {
  try {
    const parser = new Parser({
      customFields: {
        item: [
          ['media:group', 'mediaGroup', { keepArray: false }],
          ['yt:videoId', 'videoId'],
        ],
      },
    });

    const [feed, liveVideoId] = await Promise.all([
      parser.parseURL(RSS_URL),
      getLiveVideoId(),
    ]);

    console.log('RSS items count:', feed.items?.length || 0);
    console.log('Most recent RSS title:', feed.items?.[0]?.title || 'none');
    console.log('Live ID detected:', liveVideoId || 'none');

    if (!feed.items || feed.items.length === 0) {
      throw new Error('Empty RSS feed');
    }

    let videos: Sermon[] = feed.items
      .slice(0, 15) // Take extra in case some fail parse
      .map((item: any) => {
        let videoId = item.videoId || ''; // From custom yt:videoId
        if (!videoId && item.guid) {
          videoId = item.guid.replace('yt:video:', '');
        }
        if (!videoId && item.link) {
          videoId = new URL(item.link).searchParams.get('v') || '';
        }

        if (!videoId) return null; // Skip invalid

        const title = item.title?.trim() || 'Untitled Sermon';
        const published = item.pubDate || item.isoDate || new Date().toISOString();
        const dateObj = new Date(published);
        const date = new Intl.DateTimeFormat('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          timeZone: 'Africa/Nairobi',
        }).format(dateObj);

        const thumbnail =
          item.mediaGroup?.['media:thumbnail']?.[0]?.$?.url ||
          `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        return {
          id: videoId,
          videoId,
          title,
          published,
          viewCount: 0,
          thumbnail,
          speaker: 'Kingdom Restoration Church',
          date,
        };
      })
      .filter((v): v is Sermon => v !== null);

    if (videos.length === 0) throw new Error('No valid videos parsed');

    // Trim to 8 newest
    videos = videos.slice(0, 8);

    const isLive = Boolean(liveVideoId);

    if (liveVideoId) {
      const alreadyInFeed = videos.some((v) => v.videoId === liveVideoId);

      if (!alreadyInFeed) {
        const liveEntry: Sermon = {
          id: liveVideoId,
          videoId: liveVideoId,
          title: '🔴 Live Service — Kingdom Restoration Church',
          published: new Date().toISOString(),
          viewCount: 0,
          thumbnail: `https://img.youtube.com/vi/${liveVideoId}/hqdefault.jpg`,
          speaker: 'Kingdom Restoration Church',
          date: 'Live Now',
        };
        videos = [liveEntry, ...videos.slice(0, 7)]; // Keep total 8
      } else {
        // Promote live to featured
        const liveItem = videos.find((v) => v.videoId === liveVideoId)!;
        videos = [
          liveItem,
          ...videos.filter((v) => v.videoId !== liveVideoId).slice(0, 7),
        ];
      }
    }

    return <SermonCarousel videos={videos} isLive={isLive} />;
  } catch (error) {
    console.error('YouTubeFeed error:', error);
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Unable to load sermons</h2>
        <p className="text-gray-600 mb-4">
          Our feed is having a temporary hiccup. Our latest services (including March 19/20th) are available now on YouTube.
        </p>
        <a
          href="https://www.youtube.com/@restorationembassy/videos"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
        >
          Watch Latest Sermons on YouTube
        </a>
      </div>
    );
  }
}