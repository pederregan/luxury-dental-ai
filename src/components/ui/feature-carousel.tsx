'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '@/components/icons';

const features = [
  {
    icon: Icons.PatientAcquisition,
    title: "Never miss another patient.",
    description: "When your office is closed or staff is busy, our AI receptionist answers every call, schedules appointments, and captures leads 24/7.",
    details: [
      "Natural language processing for patient intent detection",
      "Smart scheduling with conflict resolution",
      "Automated follow-up sequences",
      "New patient conversion optimization"
    ],
    metric: "42% increase in new patient bookings"
  },
  {
    icon: Icons.MultiLocation,
    title: "Scale across all locations.",
    description: "Manage multiple practices from one dashboard with location-specific rules, unified reporting, and centralized control.",
    details: [
      "Location-specific routing and rules",
      "Unified dashboard across all locations",
      "Performance benchmarking between sites",
      "Scalable infrastructure for growth"
    ],
    metric: "Managing 50+ locations seamlessly"
  },
  {
    icon: Icons.Integrations,
    title: "Works with your systems.",
    description: "Seamlessly integrates with Dentrix, Eaglesoft, Open Dental and 20+ practice management systems you already use.",
    details: [
      "Major PMS/EMR system compatibility",
      "Real-time appointment synchronization",
      "Insurance verification automation",
      "Clinical notes and history access"
    ],
    metric: "Integrated with 20+ dental systems"
  },
  {
    icon: Icons.Analytics,
    title: "Know what drives growth.",
    description: "Track every call, conversion, and dollar with real-time analytics that show exactly what's working and what's not.",
    details: [
      "Call analytics and conversion tracking",
      "Revenue attribution reporting",
      "Performance benchmarking",
      "Actionable insights dashboard"
    ],
    metric: "Real-time business intelligence"
  },
  {
    icon: Icons.Activity,
    title: "Generate more revenue.",
    description: "Convert more leads, reduce no-shows, and identify opportunities with AI that focuses on growing your practice.",
    details: [
      "Lead scoring and prioritization",
      "Automated appointment reminders",
      "Revenue optimization suggestions",
      "Predictive analytics for growth"
    ],
    metric: "$2.3M average revenue increase"
  },
  {
    icon: Icons.Shield,
    title: "Enterprise-grade support.",
    description: "Dedicated success team, 24/7 monitoring, and white-glove implementation ensure your practice succeeds.",
    details: [
      "Dedicated success manager",
      "24/7 technical monitoring",
      "Custom implementation planning",
      "Ongoing optimization support"
    ],
    metric: "99.9% uptime guarantee"
  }
];

export function FeatureCarousel() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scrollToIndex = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 420; // Approximate width of each card
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative -mx-6 md:-mx-10 lg:-mx-16 xl:-mx-24 px-6 md:px-10 lg:px-16 xl:px-24">
      {/* Apple-style Header */}
      <div className="flex justify-between items-baseline mb-12 max-w-7xl mx-auto">
        <div>
          <h2 className="text-5xl md:text-6xl font-semibold text-[#1a365d] dark:text-white leading-tight">
            Why DSM is the best
            <br />
            place to grow your practice.
          </h2>
        </div>
        <motion.a
          href="#roi-calculator"
          className="text-[#0066cc] hover:underline text-lg font-medium flex items-center gap-1"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Calculate ROI
          <Icons.ChevronRight className="h-4 w-4" />
        </motion.a>
      </div>

      {/* Apple-style Cards Container */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-8"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                className="flex-none w-[400px] snap-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div
                  className="group bg-white dark:bg-gray-800/50 rounded-2xl p-8 h-full cursor-pointer relative border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
                  onClick={() => setSelectedFeature(index)}
                >
                  {/* Minimal Icon */}
                  <div className="mb-6">
                    <Icon className="h-12 w-12 text-[#1a365d] dark:text-white stroke-[1.5]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-[#1a365d] dark:text-white mb-4 leading-tight">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#1a365d]/70 dark:text-gray-400 leading-relaxed text-base">
                    {feature.description}
                  </p>

                  {/* Footnote */}
                  <div className="mt-6 text-sm text-[#1a365d]/50 dark:text-gray-500">
                    {feature.metric}
                  </div>

                  {/* Plus Button */}
                  <motion.button
                    className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFeature(index);
                    }}
                  >
                    <Icons.Plus className="h-5 w-5 text-[#1a365d] dark:text-white" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Apple-style Navigation */}
        <div className="flex justify-center items-center gap-8 mt-8">
          <motion.button
            onClick={() => scrollToIndex('left')}
            className={`p-2 rounded-full transition-all ${
              canScrollLeft
                ? 'text-[#1a365d] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
            }`}
            whileHover={canScrollLeft ? { scale: 1.1 } : {}}
            whileTap={canScrollLeft ? { scale: 0.95 } : {}}
            disabled={!canScrollLeft}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>

          <motion.button
            onClick={() => scrollToIndex('right')}
            className={`p-2 rounded-full transition-all ${
              canScrollRight
                ? 'text-[#1a365d] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
            }`}
            whileHover={canScrollRight ? { scale: 1.1 } : {}}
            whileTap={canScrollRight ? { scale: 0.95 } : {}}
            disabled={!canScrollRight}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Clean Modal */}
      <AnimatePresence>
        {selectedFeature !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-8 pb-0">
                <div className="flex items-start justify-between mb-6">
                  {(() => {
                    const IconComponent = features[selectedFeature].icon;
                    return IconComponent ? <IconComponent className="h-14 w-14 text-[#1a365d] dark:text-white stroke-[1.5]" /> : null;
                  })()}
                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="p-2 -m-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <Icons.X className="h-6 w-6 text-[#1a365d] dark:text-white" />
                  </button>
                </div>

                <h3 className="text-4xl font-semibold text-[#1a365d] dark:text-white mb-4">
                  {features[selectedFeature].title}
                </h3>
                <p className="text-xl text-[#1a365d]/70 dark:text-gray-400 leading-relaxed">
                  {features[selectedFeature].description}
                </p>
              </div>

              {/* Modal Body */}
              <div className="p-8">
                {/* Feature Details */}
                <div className="space-y-3 mb-8">
                  {features[selectedFeature].details.map((detail, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <Icons.Check className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-[#1a365d]/80 dark:text-gray-300">{detail}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Metric */}
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-6 text-center mb-8">
                  <p className="text-3xl font-semibold text-[#1a365d] dark:text-white">
                    {features[selectedFeature].metric}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-4 justify-center">
                  <motion.button
                    className="px-8 py-3 bg-[#0066cc] text-white rounded-full font-medium hover:bg-[#0055aa] transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.button>
                  <motion.button
                    onClick={() => setSelectedFeature(null)}
                    className="px-8 py-3 text-[#0066cc] rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
