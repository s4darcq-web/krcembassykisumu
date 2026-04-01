"use client";

import { motion } from "framer-motion";
import {
  Users,
  Heart,
  BookOpen,
  Mic2,
  Baby,
  HandHeart,
  Music,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import Image from "next/image";
import { image } from "framer-motion/client";

export default function MinistriesPage() {
  const ministries = [
    {
      icon: Music,
      title: "Worship & Praise",
      description:
        "Leading the congregation into the manifest presence of God through Spirit-led worship and praise. Our worship team creates an atmosphere where heaven touches earth.",
      image: "/images/chior.png",
      alt: "choir",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      icon: Sparkles,
      title: "Youth Ministry",
      description:
        "Empowering the next generation to walk in their God-given identity and purpose. We equip young people with the Word and power to transform their world.",
      image: "/images/youth-ministry.png",
      alt: "Youth Ministry",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      icon: Baby,
      title: "Children's Ministry",
      description:
        "Nurturing young hearts to know and love Jesus. Through engaging programs and biblical teaching, we lay a strong foundation of faith in the lives of children.",
      image: "/images/children.png",
      alt: "Children's Ministry",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      icon: Heart,
      title: "Prayer & Intercession",
      description:
        "Standing in the gap through powerful prayer and intercession. We wage spiritual warfare, seeking breakthroughs and manifestations of God's Kingdom on earth.",
      image: "/images/intercessory-ministry.jpg",
      alt: "Intercessory Ministry",
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
    {
      icon: BookOpen,
      title: "Bible Study & Discipleship",
      description:
        "Deep systematic study of God's Word to build strong, mature believers. We are committed to making disciples who make disciples.",
      image: "/images/biblestudy.jpg",
      alt: "Bible Study",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: Users,
      title: "Men's Fellowship",
      description:
        "Building godly men who lead their families and communities with integrity, strength, and wisdom. Iron sharpens iron as we grow together.",
      image: "/images/mens-ministry.png",
      alt: "men's ministry",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      icon: Sparkles,
      title: "Women's Fellowship",
      description:
        "Empowering women to walk in their divine calling as daughters of the King. Building strong, faith-filled women who impact their spheres of influence.",
      image: "/images/womens-ministry.jpg",
      alt: "women's ministry",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
    },
    {
      icon: HandHeart,
      title: "Community Outreach",
      description:
        "Demonstrating the love of Christ through practical service to our community. Feeding the hungry, clothing the needy, and bringing hope to the hurting.",
      image: "/images/communityoutreach.jpg",
      alt: "Community Outreach",
      color: "from-teal-500 to-green-500",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
    },
    {
      icon: Mic2,
      title: "Media & Technology",
      description:
        "Leveraging technology to spread the Gospel and enhance worship experiences. From live streaming to audio-visual production, we use every tool for Kingdom advancement.",
      image: "/images/mediateam.jpg",
      alt: "media team",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50",
      textColor: "text-violet-600",
    },
  ];

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
              Ministries
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Find Your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 to-blue-400">
                Place to Serve
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover where God is calling you to make an impact in His Kingdom
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-20 bg-linear-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our Active Ministries
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every member is a minister. Find where your gifts and passion align with God's purpose.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ministries.map((ministry, index) => (
              <motion.div
                key={ministry.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative sm:w-48 h-48 sm:h-auto overflow-hidden bg-gray-900">
                    <ImageWithFallback
                      src={ministry.image}
                      alt={ministry.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-br from-black/40 to-transparent" />
                    <div
                      className={`absolute top-4 left-4 w-12 h-12 bg-linear-to-br ${ministry.color} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      <ministry.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-red-700 transition-colors">
                      {ministry.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{ministry.description}</p>
                    <button
                      className={`inline-flex items-center gap-2 ${ministry.textColor} font-medium group/btn hover:gap-3 transition-all`}
                    >
                      Join This Ministry
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-20 bg-linear-to-br from-red-950 via-blue-950 to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Get Involved?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Don't just attend church—be the church! Join a ministry and discover the joy of serving in God's Kingdom.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="tel:+254701939216"
                className="px-8 py-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
              >
                Contact Ministry Leader
              </a>
              <a
                href="mailto:info@krc-kisumu.org"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all border border-white/20"
              >
                Send an Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
