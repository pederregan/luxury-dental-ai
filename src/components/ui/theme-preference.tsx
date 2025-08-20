'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '@/components/icons';

type ThemePreference = 'light' | 'dark' | 'system';

interface ThemePreferenceProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemePreference;
  onThemeChange: (theme: ThemePreference) => void;
}

export function ThemePreference({ isOpen, onClose, currentTheme, onThemeChange }: ThemePreferenceProps) {
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const themeOptions = [
    {
      value: 'light' as const,
      label: 'Light',
      description: 'Clean and bright interface',
      icon: Icons.Sun
    },
    {
      value: 'dark' as const,
      label: 'Dark',
      description: 'Easy on the eyes in low light',
      icon: Icons.Moon
    },
    {
      value: 'system' as const,
      label: 'System',
      description: `Follow system preference (${systemTheme})`,
      icon: Icons.Building // Using building as a placeholder for system
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/20 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Theme Preference Panel */}
          <motion.div
            className="fixed top-20 right-6 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 w-72"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Theme Preference
              </h3>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none"
              >
                <Icons.X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-2">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = currentTheme === option.value;

                return (
                  <motion.button
                    key={option.value}
                    onClick={() => onThemeChange(option.value)}
                    className={`w-full p-3 rounded-xl border-2 transition-all duration-200 text-left focus:outline-none ${
                      isSelected
                        ? 'border-[#1a365d] dark:border-[#d4af37] bg-[#1a365d]/5 dark:bg-[#d4af37]/5'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        isSelected
                          ? 'bg-[#1a365d] dark:bg-[#d4af37] text-white dark:text-[#1a365d]'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {option.label}
                          </span>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-[#1a365d] dark:bg-[#d4af37] rounded-full"
                            />
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Your theme preference is saved locally and will persist across visits.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
