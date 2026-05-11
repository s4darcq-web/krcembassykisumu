"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calendar, Heart, Share2, Download, ChevronRight, X } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import devotionsData from "@/data/devotions-2026.json";
import jsPDF from "jspdf";

// ── Types ─────────────────────────────────────────────────────────────────────

type DailyDevotion = {
  title: string;
  scripture: string;
  scriptureText: string;
  body: string[];
  prayerPoint: string;
  actionSteps: string[];
};

type RecentDevotion = {
  date: string;       // display label  e.g. "March 20, 2026"
  dateKey: string;    // JSON key       e.g. "2026-03-20"
  title: string;
  scripture: string;
  excerpt: string;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function getTodayKey(): string {
  // Always Nairobi time
  return new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Nairobi" }); // "2026-03-21"
}

function getDevotionForKey(key: string): DailyDevotion | null {
  return (devotionsData as Record<string, DailyDevotion>)[key] ?? null;
}

function buildRecentCards(): RecentDevotion[] {
  const cards: RecentDevotion[] = [];
  const today = new Date(new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Nairobi" }));

  for (let i = 1; i <= 6; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const dev = getDevotionForKey(key);
    if (!dev) continue;

    const displayDate = d.toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric",
    });

    cards.push({
      date: displayDate,
      dateKey: key,
      title: dev.title,
      scripture: dev.scripture,
      excerpt: dev.body[0].slice(0, 100) + "…",
    });
  }
  return cards;
}

// ── Reusable devotion content block ──────────────────────────────────────────

