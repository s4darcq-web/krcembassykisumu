"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Target, Eye, Users, BookOpen, Flame, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import Image from "next/image";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Love & Unity",
      description: "We are a family bound together by the love of Christ, celebrating diversity in unity.",
    },
    {
      icon: BookOpen,
      title: "Word-Centered",
      description: "The uncompromised Word of God is our foundation and final authority in all matters.",
    },
    {
      icon: Flame,
      title: "Spirit-Led",
      description: "We yield to the Holy Spirit, expecting signs, wonders, and miraculous manifestations.",
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Touching lives through outreach, compassion, and practical demonstration of God's love.",
    },
  ];

  const pastors = [
    { name: "Bernadette Nafula", role: "Lead Pastor - Busia", image: "/images/pstbernadette.jpg" },
    { name: "Kevin Ager", role: "Lead Pastor - Nakuru", image: "/images/pstkevin.jpg" },
    { name: "Bernard Omondi", role: "Pastor Kisumu", image: "/images/pstbenard.jpg" },
    { name: "Dickson Musau", role: "Pastor Kisumu", image: "/images/pst-dickson.jpg" },
    { name: "Dominic Mukalo", role: "Pastor Kisumu", image: "/images/pst-dominic.jpg" },
    { name: "Joseph Olawo", role: "Pastor Kisumu", image: "/images/joseph-olao.png" },
    { name: "David Arao", role: "Pastor Kisumu", image: "/images/david-arao.jpg" },
    { name: "Bethlyne Ligawa", role: "Prophetess", image: "/images/min-bethlyne.jpg" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero – unchanged */}
      <section className="relative py-32 bg-gradient-to-br from-red-950 via-blue-950 to-gray-900 text-white overflow-hidden">
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
              About Us
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Our Story of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-200">
                Restoration
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Since 2012, we've been a community of believers experiencing the transformative power of God's love
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision – unchanged */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-12 shadow-xl"
            >
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                To preach the uncompromised Gospel of the Kingdom of God with signs, wonders, and miracles following,
                raising a generation of believers who walk in divine authority, restoration, and the fullness of God's glory.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We are committed to equipping the saints for the work of ministry, demonstrating God's love through
                practical service, and advancing the Kingdom in Kisumu and beyond.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-12 shadow-xl"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                To see every believer walking in their God-given identity as ambassadors of the Kingdom,
                experiencing total restoration in spirit, soul, and body, and manifesting the glory of God wherever they go.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We envision a global movement of restoration where nations are discipled, families are healed,
                and the Kingdom of God is established in every sphere of society.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History Section – replaces the old timeline */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Let us fellowship together</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">You’re Welcome</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-gray-900">Our History</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Kingdom Restoration Church, founded in 2012, is a dynamic spiritual community committed to
                fostering deeper connections with the divine and with one another. Our church provides a
                welcoming and inclusive environment where individuals from all walks of life can explore their
                faith, ask questions and find meaning and purpose in their lives.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Rooted in love and guided by faith, KRC offers a variety of worship services, spiritual formation
                opportunities and community outreach programs to meet the diverse needs of our congregation and
                the wider community.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <p className="text-gray-700 italic leading-relaxed">
                "At KRC, we believe church is more than just a place, it’s a family. Whether you're new to the
                area, seeking a deeper relationship with God or simply curious about the Christian faith, we invite
                you to join us in worship and fellowship. Our doors are open to everyone, and we’re excited to walk
                with you in love, faith, and purpose."
              </p>
              <p className="text-gray-700 italic leading-relaxed mt-4">
                "Come As You Are. No matter your background or where you are on your spiritual journey, there's a
                place for you at KRC. Our services are filled with uplifting worship, practical Bible teaching, and a
                genuine sense of community. We’d love to meet you, pray with you, and grow together in Christ. Join us
                this Sunday, we can’t wait to welcome you!"
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership – Apostle Amos (unchanged) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Our Leadership</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Spirit-filled leaders called to serve and shepherd God's people
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-red-50 to-blue-50 rounded-3xl p-12 shadow-2xl"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  <div className="w-52 h-52 rounded-3xl overflow-hidden shadow-2xl">
                    <ImageWithFallback
                      src="/images/ApostleAmos.jpg"
                      alt="Apostle Amos Ligawa"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-8 -right-4 w-24 h-24 bg-gradient-to-br from-red-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl overflow-hidden">
                    <Image
                      src="/images/churchlogo1.png"
                      alt="Kingdom Restoration Church Logo"
                      width={48}
                      height={48}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Apostle Amos Ligawa</h3>
                  <p className="text-xl text-red-600 mb-6 font-medium">General Overseer & Founder</p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Called by God to raise a generation of Kingdom ambassadors, Apostle Amos Ligawa is a seasoned
                    preacher, teacher, and prophet of God with a passion for souls and the manifest glory and spirit of God.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    His ministry is marked by powerful demonstrations of the Spirit, supernatural breakthroughs,
                    and a deep commitment to discipleship and kingdom advancement.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pastors Grid – new */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Our Pastors</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">     
              Our dedicated team of pastors, committed to shepherding and empowering our congregation                                     
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastors.map((pastor, index) => (
              <motion.div
                key={pastor.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="aspect-square overflow-hidden bg-gray-200">
                  <ImageWithFallback
                    src={pastor.image}
                    alt={pastor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{pastor.name}</h3>
                  <p className="text-sm text-red-600 mb-2">{pastor.role}</p>
                  <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    KRC
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values – unchanged */}
      <section className="py-20 bg-gradient-to-br from-red-950 via-blue-950 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide our ministry and community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}