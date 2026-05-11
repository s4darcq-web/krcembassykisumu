const fs = require('fs');
const path = require('path');

// Load .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
}

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = 'UCJB9nBcmRQJ3CeuORXQDAVg';
const MAX_RESULTS = 50;

async function fetchChannelVideos() {
  if (!API_KEY) {
    console.error('YOUTUBE_API_KEY not found');
    return [];
  }

  try {
    // 1. Get latest video IDs
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&type=video&maxResults=${MAX_RESULTS}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    if (!searchData.items) return [];

    const videoIds = searchData.items.map((item) => item.id.videoId).join(',');

    // 2. Get statistics and live details
    const videoUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,statistics,liveStreamingDetails`;
    const videoRes = await fetch(videoUrl);
    const videoData = await videoRes.json();

    const videos = videoData.items.map((item) => {
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
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
        date: formattedDate,
        viewCount: item.statistics?.viewCount || '0',
        publishedAt: item.snippet.publishedAt,
        isLive,
      };
    });

    return videos;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}

async function main() {
  console.log('Fetching YouTube videos...');
  const videos = await fetchChannelVideos();

  if (videos.length === 0) {
    console.log('No videos fetched');
    return;
  }

  const dataDir = path.join(__dirname, '..', 'data');
  const filePath = path.join(dataDir, 'sermons.json');

  fs.writeFileSync(filePath, JSON.stringify(videos, null, 2));
  console.log(`Saved ${videos.length} videos to ${filePath}`);
}

main().catch(console.error);