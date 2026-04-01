import { NextResponse } from 'next/server';

// Your YouTube channel ID
const CHANNEL_ID = 'UCJB9nBcmRQJ3CeuORXQDAVg';

export async function GET() {
  try {
    // Fetch the channel's live URL – follow redirects
    const response = await fetch(
      `https://www.youtube.com/@restorationembassy/live`,
      {
        method: 'HEAD',        // only headers, no body
        redirect: 'follow',    // follow redirects
      }
    );

console.log('Final URL:', response.url);

    // If the final URL is a watch URL, the channel is live
    if (response.url && response.url.includes('/watch?v=')) {
      // Extract video ID from the final URL
      const url = new URL(response.url);
      const videoId = url.searchParams.get('v');
      console.log('Live video ID:', videoId);
      
      return NextResponse.json({
        isLive: true,
        liveVideoId: videoId,
      });
    }

    // No live stream
    return NextResponse.json({
      isLive: false,
      liveVideoId: null,
    });
  } catch (error) {
    console.error('Live check failed:', error);
    return NextResponse.json(
      { isLive: false, liveVideoId: null, error: 'Check failed' },
      { status: 500 }
    );
  }
}