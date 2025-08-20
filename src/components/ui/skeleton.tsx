'use client';

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'card' | 'text' | 'avatar' | 'button';
  animate?: boolean;
}

function Skeleton({
  className,
  variant = 'default',
  animate = true,
  ...props
}: SkeletonProps) {
  const baseClasses = "relative overflow-hidden bg-[#1a365d]/5";

  const variantClasses = {
    default: "rounded-md",
    card: "rounded-2xl",
    text: "rounded h-4 w-full",
    avatar: "rounded-full",
    button: "rounded-full"
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {animate && (
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            translateX: ["100%", "200%"],
          }}
          transition={{
            duration: 1.5,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        />
      )}
    </div>
  );
}

// Card Skeleton
export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#1a365d]/10 bg-white/70 p-6">
      <Skeleton variant="avatar" className="h-10 w-10" />
      <Skeleton variant="text" className="mt-4 h-6 w-3/4" />
      <Skeleton variant="text" className="mt-2 h-4 w-full" />
      <div className="mt-4 space-y-2">
        <Skeleton variant="text" className="h-3 w-5/6" />
        <Skeleton variant="text" className="h-3 w-4/6" />
        <Skeleton variant="text" className="h-3 w-5/6" />
      </div>
    </div>
  );
}

// Image Skeleton with aspect ratio
export function ImageSkeleton({
  className,
  aspectRatio = "16/9"
}: {
  className?: string;
  aspectRatio?: string;
}) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl bg-[#1a365d]/5", className)}
      style={{ aspectRatio }}
    >
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          translateX: ["100%", "200%"],
        }}
        transition={{
          duration: 2,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="h-12 w-12 rounded-full bg-[#1a365d]/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  );
}

// Text Block Skeleton
export function TextBlockSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={cn(
            "h-4",
            i === lines - 1 && "w-4/5",
            i === 0 && "h-6 w-3/4"
          )}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}

// Stats Skeleton
export function StatsSkeleton() {
  return (
    <div className="rounded-2xl border border-[#1a365d]/10 bg-white/60 p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <Skeleton variant="text" className="h-8 w-20 mx-auto" />
            <Skeleton variant="text" className="h-3 w-24 mx-auto mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export { Skeleton };