function DevotionContent({ d }: { d: DailyDevotion }) {
  return (
    <>
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 border-l-4 border-blue-600">
        <p className="text-xl text-gray-800 leading-relaxed italic">{d.scriptureText}</p>
      </div>

      <div className="space-y-5 mb-8">
        {d.body.map((para, i) => (
          <p key={i} className="text-lg text-gray-700 leading-relaxed">{para}</p>
        ))}
      </div>

      <div className="bg-red-50 rounded-2xl p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-600" /> Today's Prayer Point
        </h3>
        {/* whitespace-pre-line preserves the two-paragraph line break in the prayer */}
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{d.prayerPoint}</p>
      </div>

      <div className="bg-green-50 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-green-600" /> Action Steps
        </h3>
        <ul className="space-y-3 text-gray-700">
          {d.actionSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function DevotionModal({ card, onClose }: { card: RecentDevotion; onClose: () => void }) {
  const devotion = getDevotionForKey(card.dateKey);

  // Lock body scroll while open
  if (typeof document !== "undefined") {
    document.body.style.overflow = "hidden";
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => { document.body.style.overflow = ""; onClose(); }}
        />
        <motion.div
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <button
            onClick={() => { document.body.style.overflow = ""; onClose(); }}
            className="absolute top-4 right-4 z-20 w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>

          <div className="bg-gradient-to-br from-red-950 via-blue-950 to-gray-900 rounded-t-3xl px-8 pt-10 pb-8 text-white">
            <div className="flex items-center gap-2 text-sm text-white/70 mb-3">
              <Calendar size={14} /> {card.date}
            </div>
            <h2 className="text-3xl font-bold mb-3">{card.title}</h2>
            <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium">
              {card.scripture}
            </span>
          </div>

          <div className="px-8 py-8">
            {devotion
              ? <DevotionContent d={devotion} />
              : <p className="text-gray-500 text-center py-12">Devotion not found for this date.</p>
            }
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Utility Functions ──────────────────────────────────────────────────────────

function handleShare(devotion: DailyDevotion) {
  const shareData = {
    title: devotion.title,
    text: `Check out today's devotion: ${devotion.title} - ${devotion.scripture}`,
    url: window.location.href,
  };

  if (navigator.share) {
    navigator.share(shareData).catch(console.error);
  } else {
    // Fallback for desktop: copy to clipboard
    navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`)
      .then(() => alert('Link copied to clipboard!'))
      .catch(() => alert('Failed to copy link'));
  }
}

function handleDownloadPDF(devotion: DailyDevotion) {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text(devotion.title, 20, 30);
  
  doc.setFontSize(14);
  doc.text(devotion.scripture, 20, 50);
  
  doc.setFontSize(12);
  let y = 70;
  devotion.body.forEach((para) => {
    const lines = doc.splitTextToSize(para, 170);
    doc.text(lines, 20, y);
    y += lines.length * 7;
  });
  
  doc.text('Prayer:', 20, y + 10);
  y += 20;
  const prayerLines = doc.splitTextToSize(devotion.prayerPoint, 170);
  doc.text(prayerLines, 20, y);
  
  doc.save(`${devotion.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
}

function handleSaveToFavorites(devotion: DailyDevotion) {
  const favorites = JSON.parse(localStorage.getItem('devotionFavorites') || '[]');
  const exists = favorites.some((fav: DailyDevotion) => fav.title === devotion.title);
  
  if (!exists) {
    favorites.push(devotion);
    localStorage.setItem('devotionFavorites', JSON.stringify(favorites));
    alert('Added to favorites!');
  } else {
    alert('Already in favorites!');
  }
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function DevotionsPage() {
  const todayKey = getTodayKey();
  const todayDevotion = getDevotionForKey(todayKey);
  const recentCards = buildRecentCards();

  const todaysDate = new Date(todayKey + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  const [selectedCard, setSelectedCard] = useState<RecentDevotion | null>(null);

  return (
    <div className="min-h-screen pt-20">

      {/* Hero */}
      <section className="relative py-32 bg-linear-to-br from-red-950 via-blue-950 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-block px-6 py-2 bg-red-600 rounded-full text-sm font-medium mb-6">Daily Devotions</div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Feed Your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-200 to-gray-200">Spirit Daily</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Start each day with powerful insights from God's Word
            </p>
          </motion.div>
        </div>
      </section>

      {/* Year Theme — PERMANENT */}
      <section className="py-12 bg-gradient-to-r from-red-700 to-red-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold tracking-widest uppercase text-red-300 mb-2">2026 Theme</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">My Year of Deliverance</h2>
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
            <p className="text-lg italic text-white/90 mb-2">
              "But on Mount Zion will be deliverance; it will be holy, and Jacob will possess his inheritance."
            </p>
            <p className="text-sm font-semibold text-red-300">— Obadiah 1:17 NIV</p>
          </div>
          <p className="mt-6 text-white/80 max-w-3xl mx-auto leading-relaxed">
            Beloved child of God, 2026 is not just another year, it is <strong>YOUR YEAR OF DELIVERANCE!</strong> The
            Lord is raising you up from every limitation, breaking every chain, and positioning you for supernatural
            breakthrough. Whatever the enemy has stolen, health, finances, relationships, peace, joy,
            God is restoring it <strong>NOW!</strong> This is your year of deliverance!
          </p>
        </div>
      </section>

      {/* Today's Devotion */}
      <section className="py-20 bg-linear-to-br from-gray-50 to-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="relative h-80 bg-gray-900">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1648837171808-d0eb9522455e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5yaXNlJTIwbGlnaHQlMjByYXlzJTIwd2luZG93cyUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NzM1NTM5OTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Today's devotion" className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />
              <div className="absolute top-8 left-8">
                <div className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-2xl border border-white/30">
                  <div className="flex items-center gap-2 text-sm font-medium"><Calendar className="w-5 h-5" />{todaysDate}</div>
                </div>
              </div>
              <div className="absolute top-8 right-8">
                <div className="px-6 py-3 bg-linear-to-r from-red-600 to-red-700 text-white rounded-2xl shadow-lg">
                  <div className="text-sm font-semibold">Today's Devotion</div>
                </div>
              </div>
            </div>

            <div className="p-12">
              {todayDevotion ? (
                <>
                  <div className="mb-8">
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{todayDevotion.title}</h2>
                    <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {todayDevotion.scripture}
                    </div>
                  </div>
                  <DevotionContent d={todayDevotion} />
                </>
              ) : (
                <p className="text-gray-500 text-center py-12">Today's devotion is being prepared. Please check back shortly.</p>
              )}

              <div className="flex flex-wrap items-center gap-4 mt-12 pt-8 border-t border-gray-200">
                <button 
                  onClick={() => todayDevotion && handleSaveToFavorites(todayDevotion)}
                  className="flex items-center gap-2 px-6 py-3 bg-red-700 text-white rounded-full hover:bg-red-800 transition-all shadow-lg hover:shadow-xl"
                >
                  <Heart className="w-5 h-5" /> Save to Favorites
                </button>
                <button 
                  onClick={() => todayDevotion && handleShare(todayDevotion)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-all"
                >
                  <Share2 className="w-5 h-5" /> Share
                </button>
                <button 
                  onClick={() => todayDevotion && handleDownloadPDF(todayDevotion)}
                  className="flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-all"
                >
                  <Download className="w-5 h-5" /> Download PDF
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recent Devotions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Recent Devotions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Catch up on previous daily devotions and strengthen your faith
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentCards.map((item, index) => (
              <motion.div
                key={item.dateKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedCard(item)}
                className="bg-linear-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Calendar className="w-4 h-4" /> {item.date}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-red-700 transition-colors">
                  {item.title}
                </h3>
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium mb-4">
                  {item.scripture}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">{item.excerpt}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedCard(item); }}
                  className="inline-flex items-center gap-2 text-red-700 font-medium group-hover:gap-3 transition-all"
                >
                  Read More <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-center mt-12"
          >
            <button className="px-8 py-4 bg-red-700 text-white rounded-full hover:bg-red-800 transition-all shadow-lg hover:shadow-xl">
              View All Devotions
            </button>
          </motion.div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-20 bg-linear-to-br from-red-950 via-blue-950 to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <BookOpen className="w-20 h-20 text-blue-400 mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Never Miss a Devotion</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Subscribe to receive daily devotions directly to your phone via SMS or WhatsApp
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="tel" placeholder="Enter your phone number"
                  className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-8 py-4 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-full hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-4">Free of charge. You can unsubscribe at any time.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      {selectedCard && (
        <DevotionModal card={selectedCard} onClose={() => { document.body.style.overflow = ""; setSelectedCard(null); }} />
      )}
    </div>
  );
}