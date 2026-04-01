"use client";

import { motion } from "framer-motion";
import {
  Heart,
  CreditCard,
  Smartphone,
  Building2,
  Target,
  TrendingUp,
  Users,
  Home,
} from "lucide-react";

export default function GivingPage() {
  const campaigns = [
    {
      title: "Church Land Fundraising",
      description: "Help us acquire permanent land to build our own worship center",
      goal: 50000000,
      raised: 15000000,
      percentage: 30,
      icon: Home,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Ofafa Hall Renovation",
      description: "Improving our current facility for better worship experience",
      goal: 5000000,
      raised: 3500000,
      percentage: 70,
      icon: Building2,
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const givingMethods = [
    {
      icon: Smartphone,
      title: "M-Pesa",
      subtitle: "Mobile Money",
      steps: [
        "Go to M-Pesa menu",
        "Select Lipa Na M-Pesa",
        "Select Pay Bill",
        "Enter Business Number: 247247",
        "Enter Account: KRC GIVING",
        "Enter Amount",
        "Enter M-Pesa PIN",
      ],
      color: "from-green-600 to-emerald-600",
    },
    {
      icon: Building2,
      title: "Bank Transfer",
      subtitle: "Direct Deposit",
      steps: [
        "Bank: KCB Bank Kenya",
        "Account Name: Kingdom Restoration Church",
        "Account Number: 1234567890",
        "Branch: Kisumu",
        "Swift Code: KCBLKENX",
      ],
      color: "from-blue-600 to-indigo-600",
    },
    {
      icon: CreditCard,
      title: "Online Giving",
      subtitle: "Card Payment",
      steps: [
        'Click "Give Online" button below',
        "Enter your details",
        "Choose giving type (Tithe/Offering/Special)",
        "Enter amount",
        "Complete payment securely",
      ],
      color: "from-purple-600 to-pink-600",
    },
  ];

  const impactStats = [
    { label: "Lives Impacted", value: "5,000+", icon: Users, color: "text-blue-600" },
    { label: "Monthly Outreach", value: "500+", icon: Heart, color: "text-red-600" },
    { label: "Growth Rate", value: "45%", icon: TrendingUp, color: "text-green-600" },
    { label: "Active Ministries", value: "12", icon: Target, color: "text-purple-600" },
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
              Give & Partner
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Sow Into{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-blue-400">
                Kingdom Advancement
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Your generosity enables us to reach more souls, transform lives, and advance God's Kingdom
            </p>
            <p className="text-lg text-blue-300 italic">
              "Give, and it will be given to you. A good measure, pressed down, shaken together and running over." -
              Luke 6:38
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Campaigns */}
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
              Active Fundraising Campaigns
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us in building God's Kingdom through these special projects
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {campaigns.map((campaign, index) => (
              <motion.div
                key={campaign.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="flex items-start gap-6 mb-6">
                  <div
                    className={`w-16 h-16 bg-linear-to-br ${campaign.color} rounded-2xl flex items-center justify-center shrink-0`}
                  >
                    <campaign.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{campaign.title}</h3>
                    <p className="text-gray-600">{campaign.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Raised</span>
                    <span className="font-semibold text-gray-900">
                      KES {campaign.raised.toLocaleString()} of KES {campaign.goal.toLocaleString()}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${campaign.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className={`absolute inset-y-0 left-0 bg-linear-to-r ${campaign.color} rounded-full`}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">{campaign.percentage}% Complete</span>
                    <button className="px-6 py-3 bg-linear-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl">
                      Contribute Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Giving Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Ways to Give</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the most convenient method for you to partner with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {givingMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-linear-to-br from-gray-50 to-blue-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all"
              >
                <div
                  className={`w-16 h-16 bg-linear-to-br ${method.color} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <method.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-6">{method.subtitle}</p>

                <div className="space-y-3">
                  {method.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-3 text-gray-700">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-semibold text-gray-600 shrink-0 mt-0.5">
                        {stepIndex + 1}
                      </div>
                      <span className="text-sm leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Give CTA */}
      <section className="py-20 bg-linear-to-br from-red-950 via-blue-950 to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Heart className="w-20 h-20 text-red-400 mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Make an Impact?</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Your seed is not just a financial contribution—it's a partnership in advancing God's Kingdom and
              transforming lives.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-full hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-3 text-lg font-medium"
              >
                <Heart className="w-6 h-6" />
                Give Now
              </motion.button>
              <a
                href="tel:+254701939216"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all border border-white/20 text-lg"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tax & Legal Info */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Important Information</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong className="text-gray-900">Security:</strong> All online transactions are encrypted and secure.
                We never store your payment information.
              </p>
              <p>
                <strong className="text-gray-900">Receipts:</strong> You will receive a confirmation receipt via SMS or
                email after each transaction for your records.
              </p>
              <p>
                <strong className="text-gray-900">Questions?</strong> Contact our finance team at +254 701 939 216 or
                email finance@krc-kisumu.org for any giving-related inquiries.
              </p>
              <p className="text-sm text-gray-500 pt-4 border-t border-gray-200">
                Kingdom Restoration Church is a registered religious organization in Kenya. All contributions are used
                for ministry purposes as outlined in our mission and vision.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
