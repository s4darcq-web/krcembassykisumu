'use client';

import { Eye, Calendar, User, Radio } from 'lucide-react';

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

type SermonCarouselProps = {
  videos: Sermon[];
  isLive?: boolean;
};

export default function SermonCarousel({ videos, isLive = false }: SermonCarouselProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">No sermons available at the moment.</p>
        <p className="text-sm text-gray-600 mb-4">Check out our latest sermons on YouTube:</p>
        <a
          href="https://youtube.com/@restorationembassy"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
        >
          Visit YouTube Channel
        </a>
      </div>
    );
  }

  const [featured, ...all] = videos;
  const rest = all.slice(0, 6);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 font-sans">

      {/* ── FEATURED CARD ─────────────────────────────────────── */}
      <div className={`relative rounded-2xl mb-6 ${isLive ? 'live-ring' : ''}`}>

        {/* Pulsing glow layer — only when live */}
        {isLive && <div className="absolute inset-0 rounded-2xl pointer-events-none live-glow" />}

        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
          {/* 16:9 iframe — eager load, no lazy */}
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
              src={`https://www.youtube.com/embed/${featured.videoId}?rel=0&modestbranding=1&showinfo=0${isLive ? '&autoplay=1' : ''}`}
              title={featured.title}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              allow="autoplay; encrypted-media; picture-in-picture"
            />
          </div>

          {/* Bottom overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-5 py-4 pointer-events-none">
            <div className="flex items-center gap-2 mb-1">
              {isLive ? (
                <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full">
                  <Radio size={10} className="animate-pulse" />
                  Live Now
                </span>
              ) : (
                <span className="text-xs font-bold tracking-widest uppercase text-red-400">
                  Latest Sermon
                </span>
              )}
            </div>
            <h2 className="text-white font-bold text-xl leading-snug line-clamp-2 mb-1">
              {featured.title}
            </h2>
            <div className="flex items-center gap-4 text-white/70 text-xs">
              <span className="flex items-center gap-1"><User size={11} /> {featured.speaker}</span>
              <span className="flex items-center gap-1"><Calendar size={11} /> {featured.date}</span>
              <span className="flex items-center gap-1"><Eye size={11} /> {featured.viewCount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SMALLER CARDS GRID ────────────────────────────────── */}
      {rest.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {rest.map((sermon) => (
            <a
              key={sermon.id}
              href={`https://www.youtube.com/watch?v=${sermon.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl overflow-hidden shadow-md bg-black hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                {/* Use hqdefault as primary — always exists, no 404s */}
                <img
                  src={`https://img.youtube.com/vi/${sermon.videoId}/hqdefault.jpg`}
                  alt={sermon.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-3 py-3">
                <h3 className="text-white text-xs font-semibold leading-tight line-clamp-2 mb-1">
                  {sermon.title}
                </h3>
                <p className="text-red-400 text-[10px] font-medium truncate mb-0.5">
                  {sermon.speaker}
                </p>
                <div className="flex items-center justify-between text-white/60 text-[10px]">
                  <span>{sermon.date}</span>
                  <span className="flex items-center gap-0.5">
                    <Eye size={9} />
                    {sermon.viewCount.toLocaleString()}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Load More Button */}
      <div className="flex justify-center mt-6">
        <a
          href="https://www.youtube.com/@restorationembassy"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-sm px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          Load More Sermons
        </a>
      </div>

      {/* Live ring + glow animations */}
      <style>{`
        .live-ring {
          border: 3px solid #dc2626;
          animation: ring-pulse 1.4s ease-in-out infinite;
        }
        .live-glow {
          animation: glow-pulse 1.4s ease-in-out infinite;
        }
        @keyframes ring-pulse {
          0%, 100% { border-color: #dc2626; box-shadow: 0 0 0 0 rgba(220,38,38,0.6); }
          50%       { border-color: #fca5a5; box-shadow: 0 0 16px 4px rgba(220,38,38,0.25); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 12px 2px rgba(220,38,38,0.5); }
          50%       { box-shadow: 0 0 28px 8px rgba(220,38,38,0.15); }
        }
      `}</style>
    </div>
  );
}