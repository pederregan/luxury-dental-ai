'use client';

import { useState, useEffect, useRef, createContext, useContext, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { AnimatedSection, AnimatedText, AnimatedCounter, ParallaxSection } from '@/lib/animations';
import { ProgressiveImage, LoadingSpinner } from '@/components/ui/progressive-image';
import { LoadingState, CardsGridSkeleton, FormSkeleton, SuccessStoriesSkeleton, ButtonLoadingState } from '@/components/ui/loading-state';
import { Icons } from '@/components/icons';
import { FeatureCarousel } from '@/components/ui/feature-carousel';
import { ChatWidget } from '@/components/ui/chat-widget';
import { ThemePreference } from '@/components/ui/theme-preference';
import { DemoVideoPlayer } from '@/components/ui/demo-video-player';

// Dark mode context with enhanced functionality
const DarkModeContext = createContext<{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isTransitioning: boolean;
  themePreference: 'light' | 'dark' | 'system';
  setThemePreference: (theme: 'light' | 'dark' | 'system') => void;
}>({
  isDarkMode: false,
  toggleDarkMode: () => {},
  isTransitioning: false,
  themePreference: 'system',
  setThemePreference: () => {}
});

function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [themePreference, setThemePreference] = useState<'light' | 'dark' | 'system'>('system');

  // Apply theme based on preference
  const applyTheme = (preference: 'light' | 'dark' | 'system') => {
    let shouldBeDark = false;

    if (preference === 'dark') {
      shouldBeDark = true;
    } else if (preference === 'light') {
      shouldBeDark = false;
    } else {
      // System preference
      shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    setIsDarkMode(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    const preference = savedTheme || 'system';

    setThemePreference(preference);
    applyTheme(preference);

    // Listen for system theme changes when using system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (themePreference === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [themePreference]);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setIsTransitioning(true);

    // Add transition class for smooth theme switching
    document.documentElement.style.setProperty('transition', 'background-color 0.3s ease, color 0.3s ease');

    setThemePreference(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);

    // Remove transition class after animation
    setTimeout(() => {
      document.documentElement.style.removeProperty('transition');
      setIsTransitioning(false);
    }, 300);
  };

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    handleThemeChange(newTheme);
  };

  return (
    <DarkModeContext.Provider value={{
      isDarkMode,
      toggleDarkMode,
      isTransitioning,
      themePreference,
      setThemePreference: handleThemeChange
    }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default function Page() {
  const [missedCalls, setMissedCalls] = useState(50);
  const [appointmentValue, setAppointmentValue] = useState(200);
  const [staffHours, setStaffHours] = useState(20);
  const [showROIResult, setShowROIResult] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showVideoBackground, setShowVideoBackground] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hero animation state
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const phrases = [
    { text: "that.", highlight: "#06c" }, // Apple blue
    { text: "revenue.", highlight: "#fa5c5c" }, // Apple red
    { text: "growth.", highlight: "#00c851" }, // Apple green
    { text: "scale.", highlight: "#ff9500" }, // Apple orange
    { text: "efficiency.", highlight: "#af52de" }, // Apple purple
    { text: "automation.", highlight: "#007aff" } // Apple system blue
  ];

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addListener(handleChange);

    return () => mediaQuery.removeListener(handleChange);
  }, []);

  // Auto-start video when component mounts since video background is enabled by default
  useEffect(() => {
    if (showVideoBackground && videoRef.current && !prefersReducedMotion) {
      const timer = setTimeout(() => {
        videoRef.current?.play().catch(() => {
          // Autoplay failed, that's okay - many browsers block autoplay
          console.log('Video autoplay was blocked by browser');
        });
      }, 1000); // Small delay to ensure video is loaded

      return () => clearTimeout(timer);
    }
  }, [showVideoBackground, prefersReducedMotion]);

  // Video control handlers
  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const toggleVideoBackground = () => {
    setShowVideoBackground(!showVideoBackground);
    if (!showVideoBackground && videoRef.current) {
      // Start playing when enabled
      videoRef.current.play().catch(() => {
        // Autoplay failed, that's okay
      });
    }
  };

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Press '/' to focus search (if we had one)
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        // Focus search input if exists
      }

      // Press 'Escape' to close modals or reset focus
      if (e.key === 'Escape') {
        // Remove focus from current element
        (document.activeElement as HTMLElement)?.blur();
      }

      // Press 'g' then 'h' to go home
      if (e.key === 'h' && e.altKey) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track scroll position for floating button
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cycle through phrases continuously with smoother timing
  useEffect(() => {
    // Start animation immediately
    const cycleTimer = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 2500);

    return () => clearInterval(cycleTimer);
  }, [phrases.length]);

  // Smooth scroll progress for animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const calculateROI = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setShowROIResult(true);
      setIsCalculating(false);
    }, 1500);
  };

  const annualRevenue = missedCalls * appointmentValue * 12;
  const annualSavings = staffHours * 25 * 52; // $25/hour * 52 weeks
  const totalROI = Math.round(((annualRevenue + annualSavings) / 6000) * 100); // Assuming $6000 annual cost
  const paybackPeriod = (6000 / ((annualRevenue + annualSavings) / 12)).toFixed(1);

  return (
    <DarkModeProvider>
      <PageContent />
    </DarkModeProvider>
  );
}

