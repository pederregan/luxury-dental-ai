'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { CardSkeleton, TextBlockSkeleton, Skeleton } from './skeleton';
import { LoadingSpinner } from './progressive-image';

interface LoadingStateProps {
  isLoading: boolean;
  children: ReactNode;
  skeleton?: ReactNode;
  delay?: number;
}

// Generic loading state wrapper
export function LoadingState({
  isLoading,
  children,
  skeleton,
  delay = 0
}: LoadingStateProps) {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay }}
        >
          {skeleton || <LoadingSpinner />}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Cards Grid Loading
export function CardsGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <CardSkeleton />
        </motion.div>
      ))}
    </div>
  );
}

// Hero Section Skeleton
export function HeroSkeleton() {
  return (
    <div className="grid md:grid-cols-12 gap-10 items-center">
      <div className="md:col-span-7 space-y-6">
        <Skeleton variant="text" className="h-12 w-3/4" />
        <Skeleton variant="text" className="h-12 w-5/6" />
        <Skeleton variant="text" className="h-12 w-2/3" />
        <TextBlockSkeleton lines={2} />
        <div className="flex gap-3">
          <Skeleton variant="button" className="h-12 w-48" />
          <Skeleton variant="button" className="h-12 w-48" />
        </div>
      </div>
      <div className="md:col-span-5">
        <Skeleton variant="card" className="aspect-[4/3]" />
      </div>
    </div>
  );
}

// Form Loading State
export function FormSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <Skeleton variant="text" className="h-3 w-24 mb-2" />
            <Skeleton variant="default" className="h-12 w-full rounded-xl" />
          </div>
        ))}
      </div>
      <div className="text-center">
        <Skeleton variant="button" className="h-12 w-40 mx-auto" />
      </div>
    </div>
  );
}

// Success Stories Skeleton
export function SuccessStoriesSkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-2xl border border-[#1a365d]/10 bg-white/70 overflow-hidden"
        >
          <Skeleton variant="default" className="aspect-video" />
          <div className="p-6">
            <Skeleton variant="text" className="h-5 w-3/4" />
            <Skeleton variant="text" className="h-4 w-full mt-2" />
            <Skeleton variant="text" className="h-3 w-24 mt-3" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Inline Loading Indicator
export function InlineLoader({ text = "Loading" }: { text?: string }) {
  return (
    <div className="flex items-center gap-2">
      <LoadingSpinner size="sm" />
      <motion.span
        className="text-sm text-[#2d3748]/60"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {text}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        >
          .
        </motion.span>
      </motion.span>
    </div>
  );
}

// Button Loading State
export function ButtonLoadingState({
  isLoading,
  children,
  loadingText = "Processing"
}: {
  isLoading: boolean;
  children: ReactNode;
  loadingText?: string;
}) {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoadingSpinner size="sm" />
          <span>{loadingText}</span>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
