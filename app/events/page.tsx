"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";

export default function EventsPage() {
  const upcomingEvents = [
    {
      title: "Sunday Main Service",
      date: "May 3, 2026",
      time: "9:00 AM - 2:00 PM",
      location: "Ofafa Hall, Kisumu",
      image:"images/mainservice.jpg",
      type: "Weekly Service",
      color: "from-yellow-500 to-orange-500",
      recurring: true,
      recurrence: { freq: 'weekly', weekday: 0 },
    },
    {
      title: "Deliverance & Miracle Service",
      date: "March 20, 2026",
      time: "6:00 PM - 9:00 PM",
      location: "Ofafa Hall, Kisumu",
      description:
        "Expect supernatural breakthroughs, healing, and miracles as we encounter God's power.",
      image:
        "https://images.unsplash.com/photo-1648837171808-d0eb9522455e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5yaXNlJTIwbGlnaHQlMjByYXlzJTIwd2luZG93cyUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NzM1NTM5OTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      type: "Special Event",
      color: "from-red-500 to-pink-500",
    },
    {
      title: "Youth Explosion Conference",
      date: "March 28-30, 2026",
      time: "5:00 PM - 9:00 PM Daily",
      location: "Ofafa Hall, Kisumu",
      description:
        "A three-day youth revival conference with powerful worship, teaching, and fun activities.",
      image:
        "https://images.unsplash.com/photo-1726679402113-beb32b857a59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMHdvcnNoaXAlMjBjZWxlYnJhdGlvbiUyMGRpdmVyc2V8ZW58MXx8fHwxNzczNTUzOTk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      type: "Conference",
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Take It By Force Prayer",
      date: "May 6, 2026",
      time: "5:30 PM - 7:30 PM",
      location: "Ofafa Hall, Kisumu",
      description: "Intense prayer session for breakthrough, deliverance, and spiritual warfare.",
      image:
        "https://images.unsplash.com/photo-1580892660927-ddc173443462?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmF5ZXIlMjBoYW5kcyUyMHRvZ2V0aGVyJTIwc3Bpcml0dWFsfGVufDF8fHx8MTc3MzU1Mzk5NXww&ixlib=rb-4.1.0&q=80&w=1080",
      type: "Weekly Service",
      color: "from-red-500 to-orange-500",
      recurring: true,
      recurrence: { freq: 'weekly', weekday: 2 },
    },
    {
      title: "Family & Marriage Enrichment",
      date: "April 5, 2026",
      time: "2:00 PM - 5:00 PM",
      location: "Ofafa Hall, Kisumu",
      description:
        "Building strong families and marriages through biblical principles and practical wisdom.",
      image:
        "https://images.unsplash.com/photo-1634334867692-bc2ad0e164f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZmFtaWx5JTIwc21pbGluZyUyMGNodXJjaCUyMGhhcHB5fGVufDF8fHx8MTc3MzU1Mzk5NHww&ixlib=rb-4.1.0&q=80&w=1080",
      type: "Seminar",
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Lunch Hour Service",
      date: "May 5, 2026",
      time: "12:45 PM - 1:45 PM",
      location: "Ofafa Hall, Kisumu",
      description:
        "Midweek spiritual refreshing with worship, Word, and prayer for busy professionals.",
      image:
        "https://images.unsplash.com/photo-1623916242235-0a0eb79b3ffb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZW55YW4lMjBwYXN0b3IlMjBwcmVhY2hpbmclMjBwYXNzaW9uYXRlfGVufDF8fHx8MTc3MzU1Mzk5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      type: "Weekly Service",
      color: "from-blue-500 to-cyan-500",
      recurring: true,
      recurrence: { freq: 'daily' },
    },
    {
      title: "Pre-Anniversary Celebrations",
      date: "August 2026",
      time: "6:00 PM - 9:00 PM",
      location: "Ofafa Hall, Kisumu",
      description: "Pre-anniversary praise and worship leading into our main anniversary events.",
      image: "/images/pre-anniversary.jpg",
      type: "Special Event",
      color: "from-yellow-500 to-amber-500",
    },
    {
      title: "Anniversary Celebration",
      date: "November 2026",
      time: "9:00 AM - 2:00 PM",
      location: "Ofafa Hall, Kisumu",
      description: "Join us as we celebrate another year of God's faithfulness.",
      image: "/images/anniversary.jpg",
      type: "Special Event",
      color: "from-red-500 to-pink-500",
    },
    {
      title: "Family Banquet",
      date: "December 2026",
      time: "6:00 PM - 10:00 PM",
      location: "Ofafa Hall, Kisumu",
      description: "A night of fellowship, food, and family celebrations.",
      image: "/images/family-banquet.jpg",
      type: "Special Event",
      color: "from-green-500 to-teal-500",
    },
  ];

  const OFAFA_MAP_URL = "https://mapy.com/en/turisticka?source=osm&id=1171287685&x=34.7650442&y=-0.0951400&z=17";

  // --- Filter helpers: parse dates and split upcoming vs past ---
  function parseEventStartDate(dateStr: string): number | null {
    if (!dateStr) return null;
    const yearMatch = dateStr.match(/(20\d{2})/);
    const year = yearMatch ? yearMatch[1] : new Date().getFullYear().toString();
    const monthDayMatch = dateStr.match(/([A-Za-z]+\s\d{1,2})/);
    if (monthDayMatch) {
      const candidate = `${monthDayMatch[1]}, ${year}`;
      const parsed = Date.parse(candidate);
      if (!isNaN(parsed)) return parsed;
    }
    const monthYearMatch = dateStr.match(/([A-Za-z]+)\s+(20\d{2})/);
    if (monthYearMatch) {
      const candidate = `1 ${monthYearMatch[1]} ${monthYearMatch[2]}`;
      const parsed = Date.parse(candidate);
      if (!isNaN(parsed)) return parsed;
    }
    const parsed = Date.parse(dateStr);
    return isNaN(parsed) ? null : parsed;
  }

  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');

  // Helper: parse start time from a range like "9:00 AM - 2:00 PM"
  function parseStartTime(timeRange: string) {
    if (!timeRange) return null;
    const m = timeRange.match(/(\d{1,2}:\d{2}\s*(AM|PM))/i);
    return m ? m[1] : null;
  }

  function parseTimeToParts(t: string) {
    const m = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!m) return null;
    let hh = parseInt(m[1], 10);
    const mm = parseInt(m[2], 10);
    const ampm = (m[3] || '').toUpperCase();
    if (ampm === 'PM' && hh !== 12) hh += 12;
    if (ampm === 'AM' && hh === 12) hh = 0;
    return { hh, mm };
  }

  function combineDateAndTime(date: Date, timeStr?: string) {
    const parts = timeStr ? parseTimeToParts(timeStr) : null;
    const d = new Date(date);
    if (parts) {
      d.setHours(parts.hh, parts.mm, 0, 0);
    } else {
      d.setHours(0, 0, 0, 0);
    }
    return d;
  }

  function getNextOccurrence(ev: any): Date | null {
    if (!ev.recurrence) return null;
    const now = new Date();
    const startTimeStr = parseStartTime(ev.time) || undefined;

    if (ev.recurrence.freq === 'daily') {
      // today at time if later, else tomorrow
      const todayWithTime = combineDateAndTime(now, startTimeStr);
      if (todayWithTime.getTime() > now.getTime()) return todayWithTime;
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return combineDateAndTime(tomorrow, startTimeStr);
    }

    if (ev.recurrence.freq === 'weekly') {
      const targetDow = ev.recurrence.weekday; // 0=Sunday
      const todayDow = now.getDay();
      let daysAhead = (targetDow - todayDow + 7) % 7;
      const candidate = new Date(now);
      candidate.setDate(candidate.getDate() + daysAhead);
      const candidateWithTime = combineDateAndTime(candidate, startTimeStr);
      if (candidateWithTime.getTime() > now.getTime()) return candidateWithTime;
      // otherwise next week
      candidate.setDate(candidate.getDate() + 7);
      return combineDateAndTime(candidate, startTimeStr);
    }

    return null;
  }

  const withTimestamps = upcomingEvents.map((ev) => {
    const next = getNextOccurrence(ev);
    if (next) {
      const display = next.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      return { ...ev, _time: next.getTime(), _displayDate: display, _isRecurring: true };
    }
    return { ...ev, _time: parseEventStartDate(ev.date) || 0, _displayDate: ev.date, _isRecurring: false };
  });
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingList = withTimestamps.filter((e) => e._time >= today.getTime()).sort((a, b) => a._time - b._time);
  // Past list should exclude recurring events (they always roll forward)
  const pastList = withTimestamps.filter((e) => !e._isRecurring && e._time < today.getTime()).sort((a, b) => b._time - a._time);
  const eventsToShow = filter === 'upcoming' ? upcomingList : pastList;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-32 bg-linear-to-br from-red-950 via-blue-950 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-6 py-2 bg-red-600 rounded-full text-sm font-medium mb-6">
              Events
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Experience{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-200 to-gray-200">
                God Together
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join us for life-changing gatherings, powerful worship, and Kingdom encounters
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Times Highlight */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-stretch">
            {[
              {
                title: "Sunday Main Service",
                subtitle: "Sunday",
                time: "9:00 AM - 2:00 PM",
                color: "from-yellow-500 to-orange-500",
              },
              {
                title: "Lunch Hour Service",
                subtitle: "Daily",
                time: "12:45 PM - 1:45 PM",
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "Take It By Force Prayer",
                subtitle: "Tuesday",
                time: "5:30 PM - 7:30 PM",
                color: "from-red-500 to-pink-500",
              },
              {
                title: "Restoration Communion Power Table",
                subtitle: "Thursday",
                time: "5:30 PM - 7:30 PM",
                color: "from-purple-500 to-indigo-500",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center h-full flex flex-col justify-between"
              >
                <div
                  className={`block px-6 py-3 bg-linear-to-r ${service.color} text-white rounded-2xl shadow-lg mb-4 w-full`}
                >
                  <div className="font-semibold text-lg">{service.title}</div>
                  <div className="text-sm opacity-90">{service.subtitle}</div>
                </div>
                <p className="text-gray-600 flex items-center justify-center gap-2 mt-auto">
                  <Clock className="w-5 h-5" />
                  {service.time}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-linear-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="text-center md:text-left">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
              <p className="text-xl text-gray-600 max-w-3xl">Mark your calendar and join us for these powerful gatherings</p>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-end">
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-4 py-2 rounded-full transition-all ${filter === 'upcoming' ? 'bg-white text-gray-900' : 'bg-white/10 text-gray-700'}`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter('past')}
                className={`px-4 py-2 rounded-full transition-all ${filter === 'past' ? 'bg-white text-gray-900' : 'bg-white/10 text-gray-700'}`}
              >
                Past
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {eventsToShow.length === 0 && (
              <div className="col-span-1 lg:col-span-2 text-center text-gray-500 py-12">No events to show.</div>
            )}

            {eventsToShow.length > 0 && eventsToShow.map((event, index) => (
              <motion.div
                key={`${event.title}-${event._time}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-96 overflow-hidden bg-gray-900">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <div
                      className={`px-4 py-2 bg-linear-to-r ${event.color} text-white rounded-full text-sm font-medium shadow-lg`}
                    >
                      {event.type}
                    </div>
                  </div>

                  {/* Recurring Badge */}
                  {event.recurring && (
                    <div className="absolute top-4 right-4">
                      <div className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30">
                        Weekly
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-red-700 transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                        <Calendar className="w-5 h-5 text-red-600 shrink-0" />
                        <span>{event._displayDate ?? event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock className="w-5 h-5 text-blue-600 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="w-5 h-5 text-green-600 shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <button className="inline-flex items-center gap-2 text-red-700 font-medium hover:gap-3 transition-all group/btn">
                    Learn More
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stream Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-br from-red-950 via-blue-950 to-gray-900 rounded-3xl p-12 lg:p-16 text-white text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">Can&apos;t Make It In Person?</h2>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join us online! All our services are live-streamed on YouTube and Facebook
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Watch on YouTube
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Watch on Facebook
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-20 bg-linear-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Visit Us at <span className="text-red-700">Ofafa Hall</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We meet at Ofafa Hall in the heart of Kisumu. Our facility is easily accessible and
                offers ample parking space for visitors.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                    <p className="text-gray-600">Ofafa Hall, Kisumu, Kenya</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">First Time Visitors</h4>
                    <p className="text-gray-600">
                      Look for our welcome team at the entrance. We&apos;ll help you get settled!
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="tel:+254701939216"
                className="inline-block px-8 py-4 bg-red-700 text-white rounded-full hover:bg-red-800 transition-all shadow-lg hover:shadow-xl"
              >
                Call for Directions
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px] bg-gray-200"
            >
              <a href={OFAFA_MAP_URL} target="_blank" rel="noopener noreferrer" className="absolute inset-0 block">
                <iframe
                  src={OFAFA_MAP_URL}
                  loading="lazy"
                  title="Ofafa Hall interactive map"
                  className="w-full h-full border-0"
                />
              </a>
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg text-sm">
                Open interactive map for directions
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
