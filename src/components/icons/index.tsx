// Custom Apple-style icon library for DSM Solutions
// All icons maintain consistent 1.5px stroke width and minimalist design

export const Icons = {
  // Feature Icons (Already in carousel)
  PatientAcquisition: ({ className = "" }: { className?: string }) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="24" cy="24" r="2" fill="currentColor"/>
      <path d="M24 4V8M24 40V44M4 24H8M40 24H44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),

  MultiLocation: ({ className = "" }: { className?: string }) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="12" width="16" height="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="28" y="12" width="16" height="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="16" y="28" width="16" height="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 22V24C12 24 12 28 16 28M36 22V24C36 24 36 28 32 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="17" r="1.5" fill="currentColor"/>
      <circle cx="36" cy="17" r="1.5" fill="currentColor"/>
      <circle cx="24" cy="33" r="1.5" fill="currentColor"/>
    </svg>
  ),

  Integrations: ({ className = "" }: { className?: string }) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M24 8L24 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 24L40 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="24" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="24" cy="40" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="8" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="40" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),

  Security: ({ className = "" }: { className?: string }) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M24 4L8 12V24C8 32 12 40 24 44C36 40 40 32 40 24V12L24 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 24L22 28L30 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Automation: ({ className = "" }: { className?: string }) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M24 4L30 10L24 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M30 10H16C10 10 6 14 6 20V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M24 44L18 38L24 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 38H32C38 38 42 34 42 28V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),

  Analytics: ({ className = "" }: { className?: string }) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 40V28M16 40V20M24 40V24M32 40V16M40 40V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 28L16 20L24 24L32 16L40 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="8" cy="28" r="2" fill="currentColor"/>
      <circle cx="16" cy="20" r="2" fill="currentColor"/>
      <circle cx="24" cy="24" r="2" fill="currentColor"/>
      <circle cx="32" cy="16" r="2" fill="currentColor"/>
      <circle cx="40" cy="8" r="2" fill="currentColor"/>
    </svg>
  ),

  // Hero Section Icons
  TrendingUp: ({ className = "" }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 7H21V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Building: ({ className = "" }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="2" width="16" height="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="8" y="6" width="3" height="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="13" y="6" width="3" height="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="8" y="12" width="3" height="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="13" y="12" width="3" height="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 22V18H14V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Users: ({ className = "" }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="17" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 21V19C3 17 5 15 9 15C13 15 15 17 15 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 15C15 15 17 15 17 15C21 15 21 17 21 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Trust & Compliance Icons
  Shield: ({ className = "" }: { className?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 2L3 5V10C3 14 5 17 10 18C15 17 17 14 17 10V5L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Award: ({ className = "" }: { className?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="10" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 13L6 18L10 16L14 18L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Lock: ({ className = "" }: { className?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="5" y="9" width="10" height="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 9V6C7 4 8 3 10 3C12 3 13 4 13 6V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="10" cy="13" r="1" fill="currentColor"/>
    </svg>
  ),

  Activity: ({ className = "" }: { className?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2 10H6L8 4L12 16L14 10H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Dental Specialty Icons
  GeneralDentistry: ({ className = "" }: { className?: string }) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M24 8C24 8 20 4 16 4C12 4 8 8 8 12C8 20 12 28 16 36C18 40 20 44 24 44C28 44 30 40 32 36C36 28 40 20 40 12C40 8 36 4 32 4C28 4 24 8 24 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 12V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 16H28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),

  Orthodontics: ({ className = "" }: { className?: string }) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 20C8 20 12 16 24 16C36 16 40 20 40 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 28C8 28 12 32 24 32C36 32 40 28 40 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="12" y="18" width="4" height="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="22" y="18" width="4" height="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="32" y="18" width="4" height="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 18V26M24 18V26M34 18V26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),

  Periodontics: ({ className = "" }: { className?: string }) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M24 16C24 16 22 12 18 12C14 12 12 14 12 18C12 22 14 26 16 30C17 32 20 36 24 36C28 36 31 32 32 30C34 26 36 22 36 18C36 14 34 12 30 12C26 12 24 16 24 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="16" cy="38" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="24" cy="40" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="32" cy="38" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16 36V38M24 36V40M32 36V38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),

  // Additional UI Icons
  Check: ({ className = "" }: { className?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  X: ({ className = "" }: { className?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 6L14 14M14 6L6 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Phone: ({ className = "" }: { className?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 8C3 5 5 3 8 3H12C15 3 17 5 17 8V14C17 17 15 19 12 19H8C5 19 3 17 3 14V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 7C7 7 8 9 9 10C10 11 12 12 13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Clock: ({ className = "" }: { className?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  ChevronRight: ({ className = "" }: { className?: string }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  ChevronLeft: ({ className = "" }: { className?: string }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  ChevronDown: ({ className = "" }: { className?: string }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Plus: ({ className = "" }: { className?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 5V15M5 10H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Video Control Icons
  Video: ({ className = "" }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 9L20 5V19L16 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  VideoOff: ({ className = "" }: { className?: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M16 16V13C16 12.4477 15.5523 12 15 12H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 3L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 7H5C3.89543 7 3 7.89543 3 9V15C3 16.1046 3.89543 17 5 17H15C16.1046 17 17 16.1046 17 15V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 13L20 9V19L16 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Play: ({ className = "" }: { className?: string }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 2L13 8L3 14V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Pause: ({ className = "" }: { className?: string }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 3V13M10 3V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Volume: ({ className = "" }: { className?: string }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 3L5 6H2V10H5L8 13V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 5C10.6667 5.66667 11 6.33333 11 8C11 9.66667 10.6667 10.3333 10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 3C13.3333 4.33333 14 5.66667 14 8C14 10.3333 13.3333 11.6667 12 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  VolumeOff: ({ className = "" }: { className?: string }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 3L5 6H2V10H5L8 13V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 5L14 9M14 5L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Info: ({ className = "" }: { className?: string }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 6V10M8 4H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Theme Toggle Icons
  Sun: ({ className = "" }: { className?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 2V4M10 16V18M18 10H16M4 10H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.657 4.343L14.243 5.757M5.757 14.243L4.343 15.657M15.657 15.657L14.243 14.243M5.757 5.757L4.343 4.343" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Moon: ({ className = "" }: { className?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M19 10.79C18.25 12.18 16.83 13.31 15.17 13.81C13.51 14.31 11.69 14.16 10.15 13.39C8.61 12.62 7.45 11.28 6.98 9.67C6.51 8.06 6.76 6.31 7.66 4.85C7.95 4.36 8.31 3.93 8.73 3.57C8.14 3.53 7.54 3.61 6.97 3.79C4.5 4.62 2.87 6.96 3.07 9.58C3.27 12.2 5.25 14.39 7.83 14.93C10.41 15.47 12.99 14.24 14.39 12.05C15.79 9.86 15.79 7.04 14.39 4.85C15.14 6.09 15.42 7.56 15.17 9C14.92 10.44 14.16 11.73 13.02 12.64C13.69 12.09 14.18 11.36 14.42 10.54C14.66 9.72 14.63 8.85 14.34 8.05C15.14 8.36 15.82 8.89 16.29 9.58C16.76 10.27 16.99 11.09 16.95 11.92C17.84 11.42 18.54 10.66 18.95 9.74C19.36 8.82 19.45 7.79 19.21 6.82C19.55 7.72 19.65 8.71 19.5 9.67C19.35 10.63 18.95 11.52 18.34 12.26L19 10.79Z" fill="currentColor"/>
    </svg>
  ),

  // Dental Workflow Icons
  Calendar: ({ className = "" }: { className?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 2V6M14 2V6M3 8H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7" cy="11" r="1" fill="currentColor"/>
      <circle cx="10" cy="11" r="1" fill="currentColor"/>
      <circle cx="13" cy="11" r="1" fill="currentColor"/>
      <circle cx="7" cy="14" r="1" fill="currentColor"/>
      <circle cx="10" cy="14" r="1" fill="currentColor"/>
    </svg>
  ),

  Search: ({ className = "" }: { className?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 17L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Tool: ({ className = "" }: { className?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M14.7 6.3C15.1 6.7 15.1 7.3 14.7 7.7L11.4 11L8 7.6L11.3 4.3C11.7 3.9 12.3 3.9 12.7 4.3L14.7 6.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 7.6L2.3 13.3C1.9 13.7 1.9 14.3 2.3 14.7L5.3 17.7C5.7 18.1 6.3 18.1 6.7 17.7L12.4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 2L14 4L17 7L18 5.5C18.5 5 18.5 4 18 3.5L16.5 2C16 1.5 15 1.5 14.5 2L16 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Heart: ({ className = "" }: { className?: string }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M17.5 6.5C17.5 4.01 15.49 2 13 2C11.76 2 10.64 2.64 10 3.67C9.36 2.64 8.24 2 7 2C4.51 2 2.5 4.01 2.5 6.5C2.5 11.5 10 18 10 18S17.5 11.5 17.5 6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};
