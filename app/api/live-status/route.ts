import { NextResponse } from 'next/server';

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = 'UCJB9nBcmRQJ3CeuORXQDAVg';

export async function GET() {
  if (!API_KEY) {
    console.error('YOUTUBE_API_KEY missing');
    return NextResponse.json(
      { isLive: false, liveVideoId: null, error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    // Step 1: Search for live events from the channel
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`;
    const searchRes = await fetch(searchUrl, { next: { revalidate: 120 } });
    
    if (!searchRes.ok) {
      throw new Error(`YouTube search API error: ${searchRes.status}`);
    }
    
    const searchData = await searchRes.json();
    const candidateVideo = searchData.items?.[0];
    
    // No candidate found → definitely not live
    if (!candidateVideo) {
      return NextResponse.json({ isLive: false, liveVideoId: null });
    }
    
    const videoId = candidateVideo.id.videoId;
    
    // Step 2: Verify the video is actually live (not a past live stream)
    const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${videoId}&key=${API_KEY}`;
    const videoRes = await fetch(videoUrl);
    const videoData = await videoRes.json();
    
    const liveDetails = videoData.items?.[0]?.liveStreamingDetails;
    
    // It's live only if liveStreamingDetails exists AND actualEndTime is missing
    const isActuallyLive = liveDetails && !liveDetails.actualEndTime;
    
    if (isActuallyLive) {
      return NextResponse.json({ isLive: true, liveVideoId: videoId });
    } else {
      return NextResponse.json({ isLive: false, liveVideoId: null });
    }
    
  } catch (error) {
    console.error('Live status check failed:', error);
    return NextResponse.json(
      { isLive: false, liveVideoId: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}