'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

// Fade in animation variants
export const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }
  }
};

// Scale up animation variants
export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }
  }
};

// Slide in from left
export const slideLeftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }
  }
};

// Slide in from right
export const slideRightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }
  }
};

// Stagger children animations
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Animated section wrapper with fade-in
export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  threshold = 0.2,
  id,
  ...props
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  id?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Parallax scroll effect component
export function ParallaxSection({
  children,
  className = "",
  offset = 50
}: {
  children: ReactNode;
  className?: string;
  offset?: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated card with hover effect
export function AnimatedCard({
  children,
  className = "",
  index = 0
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Text reveal animation
export function AnimatedText({
  children,
  className = "",
  delay = 0,
  as: Component = 'div' as React.ElementType
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <Component
      ref={ref}
      className={className}
    >
      {children}
    </Component>
  );
}

// Number counter animation
export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className = ""
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      {isInView && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {prefix}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {value.toLocaleString()}
          </motion.span>
          {suffix}
        </motion.span>
      )}
    </motion.div>
  );
}
