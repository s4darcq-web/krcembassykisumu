// components/YouTubeFeed.tsx
import SermonsPageContent from './SermonsPageContent';

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = 'UCJB9nBcmRQJ3CeuORXQDAVg';
const MAX_RESULTS = 50;

export const revalidate = 3600; // ISR every hour

export type Sermon = {
  id: string;
  videoId: string;
  title: string;
  thumbnail: string;
  date: string;
  viewCount: string;
  publishedAt: string;
  isLive?: boolean;
};

async function fetchChannelVideos(): Promise<Sermon[]> {
  if (!API_KEY) return [];

  try {
    // 1. Get latest video IDs
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&type=video&maxResults=${MAX_RESULTS}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    if (!searchData.items) return [];

    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

    // 2. Get statistics and live details
    const videoUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,statistics,liveStreamingDetails`;
    const videoRes = await fetch(videoUrl);
    const videoData = await videoRes.json();

    const videos: Sermon[] = videoData.items.map((item: any) => {
      const publishedDate = new Date(item.snippet.publishedAt);
      const formattedDate = publishedDate.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      });

      // Check if currently live: liveStreamingDetails exists and actualEndTime is missing
      const isLive = !!item.liveStreamingDetails && !item.liveStreamingDetails.actualEndTime;

      return {
        id: item.id,
        videoId: item.id,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
        date: formattedDate,
        viewCount: parseInt(item.statistics?.viewCount || '0', 10).toLocaleString(),
        publishedAt: item.snippet.publishedAt,
        isLive,
      };
    });

    // Sort by newest first
    videos.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    return videos;
  } catch (error) {
    console.error('YouTubeFeed error:', error);
    return [];
  }
}

// Helper: find current live video (prioritize isLive flag)
function findLiveVideo(videos: Sermon[]): Sermon | null {
  return videos.find(v => v.isLive) || null;
}

export default async function YouTubeFeed() {
  const allVideos = await fetchChannelVideos();
  if (allVideos.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Unable to load sermons</h2>
        <p className="text-gray-600 mb-4">Please visit our YouTube channel directly.</p>
        <a href="https://www.youtube.com/@restorationembassy/videos" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full">
          Watch on YouTube
        </a>
      </div>
    );
  }

  // Separate featured (live or latest) and the rest
  let featured: Sermon | null = findLiveVideo(allVideos);
  let otherVideos: Sermon[] = [];

  if (featured) {
    otherVideos = allVideos.filter(v => v.id !== featured!.id);
  } else {
    // No live stream: pick most recent as featured (without live badge)
    [featured, ...otherVideos] = allVideos;
  }

  // Ensure featured is defined
  if (!featured && otherVideos.length) {
    featured = otherVideos.shift() || null;
  }

  return <SermonsPageContent featuredSermon={featured} otherSermons={otherVideos} />;
}