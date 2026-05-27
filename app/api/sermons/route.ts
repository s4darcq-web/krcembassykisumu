import { NextResponse } from 'next/server';

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = 'UCJB9nBcmRQJ3CeuORXQDAVg';
const MAX_RESULTS = 50;

async function fetchChannelVideos() {
  if (!API_KEY) return [];
  try {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&type=video&maxResults=${MAX_RESULTS}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    if (!searchData.items) return [];
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
    const videoUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,statistics,liveStreamingDetails`;
    const videoRes = await fetch(videoUrl);
    const videoData = await videoRes.json();

    const videos = videoData.items.map((item: any) => {
      const publishedDate = new Date(item.snippet.publishedAt);
      const formattedDate = publishedDate.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      });
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

    videos.sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    return videos;
  } catch (err) {
    console.error('API /sermons error', err);
    return [];
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limitParam = url.searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : 3;

  const all = await fetchChannelVideos();
  if (!all || all.length === 0) return NextResponse.json({ videos: [] });

  const featured = all.find((v: any) => v.isLive) || all[0];
  const others = all.filter((v: any) => v.id !== featured.id);
  const slice = others.slice(0, limit);

  return NextResponse.json({ videos: slice });
}
