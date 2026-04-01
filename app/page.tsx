"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayCircle,
  Heart,
  Users,
  Book,
  Calendar,
  ArrowRight,
  Sparkles,
  Hand,
  Radio,
} from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import Image from "next/image";

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liveStatus, setLiveStatus] = useState<{
    isLive: boolean;
    liveVideoId: string | null;
  }>({ isLive: false, liveVideoId: null });

  // Hero images array – place these in your public/images/ folder
  const heroImages = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
    "/images/hero4.jpg",
    "/images/hero5.jpg",
  ];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Fetch live status every 2 minutes using the server endpoint
  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        const res = await fetch('/api/live-status');
        const data = await res.json();
        setLiveStatus({
          isLive: data.isLive || false,
          liveVideoId: data.liveVideoId || null,
        });
      } catch (error) {
        console.error('Failed to fetch live status:', error);
      }
    };

    checkLiveStatus();
    const interval = setInterval(checkLiveStatus, 120000); // 2 minutes
    return () => clearInterval(interval);
  }, []);

  const ministries = [
    {
      icon: Users,
      title: "Community Fellowship",
      description: "Building strong relationships in Christ",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Book,
      title: "Bible Study",
      description: "Deep dive into the Word of God",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Hand,
      title: "Prayer Ministry",
      description: "Intercession and spiritual warfare",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      icon: Sparkles,
      title: "Youth Ministry",
      description: "Empowering the next generation",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  // Determine button behaviour based on live status
  const liveButtonHref = liveStatus.isLive && liveStatus.liveVideoId
    ? `https://www.youtube.com/embed/${liveStatus.liveVideoId}?autoplay=1`
    : "/sermons";

  const liveButtonText = liveStatus.isLive ? "WE ARE LIVE NOW" : "Watch Live Sermons";
  const LiveIcon = liveStatus.isLive ? Radio : PlayCircle;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images with Crossfade */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={heroImages[currentImageIndex]}
                alt={`Hero background ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-red-950/50 to-blue-950/70" />
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 opacity-20"
        >
          <Image
            src="/images/churchlogo1.png"
            alt="Kingdom Restoration Church logo"
            width={96}
            height={96}
            className="w-24 h-24 object-contain"
          />
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-10 opacity-20"
        >
          <Image
            src="/images/churchlogo1.png"
            alt="Kingdom Restoration Church logo"
            width={128}
            height={128}
            className="w-32 h-32 object-contain"
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-block px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-sm font-medium mb-4 shadow-lg shadow-red-700/50"
              >
                My Year Of Deliverance – Obadiah 1:17
              </motion.div>
            </div>

            {/* Main heading with drop shadow */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
              WELCOME TO
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-blue-300 to-green-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                KINGDOM RESTORATION CHURCH
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-200 mb-4 font-light">
              Restoration Embassy Kisumu
            </p>

            <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover Community • Ignite Your Faith • Step into Your Year of Deliverance
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Live / Sermons Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {liveStatus.isLive ? (
                  <a
                    href={liveButtonHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-8 py-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all shadow-lg shadow-red-600/50 hover:shadow-xl animate-pulse flex items-center gap-3 font-medium"
                  >
                    <LiveIcon className="w-6 h-6" />
                    {liveButtonText}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <Link
                    href={liveButtonHref}
                    className="group px-8 py-4 bg-red-700 text-white rounded-full hover:bg-red-800 transition-all shadow-lg shadow-red-700/50 hover:shadow-xl hover:shadow-red-700/60 flex items-center gap-3 font-medium"
                  >
                    <LiveIcon className="w-6 h-6" />
                    {liveButtonText}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </motion.div>

              {/* Give Now Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 10px 30px rgba(96, 165, 250, 0.3)",
                    "0 10px 40px rgba(74, 222, 128, 0.4)",
                    "0 10px 30px rgba(96, 165, 250, 0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Link
                  href="/giving"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-full hover:from-blue-600 hover:to-green-500 transition-all flex items-center gap-3 font-medium"
                >
                  <Heart className="w-6 h-6" />
                  Give & Sow Seeds
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Experience{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-blue-600">
                Restoration
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At Kingdom Restoration Church, we are a family united in worship, faith, and service.
              Join us as we experience the manifest presence of God and step into our divine destiny.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ministries.map((ministry, index) => (
              <motion.div
                key={ministry.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
              >
                <div
                  className={`w-16 h-16 ${ministry.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <ministry.icon className={`w-8 h-8 ${ministry.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{ministry.title}</h3>
                <p className="text-gray-600 leading-relaxed">{ministry.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Image Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="/images/leadpastor.jpg"
                  alt="Lead Pastor Apostle Amos Ligawa"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Led by the Spirit,{" "}
                <span className="text-red-700">Empowered by Grace</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Under the leadership of Apostle Amos Ligawa, Kingdom Restoration Church has been
                a beacon of hope and transformation since 2012. We preach the uncompromised
                Gospel of the Kingdom with signs, wonders, and miracles following.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our mission is to raise a generation of kingdom ambassadors who walk in divine
                authority, restoration, and the fullness of God&apos;s glory.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-700 text-white rounded-full hover:bg-red-800 transition-all shadow-lg hover:shadow-xl group"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-gradient-to-br from-blue-950 via-red-950 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Join Us This Week</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the power of corporate worship and fellowship
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Morning Glory Service",
                day: "Sunday",
                time: "7:00 AM - 9:00 AM",
                description: "Start your week with powerful worship and the Word",
                color: "from-yellow-500 to-orange-500",
              },
              {
                title: "Lunch Hour Service",
                day: "Wednesday",
                time: "12:00 PM - 2:00 PM",
                description: "Midweek refreshing and spiritual renewal",
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "Take It By Force Prayer",
                day: "Friday",
                time: "7:00 PM - 9:00 PM",
                description: "Intense prayer and spiritual warfare",
                color: "from-red-500 to-pink-500",
              },
            ].map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all cursor-pointer group"
              >
                <div
                  className={`inline-block px-4 py-2 bg-gradient-to-r ${event.color} text-white rounded-full text-sm font-medium mb-4`}
                >
                  {event.day}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{event.title}</h3>
                <p className="text-blue-300 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {event.time}
                </p>
                <p className="text-gray-300">{event.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl group"
            >
              View All Events
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Ready to Experience{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-blue-600">
                Deliverance?
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Step into your year of restoration and breakthrough. We can&apos;t wait to worship with you!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/events"
                className="px-8 py-4 bg-red-700 text-white rounded-full hover:bg-red-800 transition-all shadow-lg hover:shadow-xl"
              >
                Plan Your Visit
              </Link>
              <a
                href="tel:+254701939216"
                className="px-8 py-4 bg-gray-100 text-gray-900 rounded-full hover:bg-gray-200 transition-all"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}