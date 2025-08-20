'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ImageSkeleton } from './skeleton';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  priority?: boolean;
  onLoad?: () => void;
}

export function ProgressiveImage({
  src,
  alt,
  className,
  containerClassName,
  aspectRatio = "16/9",
  priority = false,
  onLoad
}: ProgressiveImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Create a new image to preload
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
      onLoad?.();
    };

    img.onerror = () => {
      setError(true);
      // Fallback to a placeholder image
      setImageSrc('/api/placeholder/800/600');
    };

    // Clean up
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad]);

  return (
    <div
      className={cn("relative overflow-hidden", containerClassName)}
      style={{ aspectRatio }}
    >
      <AnimatePresence mode="wait">
        {!imageLoaded && !error && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <ImageSkeleton className="w-full h-full" aspectRatio={aspectRatio} />
          </motion.div>
        )}

        {imageSrc && (
          <motion.img
            key="image"
            src={imageSrc}
            alt={alt}
            className={cn(
              "w-full h-full object-cover",
              className
            )}
            initial={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
            animate={{
              opacity: 1,
              filter: 'blur(0px)',
              scale: 1,
            }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.4, 0.25, 1]
            }}
            loading={priority ? "eager" : "lazy"}
          />
        )}

        {error && (
          <motion.div
            key="error"
            className="absolute inset-0 flex items-center justify-center bg-[#1a365d]/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-[#1a365d]/10 mx-auto mb-2" />
              <p className="text-xs text-[#2d3748]/40">Image unavailable</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Loading Spinner Component
export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  return (
    <motion.div
      className={cn(
        "rounded-full border-2 border-[#1a365d]/20 border-t-[#d4af37]",
        sizeClasses[size]
      )}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        ease: "linear",
        repeat: Infinity
      }}
    />
  );
}

// Page Loading Overlay
export function PageLoadingOverlay({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <motion.p
              className="mt-4 text-sm text-[#2d3748]/60"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
