"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Calendar, Eye } from "lucide-react";

type Sermon = {
  id: string;
  videoId: string;
  title: string;
  thumbnail: string;
  date: string;
  viewCount: string;
  publishedAt: string;
  isLive?: boolean;
};

export default function SermonsPreviewClient() {
  const [videos, setVideos] = useState<Sermon[] | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch('/api/sermons?limit=3')
      .then(res => res.json())
      .then((data) => {
        if (!mounted) return;
        setVideos(data.videos || []);
      })
      .catch((err) => {
        console.error('Failed to load sermons preview', err);
        if (mounted) setVideos([]);
      });
    return () => { mounted = false; };
  }, []);

  if (videos === null) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">Loading sermons preview...</p>
        </div>
      </section>
    );
  }

  if (!videos || videos.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest Sermons</h2>
          <Link href="/sermons" className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all">
            Watch More
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Link key={video.id} href="/sermons" className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="relative aspect-video overflow-hidden">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 mb-2">{video.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-auto">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {video.date}</span>
                  <span className="flex items-center gap-1"><Eye size={14} /> {video.viewCount} views</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
