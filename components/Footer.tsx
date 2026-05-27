import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-linear-to-br from-red-950 via-gray-900 to-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/churchlogo1.png"
                  alt="churchlogo.jpg"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-semibold text-lg">KRC</div>
                <div className="text-xs text-blue-300">Restoration Embassy</div>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Preaching the Gospel of the Kingdom. Join us as we experience restoration,
              deliverance, and the manifest glory of God.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/sermons" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Sermons
                </Link>
              </li>
              <li>
                <Link href="/ministries" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Ministries
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/devotions" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Daily Devotions
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Service Times</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <span className="text-blue-400 font-medium">Sunday Main Service:</span>
                <br />
                Sun 9:00 AM - 2:00 PM
              </li>
              <li>
                <span className="text-blue-400 font-medium">Lunch Hour:</span>
                <br />
                Daily 12:45 PM - 1:45 PM
              </li>
              <li>
                <span className="text-blue-400 font-medium">Communion Service:</span>
                <br />
                Thu 5:30 PM - 7:30 PM
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">
                  Ofafa Hall, Kisumu<br />
                  Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-400 shrink-0" />
                <a
                  href="tel:+254701939216"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  +254 701 939 216
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-400 shrink-0" />
                <a
                  href="mailto:info@krc-kisumu.org"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  info@krc-kisumu.org
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-all hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-all hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-all hover:scale-110"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-gray-400">
            © 2026 Kingdom Restoration Church – Preaching the Gospel of the Kingdom
          </p>
        </div>
      </div>
    </footer>
  );
}
