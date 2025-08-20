'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '@/components/icons';

interface Chapter {
  id: string;
  title: string;
  description: string;
  startTime: number;
  duration: number;
  keyFeatures: string[];
}

interface DemoVideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoVideoPlayer({ isOpen, onClose }: DemoVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dental practice workflow chapters - memoized for performance
  const chapters: Chapter[] = useMemo(() => [
    {
      id: 'scheduling',
      title: '1. Scheduling & Front Desk',
      description: 'AI handles appointment booking, insurance verification, and patient check-in',
      startTime: 0,
      duration: 45,
      keyFeatures: ['24/7 Appointment Booking', 'Insurance Verification', 'Patient Check-in Automation', 'Cancellation Management']
    },
    {
      id: 'examination',
      title: '2. Patient Examination',
      description: 'AI assists with patient history, treatment planning, and clinical documentation',
      startTime: 45,
      duration: 50,
      keyFeatures: ['Medical History Review', 'Treatment Plan Generation', 'Clinical Note Taking', 'X-ray Analysis Support']
    },
    {
      id: 'treatment',
      title: '3. Treatment & Procedures',
      description: 'AI optimizes treatment workflows and patient communication during procedures',
      startTime: 95,
      duration: 45,
      keyFeatures: ['Procedure Scheduling', 'Patient Education', 'Treatment Coordination', 'Real-time Updates']
    },
    {
      id: 'follow-up',
      title: '4. Follow-up & Care',
      description: 'AI manages post-treatment care, recalls, and ongoing patient relationships',
      startTime: 140,
      duration: 40,
      keyFeatures: ['Automated Recall Campaigns', 'Post-care Instructions', 'Patient Satisfaction Tracking', 'Reactivation Outreach']
    }
  ], []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);

      // Auto-advance chapters
      const activeChapter = chapters.findIndex(chapter =>
        video.currentTime >= chapter.startTime &&
        video.currentTime < chapter.startTime + chapter.duration
      );

      if (activeChapter !== -1 && activeChapter !== currentChapter) {
        setCurrentChapter(activeChapter);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [chapters, currentChapter]);

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isPlaying && showControls) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const seekToChapter = (chapterIndex: number) => {
    const video = videoRef.current;
    if (!video) return;

    const chapter = chapters[chapterIndex];
    video.currentTime = chapter.startTime;
    setCurrentChapter(chapterIndex);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;

    video.currentTime = newTime;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Video Player */}
          <motion.div
            ref={containerRef}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 bg-black rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            onMouseMove={() => setShowControls(true)}
          >
            {/* Video */}
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="/api/placeholder/1920/1080"
              >
                {/* Dental practice workflow videos - scheduling to follow-up care */}
                <source
                  src="https://videos.pexels.com/video-files/1093133/1093133-hd_1920_1080_30fps.mp4"
                  type="video/mp4"
                />
                <source
                  src="https://videos.pexels.com/video-files/4490548/4490548-uhd_2560_1440_25fps.mp4"
                  type="video/mp4"
                />
                <source
                  src="https://videos.pexels.com/video-files/4490311/4490311-uhd_2560_1440_25fps.mp4"
                  type="video/mp4"
                />
                <source
                  src="https://videos.pexels.com/video-files/3024322/3024322-hd_1920_1080_30fps.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              {/* Controls Overlay */}
              <AnimatePresence>
                {showControls && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Top Controls */}
                    <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
                      <div>
                        <h2 className="text-white text-xl font-semibold mb-1">
                          Dental Practice Workflow with DSM AI
                        </h2>
                        <p className="text-white/80 text-sm">
                          {chapters[currentChapter]?.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <motion.button
                          onClick={toggleFullscreen}
                          className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors focus:outline-none"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icons.Building className="h-5 w-5 text-white" />
                        </motion.button>
                        <motion.button
                          onClick={onClose}
                          className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors focus:outline-none"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icons.X className="h-5 w-5 text-white" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Center Play Button */}
                    {!isPlaying && (
                      <motion.button
                        onClick={togglePlayPause}
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                      >
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                          <Icons.Play className="h-8 w-8 text-white ml-1" />
                        </div>
                      </motion.button>
                    )}

                    {/* Bottom Controls */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      {/* Progress Bar */}
                      <div
                        className="w-full h-2 bg-white/20 rounded-full mb-4 cursor-pointer"
                        onClick={handleProgressClick}
                      >
                        <div
                          className="h-full bg-white rounded-full transition-all duration-100"
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                        />

                        {/* Chapter Markers */}
                        {chapters.map((chapter, index) => (
                          <div
                            key={chapter.id}
                            className="absolute top-0 h-full w-0.5 bg-yellow-400"
                            style={{ left: `${(chapter.startTime / duration) * 100}%` }}
                          />
                        ))}
                      </div>

                      {/* Control Bar */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <motion.button
                            onClick={togglePlayPause}
                            className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors focus:outline-none"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {isPlaying ? (
                              <Icons.Pause className="h-5 w-5 text-white" />
                            ) : (
                              <Icons.Play className="h-5 w-5 text-white" />
                            )}
                          </motion.button>

                          <span className="text-white text-sm">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </span>
                        </div>

                        <div className="text-white text-sm">
                          Chapter {currentChapter + 1} of {chapters.length}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Chapter Navigation Sidebar */}
            <motion.div
              className="absolute top-0 right-0 w-80 h-full bg-black/90 backdrop-blur-sm border-l border-white/10"
              initial={{ x: 320 }}
              animate={{ x: showControls ? 0 : 320 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6">
                <h3 className="text-white text-lg font-semibold mb-4">
                  Dental Practice Workflow
                </h3>

                <div className="space-y-3">
                  {chapters.map((chapter, index) => (
                    <motion.button
                      key={chapter.id}
                      onClick={() => seekToChapter(index)}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-200 focus:outline-none ${
                        index === currentChapter
                          ? 'bg-[#1a365d] text-white'
                          : 'bg-white/10 hover:bg-white/20 text-white/80'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{chapter.title}</span>
                        <span className="text-xs opacity-70">
                          {formatTime(chapter.startTime)}
                        </span>
                      </div>
                      <p className="text-xs opacity-70 mb-2">
                        {chapter.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {chapter.keyFeatures.map((feature, i) => (
                          <span
                            key={i}
                            className="text-xs bg-white/20 px-2 py-1 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
