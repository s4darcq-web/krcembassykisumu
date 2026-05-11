'use client';

import { Eye, Calendar, User, Radio } from 'lucide-react';
import type { Sermon } from './YouTubeFeed';

interface Props {
  sermon: Sermon;
  onWatch: (sermon: Sermon) => void;
}

export default function FeaturedSermonCard({ sermon, onWatch }: Props) {
  const isLive = sermon.isLive === true;

  // Optional: extract speaker from title? Here we use a default or you can pass speaker as prop.
  // For screenshot: we can use a static speaker name or derive from title.
  const speaker = "Kingdom Restoration Church"; // Change as needed

  // A short description (customizable)
  const description = "Watch and be blessed by this life‑changing message.";

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-xl transition-all ${isLive ? 'live-ring' : ''}`}>
      {isLive && <div className="absolute inset-0 rounded-2xl pointer-events-none live-glow" />}

      <div className="relative bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left side: Thumbnail */}
        <div className="relative md:w-2/5 aspect-video cursor-pointer group" onClick={() => onWatch(sermon)}>
          <img
            src={sermon.thumbnail}
            alt={sermon.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          {isLive && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold uppercase px-2.5 py-1 rounded-full z-10">
              <Radio size={12} className="animate-pulse" />
              LIVE NOW
            </div>
          )}
        </div>

        {/* Right side: Content (matches screenshot style) */}
        <div className="p-6 md:w-3/5 flex flex-col justify-center">
          <span className="text-xs font-bold tracking-wider text-red-500 uppercase mb-2">
            {isLive ? '🔴 LIVE NOW' : 'LATEST SERMON'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 line-clamp-2">
            {sermon.title}
          </h2>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mb-3">
            <span className="flex items-center gap-1"><User size={14} /> {speaker}</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {sermon.date}</span>
            <span className="flex items-center gap-1"><Eye size={14} /> {sermon.viewCount} views</span>
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
          <button
            onClick={() => onWatch(sermon)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-full transition-colors w-fit flex items-center gap-2 text-sm"
          >
            Watch Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .live-ring {
          border: 3px solid #dc2626;
          animation: ring-pulse 1.4s ease-in-out infinite;
          border-radius: 1rem;
        }
        .live-glow {
          animation: glow-pulse 1.4s ease-in-out infinite;
          border-radius: 1rem;
        }
        @keyframes ring-pulse {
          0%, 100% { border-color: #dc2626; box-shadow: 0 0 0 0 rgba(220,38,38,0.6); }
          50% { border-color: #fca5a5; box-shadow: 0 0 16px 4px rgba(220,38,38,0.25); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 12px 2px rgba(220,38,38,0.5); }
          50% { box-shadow: 0 0 28px 8px rgba(220,38,38,0.15); }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}