function PageContent() {
  const { isDarkMode, toggleDarkMode, isTransitioning, themePreference, setThemePreference } = useContext(DarkModeContext);

  // All state variables for the component
  const [missedCalls, setMissedCalls] = useState(50);
  const [appointmentValue, setAppointmentValue] = useState(200);
  const [staffHours, setStaffHours] = useState(20);
  const [showROIResult, setShowROIResult] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showVideoBackground, setShowVideoBackground] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hero animation state
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingProgress, setTypingProgress] = useState(0);

  // Testimonial carousel state
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Chat widget state
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Theme preference state
  const [isThemePreferenceOpen, setIsThemePreferenceOpen] = useState(false);

  // Demo video player state
  const [isDemoVideoOpen, setIsDemoVideoOpen] = useState(false);

  // Solution lineup state
  const [selectedPillar, setSelectedPillar] = useState<string>('patient-acquisition');
  const [currentSolutionPage, setCurrentSolutionPage] = useState<number>(0);

  const phrases = useMemo(() => [
    { text: "that.", highlight: "#06c" }, // Apple blue
    { text: "revenue.", highlight: "#fa5c5c" }, // Apple red
    { text: "growth.", highlight: "#00c851" }, // Apple green
    { text: "scale.", highlight: "#ff9500" }, // Apple orange
    { text: "efficiency.", highlight: "#af52de" }, // Apple purple
    { text: "automation.", highlight: "#007aff" } // Apple system blue
  ], []);

  // Dental AI solution lineup by pillar
  const pillarSolutions: Record<string, Array<{
    id: string;
    name: string;
    subtitle: string;
    description: string;
    pricing: string;
  }>> = useMemo(() => ({
    'patient-acquisition': [
      {
        id: 'ai-receptionist-pro',
        name: 'IntelliGhost',
        subtitle: 'AI Content Writer That Sounds Just Like You',
        description: 'You know content marketing drives new patients, but creating consistent, quality blog posts takes time you don\'t have—and hiring writers who understand your expertise is expensive and unpredictable. IntelliGhost becomes your content partner, researching and writing SEO-optimized blogs in your voice that attract ideal patients and establish your authority, so you can focus on patient care while your online presence grows.',
        pricing: 'From $597/mo.'
      },
      {
        id: 'lead-conversion-engine',
        name: 'PracticeChat',
        subtitle: '24/7 AI Assistant That Knows Your Practice Inside & Out',
        description: 'Your patients have questions at all hours, but your staff can\'t be available around the clock—and even when they are, they might not know every detail about your services. PracticeChat serves as your expert practice guide, answering patient questions instantly with comprehensive knowledge while seamlessly connecting them to the right team member for consultations and treatment planning.',
        pricing: 'From $897/mo.'
      },
      {
        id: 'digital-marketing-ai',
        name: 'IntelliForm',
        subtitle: 'Smart Website Forms That Actually Convert',
        description: 'Your website visitors are interested, but most leave without giving you their contact information or booking a call. IntelliForm guides prospects through natural, conversational forms that feel more like helpful assistance than data collection. The result? More qualified leads, more scheduled appointments, and a steady stream of new patients who are ready to move forward with treatment.',
        pricing: 'From $497/mo.'
      }
    ],
    'operational-efficiency': [
      {
        id: 'practice-automation-suite',
        name: 'CallAgent',
        subtitle: 'Streamlined workflow management',
        description: 'End-to-end automation for scheduling, confirmations, recalls, and administrative tasks that reduce staff workload by 60%.',
        pricing: 'From $797/mo.'
      },
      {
        id: 'multi-location-manager',
        name: 'Multi-Location Manager',
        subtitle: 'Centralized practice group operations',
        description: 'Enterprise dashboard for managing multiple locations with unified reporting, staff coordination, and performance analytics.',
        pricing: 'From $1,997/mo.'
      },
      {
        id: 'smart-scheduling-optimizer',
        name: 'Smart Scheduling Optimizer',
        subtitle: 'AI-powered appointment optimization',
        description: 'Advanced scheduling algorithms that maximize chair time utilization while minimizing patient wait times and no-shows.',
        pricing: 'From $697/mo.'
      }
    ],
    'clinical-excellence': [
      {
        id: 'treatment-coordinator-ai',
        name: 'Treatment Coordinator AI',
        subtitle: 'Intelligent treatment planning support',
        description: 'AI-powered assistance for treatment plan presentation, patient education, and case acceptance optimization.',
        pricing: 'From $697/mo.'
      },
      {
        id: 'patient-education-platform',
        name: 'Patient Education Platform',
        subtitle: 'Interactive treatment communication',
        description: 'Personalized patient education materials and treatment explanations that improve understanding and acceptance rates.',
        pricing: 'From $497/mo.'
      },
      {
        id: 'clinical-documentation-ai',
        name: 'Clinical Documentation AI',
        subtitle: 'Automated clinical note generation',
        description: 'Voice-to-text clinical documentation with AI-powered chart completion, reducing administrative time by 70%.',
        pricing: 'From $597/mo.'
      }
    ],
    'financial-optimization': [
      {
        id: 'revenue-analytics-pro',
        name: 'Revenue Analytics Pro',
        subtitle: 'Advanced financial insights and forecasting',
        description: 'Comprehensive revenue tracking, financial forecasting, and optimization recommendations to maximize practice profitability.',
        pricing: 'From $897/mo.'
      },
      {
        id: 'insurance-optimization-suite',
        name: 'Insurance Optimization Suite',
        subtitle: 'Automated insurance and billing management',
        description: 'Streamlined insurance verification, claims processing, and payment optimization to reduce administrative overhead.',
        pricing: 'From $597/mo.'
      },
      {
        id: 'payment-processing-ai',
        name: 'Payment Processing AI',
        subtitle: 'Intelligent payment plan optimization',
        description: 'AI-driven payment plan recommendations and automated collections that increase case acceptance and reduce outstanding balances.',
        pricing: 'From $497/mo.'
      }
    ]
  }), []);

  // Testimonials data
  const testimonials = [
    {
      quote: "DSM's AI generated $150,000 in additional revenue within 6 months across our 12-location dental group. Unlike basic answering services, their platform actually drives new patient acquisition.",
      author: "Dr. Sarah Chen, DDS",
      title: "Chief Operating Officer",
      company: "Pacific Dental Group",
      metric: "$150K",
      metricLabel: "Additional Revenue",
      locations: "12 locations"
    },
    {
      quote: "We've reduced missed calls by 85% and increased new patient bookings by 40%. The AI handles complex scheduling scenarios that would normally require our most experienced staff.",
      author: "Dr. Michael Rodriguez, DMD",
      title: "Practice Owner",
      company: "Elite Dental Associates",
      metric: "85%",
      metricLabel: "Fewer Missed Calls",
      locations: "3 locations"
    },
    {
      quote: "The multi-location dashboard gives us insights we never had before. We can see which locations are performing best and optimize staff allocation accordingly.",
      author: "Jennifer Martinez",
      title: "Regional Operations Manager",
      company: "Southwest Dental Partners",
      metric: "30%",
      metricLabel: "Efficiency Gain",
      locations: "8 locations"
    },
    {
      quote: "Implementation was seamless - 24 hours and we were live. The ROI was immediate, and patient satisfaction scores increased significantly with faster response times.",
      author: "Dr. Amanda Thompson, DDS",
      title: "Clinical Director",
      company: "Modern Family Dentistry",
      metric: "24hrs",
      metricLabel: "Implementation Time",
      locations: "5 locations"
    }
  ];

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addListener(handleChange);

    return () => mediaQuery.removeListener(handleChange);
  }, []);

  // Auto-start video when component mounts since video background is enabled by default
  useEffect(() => {
    if (showVideoBackground && videoRef.current && !prefersReducedMotion) {
      const timer = setTimeout(() => {
        videoRef.current?.play().catch(() => {
          // Autoplay failed, that's okay - many browsers block autoplay
          console.log('Video autoplay was blocked by browser');
        });
      }, 1000); // Small delay to ensure video is loaded

      return () => clearTimeout(timer);
    }
  }, [showVideoBackground, prefersReducedMotion]);

  // Video control handlers
  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const toggleVideoBackground = () => {
    setShowVideoBackground(!showVideoBackground);
    if (!showVideoBackground && videoRef.current) {
      // Start playing when enabled
      videoRef.current.play().catch(() => {
        // Autoplay failed, that's okay
      });
    }
  };

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Press '/' to focus search (if we had one)
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        // Focus search input if exists
      }

      // Press 'Escape' to close modals or reset focus
      if (e.key === 'Escape') {
        // Remove focus from current element
        (document.activeElement as HTMLElement)?.blur();
      }

      // Press 'g' then 'h' to go home
      if (e.key === 'h' && e.altKey) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track scroll position for floating button
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apple-style text editing animation sequence
  useEffect(() => {
    const animateTextChange = async () => {
      // Wait to show the current word (longer pause)
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Start highlighting from right to left (slower highlight)
      setIsHighlighting(true);
      await new Promise(resolve => setTimeout(resolve, 700));

      // Delete the highlighted text
      setIsDeleting(true);
      setIsHighlighting(false);
      await new Promise(resolve => setTimeout(resolve, 200));

      // Move to next phrase
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      setIsDeleting(false);

      // Start typing new text character by character
      setIsTyping(true);
      setTypingProgress(0);

      // Type each character with slower, more deliberate timing
      const newPhrase = phrases[(currentPhraseIndex + 1) % phrases.length].text;
      for (let i = 0; i <= newPhrase.length; i++) {
        setTypingProgress(i);
        await new Promise(resolve => setTimeout(resolve, 120 + Math.random() * 60)); // Slower typing speed
      }

      setIsTyping(false);
    };

    const cycleTimer = setInterval(animateTextChange, 5500);
    return () => clearInterval(cycleTimer);
  }, [phrases, currentPhraseIndex]);

  // Cycle through testimonials automatically
  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // 6 seconds per testimonial

    return () => clearInterval(testimonialTimer);
  }, [testimonials.length]);

  // Smooth scroll progress for animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const calculateROI = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setShowROIResult(true);
      setIsCalculating(false);
    }, 1500);
  };

  const annualRevenue = missedCalls * appointmentValue * 12;
  const annualSavings = staffHours * 25 * 52; // $25/hour * 52 weeks
  const totalROI = Math.round(((annualRevenue + annualSavings) / 6000) * 100); // Assuming $6000 annual cost
  const paybackPeriod = (6000 / ((annualRevenue + annualSavings) / 12)).toFixed(1);

  return (
    <>
      {/* Skip to main content link for screen readers and keyboard users */}
      <a
        href="#main-content"
        className="skip-to-content"
        tabIndex={0}
      >
        Skip to main content
      </a>

      <main className="overflow-x-hidden dark:bg-gray-900 transition-colors duration-300">
        {/* Navigation Header */}
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-[#1a365d]/10 dark:border-gray-700/50 transition-colors duration-300"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 xl:px-24">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.a
                href="/"
                className="flex items-center gap-2 focus:outline-none"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
                aria-label="DSM Solutions Home"
                tabIndex={0}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#1a365d] to-[#d4af37] rounded-lg" />
                <span className="font-semibold text-xl text-[#1a365d] dark:text-white transition-colors duration-300">DSM</span>
              </motion.a>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-8" role="menubar">
                {[
                  { name: 'Product', href: '#product' },
                  { name: 'Solutions', href: '#solutions' },
                  { name: 'Pricing', href: '#pricing' },
                  { name: 'About', href: '#about' }
                ].map((item, i) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-[#2d3748]/80 dark:text-gray-300 hover:text-[#1a365d] dark:hover:text-white transition-colors font-medium focus:outline-none duration-300"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    whileHover={{ y: -2 }}
                    role="menuitem"
                    tabIndex={0}
                    aria-label={`Navigate to ${item.name}`}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>

              {/* Theme Toggle and CTA Buttons */}
              <div className="flex items-center gap-4">
                {/* Enhanced Dark Mode Toggle */}
                <motion.button
                  onClick={toggleDarkMode}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setIsThemePreferenceOpen(true);
                  }}
                  className={`relative p-3 rounded-full transition-all duration-300 focus:outline-none group overflow-hidden ${
                    isDarkMode
                      ? 'bg-gradient-to-br from-blue-900 to-purple-900 hover:from-blue-800 hover:to-purple-800'
                      : 'bg-gradient-to-br from-yellow-100 to-orange-100 hover:from-yellow-200 hover:to-orange-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode. Right-click for theme preferences.`}
                  tabIndex={0}
                  disabled={isTransitioning}
                >
                  {/* Background gradient animation */}
                  <motion.div
                    className={`absolute inset-0 rounded-full ${
                      isDarkMode
                        ? 'bg-gradient-to-br from-indigo-600 to-purple-600'
                        : 'bg-gradient-to-br from-yellow-300 to-orange-300'
                    }`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: isTransitioning ? 1.2 : 0,
                      opacity: isTransitioning ? 0.8 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon container */}
                  <div className="relative z-10">
                    <AnimatePresence mode="wait">
                      {isDarkMode ? (
                        <motion.div
                          key="sun"
                          initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
                          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                        >
                          <Icons.Sun className="h-5 w-5 text-yellow-300 drop-shadow-sm" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="moon"
                          initial={{ opacity: 0, rotate: 180, scale: 0.5 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: -180, scale: 0.5 }}
                          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                        >
                          <Icons.Moon className="h-5 w-5 text-slate-700 drop-shadow-sm" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Ripple effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-full ${
                      isDarkMode ? 'bg-yellow-300' : 'bg-indigo-500'
                    }`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: isTransitioning ? [0, 1.5, 2] : 0,
                      opacity: isTransitioning ? [0, 0.3, 0] : 0
                    }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Tooltip */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-1 rounded whitespace-nowrap">
                      {isDarkMode ? 'Light mode' : 'Dark mode'}
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  className="hidden sm:block px-4 py-2 text-[#1a365d] dark:text-gray-300 font-medium hover:text-[#d4af37] dark:hover:text-[#d4af37] transition-colors focus:outline-none duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  tabIndex={0}
                  aria-label="Sign in to your account"
                >
                  Sign In
                </motion.button>
                <motion.button
                  className="px-4 py-2 bg-[#1a365d] dark:bg-[#d4af37] text-white dark:text-[#1a365d] rounded-full font-medium hover:bg-[#152a49] dark:hover:bg-[#c4941f] transition-colors focus:outline-none duration-300"
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(26, 54, 93, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  tabIndex={0}
                  aria-label="Request a demo"
                >
                  Get Demo
                </motion.button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Top Bar */}
        <div className="bg-gradient-to-r from-[#1a365d] to-[#2d3748] dark:from-gray-800 dark:to-gray-900 text-white py-2 text-center text-sm transition-colors duration-300">
          <div className="flex items-center justify-center gap-6">
            <span className="flex items-center gap-1">
              <Icons.Shield className="h-3 w-3" />
              HIPAA Compliant
            </span>
            <span className="flex items-center gap-1">
              <Icons.Award className="h-3 w-3" />
              SOC 2 Certified
            </span>
            <span className="flex items-center gap-1">
              <Icons.Lock className="h-3 w-3" />
              Professional Grade
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <motion.section
          id="main-content"
          className="relative px-6 md:px-10 lg:px-16 xl:px-24 pt-24 pb-16 bg-gradient-to-b from-white to-[#f7f5f2]/50 dark:from-gray-900 dark:to-gray-800/50 overflow-hidden transition-colors duration-300"
          style={{ opacity }}
          role="region"
          aria-label="Hero section"
        >
          {/* Video Background */}
          <AnimatePresence>
            {showVideoBackground && (
              <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                  onLoadedData={() => {
                    if (videoRef.current) {
                      videoRef.current.playbackRate = 0.7;
                      videoRef.current.play().catch(() => {
                        // Autoplay blocked, that's okay
                      });
                    }
                  }}
                >
                  {/* Professional dental practice videos - dentists, patients, procedures, equipment */}
                  <source
                    src="https://videos.pexels.com/video-files/4490311/4490311-uhd_2560_1440_25fps.mp4"
                    type="video/mp4"
                  />
                  <source
                    src="https://videos.pexels.com/video-files/3024322/3024322-hd_1920_1080_30fps.mp4"
                    type="video/mp4"
                  />
                  <source
                    src="https://videos.pexels.com/video-files/6529153/6529153-uhd_1440_2732_25fps.mp4"
                    type="video/mp4"
                  />
                  <source
                    src="https://videos.pexels.com/video-files/4488843/4488843-uhd_2560_1440_25fps.mp4"
                    type="video/mp4"
                  />
                  <source
                    src="https://videos.pexels.com/video-files/1093133/1093133-hd_1920_1080_30fps.mp4"
                    type="video/mp4"
                  />
                  <source
                    src="https://videos.pexels.com/video-files/3024321/3024321-hd_1920_1080_30fps.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>

                {/* Video overlay for better text readability */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[0.5px]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Video Controls */}
          <div className="absolute top-8 right-8 z-20 flex items-center gap-2">
            {/* Video Background Toggle */}
            <motion.button
              onClick={toggleVideoBackground}
              className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/90 transition-colors focus:outline-none group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`${showVideoBackground ? 'Disable' : 'Enable'} video background`}
              title={`${showVideoBackground ? 'Disable' : 'Enable'} video background`}
              tabIndex={0}
            >
              {showVideoBackground ? (
                <Icons.Video className="h-5 w-5 text-green-600 group-hover:text-[#d4af37] transition-colors" />
              ) : (
                <Icons.VideoOff className="h-5 w-5 text-[#1a365d] group-hover:text-[#d4af37] transition-colors" />
              )}
            </motion.button>

            {/* Video Controls - only show when video is active */}
            <AnimatePresence>
              {showVideoBackground && !prefersReducedMotion && (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Play/Pause */}
                  <motion.button
                    onClick={toggleVideoPlayback}
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/90 transition-colors focus:outline-none"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
                    tabIndex={0}
                  >
                    {isVideoPlaying ? (
                      <Icons.Pause className="h-4 w-4 text-[#1a365d]" />
                    ) : (
                      <Icons.Play className="h-4 w-4 text-[#1a365d]" />
                    )}
                  </motion.button>

                  {/* Mute/Unmute */}
                  <motion.button
                    onClick={toggleVideoMute}
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/90 transition-colors focus:outline-none"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={isVideoMuted ? 'Unmute video' : 'Mute video'}
                    tabIndex={0}
                  >
                    {isVideoMuted ? (
                      <Icons.VolumeOff className="h-4 w-4 text-[#1a365d]" />
                    ) : (
                      <Icons.Volume className="h-4 w-4 text-[#1a365d]" />
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Reduced Motion Notice */}
          {prefersReducedMotion && showVideoBackground && (
            <div className="absolute top-8 left-8 z-20 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
              <Icons.Info className="h-4 w-4 inline mr-2" />
              Video background disabled due to motion preference
            </div>
          )}

          {/* Animated Background Elements (when video is not active) */}
          <AnimatePresence>
            {!showVideoBackground && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
              >
                <motion.div
                  className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-[#d4af37]/10 to-transparent rounded-full blur-3xl"
                  animate={{
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#1a365d]/10 to-transparent rounded-full blur-3xl"
                  animate={{
                    x: [0, -30, 0],
                    y: [0, 20, 0],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mx-auto max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-center"
            >
              <motion.h1
                className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight text-[#1a365d] dark:text-white mb-16 flex flex-wrap justify-center items-baseline gap-2 transition-colors duration-300"
                style={{
                  transform: useTransform(
                    scrollYProgress,
                    [0, 0.3],
                    ["translateY(0px)", "translateY(-30px)"]
                  )
                }}
              >
                <span>DSM does</span>
                <span className="relative inline-block px-3">
                  {/* Text Content with Highlight */}
                  <span
                    className="relative font-bold tracking-tight text-[#1a365d] dark:text-white"
                    style={{
                      opacity: isDeleting ? 0 : 1,
                      transition: 'opacity 0.15s ease-out'
                    }}
                  >
                    {/* Highlight Selection Effect - Right to Left - Only on text */}
                    <motion.span
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: '#d4af37', // Your yellow highlight color
                        transformOrigin: 'right center', // Start from right
                      }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{
                        scaleX: isHighlighting ? 1 : 0,
                        opacity: isHighlighting ? 0.4 : 0
                      }}
                      transition={{
                        duration: 0.7,
                        ease: [0.25, 0.4, 0.25, 1]
                      }}
                    />
                    {isTyping ?
                      phrases[currentPhraseIndex].text.slice(0, typingProgress) :
                      phrases[currentPhraseIndex].text
                    }

                    {/* Typing Cursor */}
                    {isTyping && (
                      <motion.span
                        className="inline-block w-0.5 h-[1em] bg-current ml-1"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1.0, repeat: Infinity }}
                      />
                    )}
                  </span>
                </span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-[#2d3748]/60 dark:text-gray-300 max-w-3xl mx-auto mb-12 text-center font-light transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                style={{
                  transform: useTransform(
                    scrollYProgress,
                    [0, 0.3],
                    ["translateY(0px)", "translateY(-20px)"]
                  )
                }}
              >
                How Much Longer Will You Tolerate Running Your Practice on 1995 Systems?
              </motion.p>
            </motion.div>

            {/* Key Benefits */}
            <motion.div
              className="grid md:grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {[
                {
                  icon: Icons.TrendingUp,
                  title: "Stop Losing Patients Before They Book",
                  desc: "Convert website visitors into paying patients. DSM's AI forms and chat triple lead conversion, rescuing the 75% of prospects who would have otherwise clicked away."
                },
                {
                  icon: Icons.Building,
                  title: "Eliminate Hidden Revenue Leaks",
                  desc: "Identify and fix missed appointments, failed follow-ups, and insurance claim denials that cost practices $200K+ annually"
                },
                {
                  icon: Icons.Users,
                  title: "Do more with the team you already have.",
                  desc: "AI scheduling, phone, and claims automation cut staff busywork in half, freeing them to focus on patient care and accelerating your collections."
                }
              ].map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={i}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-[#1a365d]/10 dark:border-gray-700/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  >
                    <Icon className="h-8 w-8 text-[#d4af37] mb-4" />
                    <h3 className="font-semibold text-[#1a365d] dark:text-white mb-2">{benefit.title}</h3>
                    <p className="text-sm text-[#2d3748]/70 dark:text-gray-300">{benefit.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              role="group"
              aria-label="Call to action buttons"
            >
              <motion.button
                className="px-8 py-4 bg-[#1a365d] dark:bg-[#d4af37] text-white dark:text-[#1a365d] rounded-full text-lg font-medium shadow-lg focus:outline-none"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(26, 54, 93, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                tabIndex={0}
                aria-label="Calculate your revenue potential"
              >
                Calculate Your Revenue Potential
              </motion.button>
              <motion.button
                onClick={() => setIsDemoVideoOpen(true)}
                className="px-8 py-4 border-2 border-[#1a365d] dark:border-gray-700 text-[#1a365d] dark:text-white rounded-full text-lg font-medium focus:outline-none"
                whileHover={{ scale: 1.05, backgroundColor: "#1a365d", color: "white" }}
                whileTap={{ scale: 0.98 }}
                tabIndex={0}
                aria-label="Watch interactive demo video"
              >
                Watch Interactive Demo
              </motion.button>
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { label: "HITRUST CSF Certified", icon: Icons.Shield },
                { label: "SOC 2 Type II", icon: Icons.Award },
                { label: "HIPAA Compliant", icon: Icons.Lock },
                { label: "500+ Dental Practices", icon: Icons.Building },
                { label: "99.9% Uptime", icon: Icons.Activity }
              ].map((signal, i) => {
                const Icon = signal.icon;
                return (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2 text-[#2d3748]/60 dark:text-gray-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.05 }}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{signal.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.section>

        {/* Social Proof Section */}
        <AnimatedSection className="px-6 md:px-10 lg:px-16 xl:px-24 py-20 bg-white dark:bg-gray-800">
          <div className="mx-auto max-w-7xl">


            {/* Dental AI Solution Lineup Explorer */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-[family-name:var(--font-playfair)] text-[#1a365d] dark:text-white">
                  Explore the solutions.
                </h3>
                <div className="flex gap-4 text-sm">
                  <button className="text-[#06c] hover:underline">Help me choose ›</button>
                  <button className="text-[#06c] hover:underline">Compare all solutions ›</button>
                </div>
              </div>

              {/* Pillar Navigation */}
              <div className="flex gap-2 mb-12">
                {[
                  { id: 'patient-acquisition', label: 'Patient Acquisition' },
                  { id: 'operational-efficiency', label: 'Operational Efficiency' },
                  { id: 'clinical-excellence', label: 'Clinical Excellence' },
                  { id: 'financial-optimization', label: 'Financial Optimization' }
                ].map((pillar, i) => (
                  <motion.button
                    key={pillar.id}
                    onClick={() => {
                      setSelectedPillar(pillar.id);
                      setCurrentSolutionPage(0);
                    }}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedPillar === pillar.id
                        ? 'bg-[#1a365d] text-white dark:bg-[#d4af37] dark:text-[#1a365d]'
                        : 'bg-gray-100 text-[#1a365d] hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {pillar.label}
                  </motion.button>
                ))}
              </div>

              {/* Solution Showcase */}
              <div className="relative">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
                {pillarSolutions[selectedPillar]?.slice(currentSolutionPage * 2, (currentSolutionPage * 2) + 2).map((solution, i) => (
                  <motion.div
                    key={solution.id}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 text-center relative overflow-hidden dark:from-gray-800 dark:to-gray-800/50 border border-gray-200/50 dark:border-gray-600/50"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    {/* Solution Visual */}
                    <div className="h-48 mb-4 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d]/10 to-[#d4af37]/10 rounded-2xl flex items-center justify-center">
                        <motion.div
                          className="w-40 h-28 bg-gradient-to-br from-[#1a365d] to-[#2d3748] rounded-xl flex items-center justify-center shadow-xl"
                          whileHover={{ scale: 1.05, rotateY: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="text-white text-center">
                            <Icons.Building className="h-7 w-7 mx-auto mb-2" />
                            <div className="text-xs font-medium leading-tight px-2">{solution.name}</div>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Solution Details */}
                    <h4 className="text-xl font-semibold text-[#1a365d] dark:text-white mb-2">
                      {solution.name}
                    </h4>

                    <p className="text-sm text-[#2d3748]/60 dark:text-gray-300 mb-4">
                      {solution.subtitle}
                    </p>

                    <p className="text-[#2d3748]/80 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                      {solution.description}
                    </p>

                    <div className="text-lg font-semibold text-[#1a365d] dark:text-white mb-6">
                      {solution.pricing}
                    </div>

                    <div className="flex gap-3 justify-center">
                      <motion.button
                        className="px-6 py-2 text-white rounded-full text-sm font-medium hover:bg-[#0056cc] transition-colors bg-[#1A365D]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn more
                      </motion.button>
                      <motion.button
                        className="px-6 py-2 text-[#06c] text-sm font-medium hover:text-[#0056cc] transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Schedule call›
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
                </div>

                {/* Navigation Controls - Bottom Right */}
                {pillarSolutions[selectedPillar] && pillarSolutions[selectedPillar].length > 2 && (
                  <div className="flex items-center gap-2 justify-end mt-6">
                    <motion.button
                      onClick={() => setCurrentSolutionPage(prev => Math.max(0, prev - 1))}
                      disabled={currentSolutionPage === 0}
                      className={`p-3 rounded-full transition-all duration-200 ${
                        currentSolutionPage === 0
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                          : 'bg-white text-[#1a365d] hover:bg-gray-50 shadow-md hover:shadow-lg dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                      }`}
                      whileHover={currentSolutionPage > 0 ? { scale: 1.05 } : {}}
                      whileTap={currentSolutionPage > 0 ? { scale: 0.95 } : {}}
                      aria-label="Previous solutions"
                    >
                      <Icons.ChevronLeft className="h-5 w-5" />
                    </motion.button>

                    <motion.button
                      onClick={() => setCurrentSolutionPage(prev =>
                        prev < Math.ceil(pillarSolutions[selectedPillar].length / 2) - 1 ? prev + 1 : prev
                      )}
                      disabled={currentSolutionPage >= Math.ceil(pillarSolutions[selectedPillar].length / 2) - 1}
                      className={`p-3 rounded-full transition-all duration-200 ${
                        currentSolutionPage >= Math.ceil(pillarSolutions[selectedPillar].length / 2) - 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                          : 'bg-white text-[#1a365d] hover:bg-gray-50 shadow-md hover:shadow-lg dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                      }`}
                      whileHover={currentSolutionPage < Math.ceil(pillarSolutions[selectedPillar].length / 2) - 1 ? { scale: 1.05 } : {}}
                      whileTap={currentSolutionPage < Math.ceil(pillarSolutions[selectedPillar].length / 2) - 1 ? { scale: 0.95 } : {}}
                      aria-label="Next solutions"
                    >
                      <Icons.ChevronRight className="h-5 w-5" />
                    </motion.button>
                  </div>
                )}
              </div>
            </div>

            {/* Animated Testimonial Carousel */}
            <div className="max-w-6xl mx-auto">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-[#f7f5f2]/50 dark:from-gray-800 dark:to-gray-800/50 p-8 md:p-12 shadow-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonialIndex}
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.25, 0.4, 0.25, 1],
                      scale: { duration: 0.4 }
                    }}
                    className="grid md:grid-cols-3 gap-8 items-center"
                  >
                    {/* Testimonial Content */}
                    <div className="md:col-span-2">
                      <motion.blockquote
                        className="text-xl md:text-2xl text-[#2d3748] dark:text-gray-300 italic mb-6 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        "{testimonials[currentTestimonialIndex].quote}"
                      </motion.blockquote>

                      <motion.div
                        className="flex items-center gap-4 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#d4af37]/30 to-[#1a365d]/20 dark:from-[#d4af37]/20 dark:to-gray-700/30 flex items-center justify-center">
                          <span className="text-2xl font-bold text-[#1a365d] dark:text-white">
                            {testimonials[currentTestimonialIndex].author.split(' ')[0][0]}
                            {testimonials[currentTestimonialIndex].author.split(' ')[1]?.[0]}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-[#1a365d] dark:text-white text-lg">
                            {testimonials[currentTestimonialIndex].author}
                          </div>
                          <div className="text-[#2d3748]/70 dark:text-gray-300">
                            {testimonials[currentTestimonialIndex].title}
                          </div>
                          <div className="text-sm text-[#d4af37] font-medium">
                            {testimonials[currentTestimonialIndex].company} • {testimonials[currentTestimonialIndex].locations}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Impact Metric */}
                    <motion.div
                      className="md:col-span-1 text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <div className="bg-gradient-to-br from-[#1a365d] to-[#2d3748] dark:from-[#d4af37] dark:to-[#c4941f] text-white rounded-2xl p-6">
                        <div className="text-4xl md:text-5xl font-bold mb-2">
                          {testimonials[currentTestimonialIndex].metric}
                        </div>
                        <div className="text-sm opacity-90">
                          {testimonials[currentTestimonialIndex].metricLabel}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentTestimonialIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                        index === currentTestimonialIndex
                          ? 'w-8 bg-[#1a365d] dark:bg-[#d4af37]'
                          : 'w-2 bg-[#1a365d]/30 dark:bg-gray-600 hover:bg-[#1a365d]/50 dark:hover:bg-gray-500'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Auto-rotation Progress Bar */}
                <div className="absolute bottom-0 left-0 h-1 bg-[#1a365d]/10 dark:bg-gray-700/30 w-full">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#1a365d] to-[#d4af37] dark:from-[#d4af37] dark:to-[#c4941f]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                      repeatType: "loop"
                    }}
                    key={currentTestimonialIndex}
                  />
                </div>
              </div>

              {/* Additional Trust Signals */}
              <motion.div
                className="grid md:grid-cols-4 gap-6 mt-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {[
                  { value: "500+", label: "Dental Practices", icon: Icons.Building },
                  { value: "85%", label: "Average Call Answer Rate", icon: Icons.TrendingUp },
                  { value: "$2.3M", label: "Additional Revenue Generated", icon: Icons.Award },
                  { value: "24/7", label: "Intelligent Support", icon: Icons.Clock }
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={i}
                      className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    >
                      <Icon className="h-8 w-8 text-[#d4af37] mx-auto mb-3" />
                      <div className="text-2xl font-bold text-[#1a365d] dark:text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-[#2d3748]/60 dark:text-gray-300">
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Problem/Solution Section */}
        <AnimatedSection className="px-6 md:px-10 lg:px-16 xl:px-24 py-20 bg-gradient-to-b from-[#f7f5f2]/50 to-white dark:from-gray-800/50 dark:to-white/50">
          <div className="mx-auto max-w-7xl">
            <AnimatedText as="h2" className="font-[family-name:var(--font-playfair)] text-4xl text-[#1a365d] dark:text-white text-center mb-12">
              Why Dental Practices Choose Enterprise AI Over Basic Answering Services
            </AnimatedText>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Problem */}
              <motion.div
                className="bg-red-50 rounded-2xl p-8 dark:bg-gray-800/50"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-red-900 dark:text-white mb-6 flex items-center gap-2">
                  <Icons.X className="h-6 w-6" />
                  The Problem
                </h3>
                <ul className="space-y-4">
                  {[
                    "35% of calls go unanswered during peak hours",
                    "Basic AI receptionists only save costs, don't generate revenue",
                    "Single-practice solutions can't scale across multiple locations",
                    "Legacy systems lack modern dental practice integration capabilities"
                  ].map((problem, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-[#2d3748] dark:text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Icons.X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{problem}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Solution */}
              <motion.div
                className="bg-green-50 rounded-2xl p-8 dark:bg-gray-800/50"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-green-900 dark:text-white mb-6 flex items-center gap-2">
                  <Icons.Check className="h-6 w-6" />
                  The Solution
                </h3>
                <ul className="space-y-4">
                  {[
                    { title: "24/7 Intelligent Patient Acquisition", desc: "AI that converts calls into booked appointments" },
                    { title: "Revenue-Generating Features", desc: "Upselling, reactivation campaigns, and treatment optimization" },
                    { title: "Multi-Location Enterprise Dashboard", desc: "Centralized management with location-specific insights" },
                    { title: "Dental-Specific Solutions", desc: "General, orthodontic, periodontic, and specialty dental practice support" }
                  ].map((solution, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Icons.Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-[#1a365d] dark:text-white">{solution.title}</div>
                        <div className="text-sm text-[#2d3748]/70 dark:text-gray-300">{solution.desc}</div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Features Section */}
        <AnimatedSection className="px-6 md:px-10 lg:px-16 xl:px-24 py-20 bg-gray-50 dark:bg-gray-900">
          <FeatureCarousel />
        </AnimatedSection>

        {/* ROI Calculator Section */}
        <AnimatedSection id="roi-calculator" className="px-6 md:px-10 lg:px-16 xl:px-24 py-20 bg-gradient-to-b from-[#f7f5f2]/50 to-white dark:from-gray-800/50 dark:to-white/50">
          <div className="mx-auto max-w-7xl">
            <AnimatedText as="h2" className="font-[family-name:var(--font-playfair)] text-4xl text-[#1a365d] dark:text-white text-center mb-12">
              Calculate Your Practice's Revenue Potential
            </AnimatedText>

            <motion.div
              className="max-w-5xl mx-auto bg-gradient-to-br from-white to-[#f7f5f2]/30 rounded-3xl shadow-2xl p-8 md:p-12 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-800/50 border border-[#1a365d]/10 dark:border-gray-700/50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid md:grid-cols-3 gap-8 mb-10">
                <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 backdrop-blur-sm">
                  <label className="block text-base font-semibold text-[#1a365d] dark:text-white mb-3">
                    Missed Calls Per Month
                  </label>
                  <div className="flex items-center gap-4 mb-2">
                    <input
                      type="range"
                      min="10"
                      max="200"
                      value={missedCalls}
                      onChange={(e) => setMissedCalls(Number(e.target.value))}
                      className="flex-1 h-6 bg-gradient-to-r from-[#1a365d]/10 to-[#d4af37]/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <span className="w-24 text-right text-4xl font-bold text-[#d4af37]">{missedCalls}</span>
                  </div>
                  <p className="text-xs text-[#2d3748]/60 dark:text-gray-400">Calls you miss after hours or when busy</p>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 backdrop-blur-sm">
                  <label className="block text-base font-semibold text-[#1a365d] dark:text-white mb-3">
                    Average Treatment Value
                  </label>
                  <div className="relative mb-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-[#1a365d] dark:text-white font-bold">$</span>
                    <input
                      type="number"
                      value={appointmentValue}
                      onChange={(e) => setAppointmentValue(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 text-3xl font-bold text-[#1a365d] dark:text-white bg-white dark:bg-gray-900 border-2 border-[#1a365d]/20 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all"
                    />
                  </div>
                  <p className="text-xs text-[#2d3748]/60 dark:text-gray-400">Your typical patient spend per visit</p>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 backdrop-blur-sm">
                  <label className="block text-base font-semibold text-[#1a365d] dark:text-white mb-3">
                    Hours Saved Weekly
                  </label>
                  <div className="flex items-center gap-4 mb-2">
                    <input
                      type="range"
                      min="5"
                      max="40"
                      value={staffHours}
                      onChange={(e) => setStaffHours(Number(e.target.value))}
                      className="flex-1 h-6 bg-gradient-to-r from-[#1a365d]/10 to-[#d4af37]/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <span className="w-24 text-right text-4xl font-bold text-[#d4af37]">{staffHours}h</span>
                  </div>
                  <p className="text-xs text-[#2d3748]/60 dark:text-gray-400">Staff time freed for patient care</p>
                </div>
              </div>

              <div className="text-center">
                <motion.button
                  onClick={calculateROI}
                  className="px-12 py-4 bg-gradient-to-r from-[#1a365d] to-[#2d3748] dark:from-[#d4af37] dark:to-[#c4941f] text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isCalculating}
                >
                  <ButtonLoadingState isLoading={isCalculating} loadingText="Calculating">
                    Calculate Your ROI →
                  </ButtonLoadingState>
                </motion.button>
              </div>

              <AnimatePresence>
                {showROIResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-10"
                  >
                    <div className="bg-gradient-to-r from-[#1a365d] to-[#2d3748] dark:from-[#d4af37] dark:to-[#c4941f] rounded-2xl p-1">
                      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-center text-[#1a365d] dark:text-white mb-8">
                          Your Potential Annual Impact
                        </h3>
                        <div className="grid md:grid-cols-4 gap-6 text-center">
                          <div className="transform hover:scale-105 transition-transform">
                            <div className="text-xs uppercase tracking-wider text-[#2d3748]/60 dark:text-gray-400 mb-2">Recovered Revenue</div>
                            <div className="text-4xl font-bold text-[#1a365d] dark:text-white">
                              $<AnimatedCounter value={annualRevenue} />
                            </div>
                            <div className="text-xs text-[#d4af37] mt-1">From missed calls</div>
                          </div>
                          <div className="transform hover:scale-105 transition-transform">
                            <div className="text-xs uppercase tracking-wider text-[#2d3748]/60 dark:text-gray-400 mb-2">Staff Cost Savings</div>
                            <div className="text-4xl font-bold text-[#1a365d] dark:text-white">
                              $<AnimatedCounter value={annualSavings} />
                            </div>
                            <div className="text-xs text-[#d4af37] mt-1">Annually saved</div>
                          </div>
                          <div className="transform hover:scale-105 transition-transform">
                            <div className="text-xs uppercase tracking-wider text-[#2d3748]/60 dark:text-gray-400 mb-2">Return on Investment</div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-[#d4af37] to-[#c4941f] bg-clip-text text-transparent">
                              <AnimatedCounter value={totalROI} />%
                            </div>
                            <div className="text-xs text-[#d4af37] mt-1">First year ROI</div>
                          </div>
                          <div className="transform hover:scale-105 transition-transform">
                            <div className="text-xs uppercase tracking-wider text-[#2d3748]/60 dark:text-gray-400 mb-2">Break Even</div>
                            <div className="text-4xl font-bold text-[#1a365d] dark:text-white">
                              {paybackPeriod}
                            </div>
                            <div className="text-xs text-[#d4af37] mt-1">Months to profit</div>
                          </div>
                        </div>

                        <motion.div
                          className="mt-10 text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <p className="text-sm text-[#2d3748]/70 dark:text-gray-300 mb-4">
                            Ready to capture this value for your practice?
                          </p>
                          <button className="px-10 py-4 bg-gradient-to-r from-[#d4af37] to-[#c4941f] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                            Get Your Custom ROI Analysis →
                          </button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Dental Specialties Section */}
        <AnimatedSection className="px-6 md:px-10 lg:px-16 xl:px-24 py-20 bg-white dark:bg-gray-800">
          <div className="mx-auto max-w-7xl">
            <AnimatedText as="h2" className="font-[family-name:var(--font-playfair)] text-4xl text-[#1a365d] dark:text-white text-center mb-12">
              Purpose-Built for Every Type of Dental Practice
            </AnimatedText>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Icons.GeneralDentistry,
                  title: "General Dentistry",
                  features: [
                    "Family practice optimization",
                    "Preventive care scheduling",
                    "Insurance verification automation"
                  ],
                  stat: "Serving 60% more patients with same staff"
                },
                {
                  icon: Icons.Orthodontics,
                  title: "Orthodontics",
                  features: [
                    "Treatment milestone tracking",
                    "Adjustment appointment coordination",
                    "Progress monitoring workflows"
                  ],
                  stat: "Reduced no-shows by 80% with smart reminders"
                },
                {
                  icon: Icons.Periodontics,
                  title: "Periodontics & Specialties",
                  features: [
                    "Referral management systems",
                    "Specialist consultation scheduling",
                    "Treatment plan coordination"
                  ],
                  stat: "$60,000 annual revenue increase per specialist"
                }
              ].map((specialty, i) => {
                const Icon = specialty.icon;
                return (
                  <motion.div
                    key={i}
                    className="bg-gradient-to-b from-white to-[#f7f5f2]/30 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-800/30 rounded-2xl p-6 border border-[#1a365d]/10 dark:border-gray-700/50"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="text-[#d4af37] mb-4">
                      <Icon className="h-12 w-12" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1a365d] dark:text-white mb-4">{specialty.title}</h3>
                    <ul className="space-y-2 mb-6">
                      {specialty.features.map((feature, j) => (
                        <li key={j} className="text-sm text-[#2d3748]/70 dark:text-gray-300 flex items-start gap-2">
                          <Icons.Check className="h-4 w-4 text-[#d4af37] dark:text-[#d4af37] mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-[#1a365d]/10 dark:border-gray-700/50">
                      <div className="text-sm font-medium text-[#d4af37] dark:text-[#d4af37] italic">
                        "{specialty.stat}"
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* Competitive Advantage Section */}
        <AnimatedSection className="px-6 md:px-10 lg:px-16 xl:px-24 py-20 bg-gradient-to-b from-[#f7f5f2]/50 to-white dark:from-gray-800/50 dark:to-white/50">
          <div className="mx-auto max-w-7xl">
            <AnimatedText as="h2" className="font-[family-name:var(--font-playfair)] text-4xl text-[#1a365d] dark:text-white text-center mb-12">
              Why DSM Outperforms Basic AI Receptionist Solutions
            </AnimatedText>

            <motion.div
              className="overflow-x-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <table className="w-full bg-white rounded-2xl overflow-hidden shadow-lg dark:shadow-gray-800/50">
                <thead className="bg-[#1a365d] text-white dark:bg-gray-800 dark:text-white">
                  <tr>
                    <th className="p-4 text-left">Feature</th>
                    <th className="p-4 text-center">DSM Solutions</th>
                    <th className="p-4 text-center">Arini</th>
                    <th className="p-4 text-center">Gumline</th>
                    <th className="p-4 text-center">Savvy Agents</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Dental Focus", dsm: "Dental-optimized", others: "Dental-focused" },
                    { feature: "Advanced Features", dsm: "✅ Multi-location", others: "❌ Small practice" },
                    { feature: "Revenue Generation", dsm: "✅ Patient acquisition", others: "❌ Cost savings only" },
                    { feature: "Advanced Analytics", dsm: "✅ Business intelligence", others: "❌ Basic reporting" },
                    { feature: "Partner Program", dsm: "✅ White-label ready", others: "❌ Direct only" },
                    { feature: "Scalability", dsm: "Professional-grade", others: "Single practice" }
                  ].map((row, i) => (
                    <motion.tr
                      key={i}
                      className="border-b border-[#1a365d]/10 dark:border-gray-700/50"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <td className="p-4 font-medium text-[#1a365d] dark:text-white">{row.feature}</td>
                      <td className="p-4 text-center">
                        <span className="text-green-600 font-semibold">{row.dsm}</span>
                      </td>
                      <td className="p-4 text-center text-[#2d3748]/60 dark:text-gray-300">{row.others}</td>
                      <td className="p-4 text-center text-[#2d3748]/60 dark:text-gray-300">{row.others}</td>
                      <td className="p-4 text-center text-[#2d3748]/60 dark:text-gray-300">{row.others}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Implementation Section */}
        <AnimatedSection className="px-6 md:px-10 lg:px-16 xl:px-24 py-20 bg-white dark:bg-gray-800">
          <div className="mx-auto max-w-7xl">
            <AnimatedText as="h2" className="font-[family-name:var(--font-playfair)] text-4xl text-[#1a365d] dark:text-white text-center mb-12">
              Professional Implementation Made Simple
            </AnimatedText>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-12 left-0 right-0 h-0.5 bg-[#1a365d]/20 dark:bg-gray-700/20 hidden md:block" />

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    step: "1",
                    title: "Assessment & Integration",
                    items: [
                      "Technical systems audit",
                      "PMS/EMR connectivity setup",
                      "Custom workflow configuration"
                    ]
                  },
                  {
                    step: "2",
                    title: "AI Training & Customization",
                    items: [
                      "Practice-specific conversation flows",
                      "Industry compliance protocols",
                      "Multi-location rule setup"
                    ]
                  },
                  {
                    step: "3",
                    title: "Pilot & Testing",
                    items: [
                      "Controlled rollout program",
                      "Staff training and optimization",
                      "Performance monitoring"
                    ]
                  },
                  {
                    step: "4",
                    title: "Full Deployment & Scaling",
                    items: [
                      "Complete activation across locations",
                      "Ongoing optimization support",
                      "Monthly performance reviews"
                    ]
                  }
                ].map((phase, i) => (
                  <motion.div
                    key={i}
                    className="relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        className="w-20 h-20 rounded-full bg-[#1a365d] dark:bg-[#d4af37] text-white flex items-center justify-center text-2xl font-bold mb-4 relative z-10"
                        whileHover={{ scale: 1.1 }}
                      >
                        {phase.step}
                      </motion.div>
                      <h3 className="font-semibold text-[#1a365d] dark:text-white mb-3">{phase.title}</h3>
                      <ul className="space-y-1">
                        {phase.items.map((item, j) => (
                          <li key={j} className="text-sm text-[#2d3748]/70 dark:text-gray-300">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 dark:bg-gray-800/50 text-green-800 dark:text-white rounded-full">
                <Icons.Clock className="h-5 w-5" />
                <span className="font-medium">24-48 hours per location with zero downtime</span>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Pricing Section */}
        <AnimatedSection className="px-6 md:px-10 lg:px-16 xl:px-24 py-20 bg-gradient-to-b from-[#f7f5f2]/50 to-white dark:from-gray-800/50 dark:to-white/50">
          <div className="mx-auto max-w-7xl">
            <AnimatedText as="h2" className="font-[family-name:var(--font-playfair)] text-4xl text-[#1a365d] dark:text-white text-center mb-12">
              Scalable Pricing That Grows With Your Practice
            </AnimatedText>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Professional",
                  price: "$597",
                  period: "/month",
                  features: [
                    "Single practice solution",
                    "Advanced AI receptionist",
                    "PMS integration included",
                    "Standard analytics dashboard"
                  ],
                  tagline: "Perfect for growing practices",
                  highlighted: false
                },
                {
                  name: "Advanced",
                  price: "$1,997",
                  period: "/month",
                  features: [
                    "Multi-location management",
                    "Advanced business intelligence",
                    "Custom integrations available",
                    "Dedicated success manager"
                  ],
                  tagline: "Built for practice groups",
                  highlighted: true
                },
                {
                  name: "White-Label Partner",
                  price: "Custom",
                  period: "",
                  features: [
                    "Reseller program access",
                    "Co-branded solutions",
                    "Revenue sharing model",
                    "Technical support included"
                  ],
                  tagline: "For technology partners",
                  highlighted: false
                }
              ].map((plan, i) => (
                <motion.div
                  key={i}
                  className={`rounded-2xl p-8 ${
                    plan.highlighted
                      ? 'bg-[#1a365d] text-white shadow-2xl scale-105 dark:bg-[#d4af37] dark:text-white'
                      : 'bg-white border border-[#1a365d]/10 dark:border-gray-700/50'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <h3 className={`text-xl font-semibold mb-2 ${plan.highlighted ? 'text-white' : 'text-[#1a365d] dark:text-white'}`}>
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className={`text-3xl font-bold ${plan.highlighted ? 'text-white' : 'text-[#1a365d] dark:text-white'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-sm ${plan.highlighted ? 'text-white/80' : 'text-[#2d3748]/60 dark:text-gray-300'}`}>
                      {plan.period}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, j) => (
                      <li key={j} className={`flex items-start gap-2 text-sm ${plan.highlighted ? 'text-white/90' : 'text-[#2d3748]/70 dark:text-gray-300'}`}>
                        <Icons.Check className="h-4 w-4 flex-shrink-0 mt-0.5 text-[#d4af37] dark:text-[#d4af37]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={`text-sm italic mb-6 ${plan.highlighted ? 'text-white/80' : 'text-[#2d3748]/60 dark:text-gray-300'}`}>
                    "{plan.tagline}"
                  </div>
                  <button className={`w-full py-3 rounded-full font-medium transition-all ${
                    plan.highlighted
                      ? 'bg-white text-[#1a365d] dark:bg-[#d4af37] dark:text-white hover:bg-[#f7f5f2] dark:hover:bg-[#c4941f] dark:hover:bg-[#c4941f]/90'
                      : 'bg-[#1a365d] text-white hover:bg-[#152a49] dark:hover:bg-[#c4941f] dark:hover:bg-[#c4941f]/90'
                  }`}>
                    Schedule Consultation
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Case Study Section */}
        <AnimatedSection className="px-6 md:px-10 lg:px-16 xl:px-24 py-20 bg-white dark:bg-gray-800">
          <div className="mx-auto max-w-7xl">
            <AnimatedText as="h2" className="font-[family-name:var(--font-playfair)] text-4xl text-[#1a365d] dark:text-white text-center mb-12">
              Real Results from Real Dental Organizations
            </AnimatedText>

            <motion.div
              className="bg-gradient-to-br from-[#f7f5f2] to-white rounded-3xl p-8 md:p-12 dark:bg-gradient-to-br dark:from-gray-800 dark:to-white/50"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-[#1a365d] dark:text-white mb-4">Pacific Northwest Dental Group</h3>
                  <div className="space-y-4 text-[#2d3748] dark:text-gray-300">
                    <p>
                      <strong>15 locations</strong> across Oregon and Washington
                    </p>
                    <p>
                      <strong>Challenge:</strong> Managing call volume across multiple time zones
                    </p>
                    <p>
                      <strong>Solution:</strong> DSM's enterprise platform with location-specific optimization
                    </p>
                    <p>
                      <strong>Results:</strong> $280,000 additional revenue in first year, 45% reduction in missed calls
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "$280K", label: "Additional Revenue" },
                    { value: "45%", label: "Fewer Missed Calls" },
                    { value: "30%", label: "More New Patients" },
                    { value: "20 Hours", label: "Weekly Staff Savings" }
                  ].map((metric, i) => (
                    <motion.div
                      key={i}
                      className="bg-white rounded-xl p-4 text-center dark:bg-gray-800/50"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    >
                      <div className="text-2xl font-bold text-[#1a365d] dark:text-white">{metric.value}</div>
                      <div className="text-sm text-[#2d3748]/60 dark:text-gray-300">{metric.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Final CTA Section */}
        <AnimatedSection className="px-6 md:px-10 lg:px-16 xl:px-24 py-20 bg-gradient-to-b from-[#1a365d] to-[#152a49] text-white dark:bg-gradient-to-b dark:from-[#1a365d] dark:to-[#152a49] dark:text-white">
          <div className="mx-auto max-w-7xl text-center">
            <AnimatedText as="h2" className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl mb-6">
              Ready to Transform Your Dental Practice Into a Revenue Machine?
            </AnimatedText>
            <AnimatedText delay={0.2} className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              Join 500+ dental practices generating measurable revenue growth with DSM's Advanced AI Communication Platform.
              HIPAA-compliant, professional-grade, and purpose-built for dental practice success.
            </AnimatedText>

            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={() => setIsDemoVideoOpen(true)}
                className="px-8 py-4 bg-white text-[#1a365d] dark:bg-[#d4af37] dark:text-white rounded-full text-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Watch Demo
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-white dark:border-gray-700 text-white dark:text-[#1a365d] rounded-full text-lg font-medium"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                Download ROI Guide
              </motion.button>
            </motion.div>

            <motion.div
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/70 dark:text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <Icons.Phone className="h-5 w-5" />
                <span>1-800-DSM-GROW</span>
              </div>
              <div>info@dsmsolutions.com</div>
              <div>Professional Dental Technology Division</div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Floating Demo Button with keyboard accessibility */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              className="fixed bottom-8 right-8 z-50"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              role="complementary"
              aria-label="Quick actions"
            >
              <motion.button
                className="group relative px-6 py-3 bg-gradient-to-r from-[#1a365d] to-[#2d3748] dark:from-[#d4af37] dark:to-[#c4941f] text-white rounded-full shadow-2xl flex items-center gap-2 focus:outline-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                tabIndex={0}
                aria-label="Get demo - scroll to top"
                title="Press Alt+H to go to top"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#ff9500] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10 font-semibold">Get Demo</span>
                <motion.div
                  className="relative z-10"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Icons.ChevronRight className="h-5 w-5" />
                </motion.div>
              </motion.button>

              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#1a365d] to-[#2d3748] rounded-full pointer-events-none"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ opacity: 0.3, zIndex: -1 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Widget */}
        <ChatWidget
          isOpen={isChatOpen}
          onToggle={() => setIsChatOpen(!isChatOpen)}
        />

        {/* Theme Preference Panel */}
        <ThemePreference
          isOpen={isThemePreferenceOpen}
          onClose={() => setIsThemePreferenceOpen(false)}
          currentTheme={themePreference}
          onThemeChange={setThemePreference}
        />

        {/* Demo Video Player */}
        <DemoVideoPlayer
          isOpen={isDemoVideoOpen}
          onClose={() => setIsDemoVideoOpen(false)}
        />
      </main>
    </>
  );
}
