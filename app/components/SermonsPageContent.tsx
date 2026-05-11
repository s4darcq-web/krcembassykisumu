'use client';

import { useState, useMemo, useEffect } from 'react';
import FeaturedSermonCard from './FeaturedSermonCard';
import SermonsGrid from './SermonsGrid';
import type { Sermon } from './YouTubeFeed';

interface Props {
  featuredSermon: Sermon | null;
  otherSermons: Sermon[];
}

export default function SermonsPageContent({ featuredSermon, otherSermons }: Props) {
  const [selectedVideo, setSelectedVideo] = useState<Sermon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Automatically open modal for live streams
  useEffect(() => {
    if (featuredSermon && featuredSermon.isLive) {
      openModal(featuredSermon);
    }
  }, [featuredSermon]);

  // Filter other sermons by title/date/speaker
  const filteredSermons = useMemo(() => {
    if (!searchTerm.trim()) return otherSermons;
    const term = searchTerm.toLowerCase();
    return otherSermons.filter(sermon => 
      sermon.title.toLowerCase().includes(term) ||
      sermon.date.toLowerCase().includes(term) ||
      'kingdom restoration church'.includes(term) // speaker filter
    );
  }, [otherSermons, searchTerm]);

  const openModal = (video: Sermon) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {/* Featured Card */}
      {featuredSermon && (
        <div className="mb-12">
          <FeaturedSermonCard sermon={featuredSermon} onWatch={openModal} />
        </div>
      )}

      {/* Search and More Sermons */}
      {otherSermons.length > 0 && (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-800">More Sermons</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, date or speaker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-64 sm:w-80 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          {filteredSermons.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No sermons match your search.</p>
          ) : (
            <SermonsGrid videos={filteredSermons} onVideoClick={openModal} />
          )}
        </>
      )}

      {/* Video Modal with close button inside (top right corner) */}
      {isModalOpen && selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-all duration-300"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl mx-4 rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button inside the modal, at top right of the video area */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-20 bg-black/60 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video iframe */}
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={selectedVideo.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video info bar */}
            <div className="bg-white p-4">
              <h3 className="font-bold text-lg text-gray-800 line-clamp-2">{selectedVideo.title}</h3>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                <span>{selectedVideo.date}</span>
                <span>{selectedVideo.viewCount} views</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        body.modal-open { overflow: hidden; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}