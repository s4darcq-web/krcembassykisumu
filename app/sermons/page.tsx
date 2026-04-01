import { Suspense } from 'react';
import YouTubeFeed from "../components/YouTubeFeed";
import HeroSection from "../components/HeroSection";

export default function SermonsPage() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero */}
      <HeroSection />

      {/* Sermons Carousel */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Suspense fallback={<div className="text-center py-12">Loading sermons...</div>}>
            <YouTubeFeed />
          </Suspense>
        </div>
      </section>
    </div>
  );
}