import { motion } from 'framer-motion';
import { Building2, Phone, Mail } from 'lucide-react';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-gradient-to-br from-orange-600 to-orange-500 p-2 rounded-xl shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Gryphon <span className="text-orange-600">FrameWorks</span>
              </h1>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Metal Building Solutions
              </p>
            </div>
          </motion.div>

          {/* Contact Info */}
          <div className="hidden md:flex items-center gap-6">
            <motion.a
              href="tel:+1234567890"
              className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">(123) 456-7890</span>
            </motion.a>
            <motion.a
              href="mailto:info@gryphonframeworks.com"
              className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">info@gryphonframeworks.com</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
