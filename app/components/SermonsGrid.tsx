'use client';

import { useState, useEffect } from 'react';
import { Eye, Calendar } from 'lucide-react';
import type { Sermon } from './YouTubeFeed';

interface SermonsGridProps {
  videos: Sermon[];
  onVideoClick: (video: Sermon) => void;
  itemsPerPage?: number;
}

export default function SermonsGrid({ videos, onVideoClick, itemsPerPage = 6 }: SermonsGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(videos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVideos = videos.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const grid = document.getElementById('sermon-grid-scroll');
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentPage]);

  if (videos.length === 0) {
    return <p className="text-center text-gray-500 py-8">No sermons available.</p>;
  }

  return (
    <div id="sermon-grid-scroll">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentVideos.map((video) => (
          <div
            key={video.id}
            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            onClick={() => onVideoClick(video)}
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
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
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <nav className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-red-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              if (totalPages > 7 && page > 3 && page < totalPages - 2 && Math.abs(page - currentPage) > 2) {
                if (page === 4 || page === totalPages - 3) return <span key={page} className="px-2">...</span>;
                return null;
              }
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-full ${currentPage === page ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-red-600 hover:text-white disabled:opacity-50"
            >
              →
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}