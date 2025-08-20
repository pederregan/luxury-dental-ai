# Video Background Feature Guide

## Overview
The hero section now includes an optional video background that adds visual depth and engagement while maintaining accessibility and performance standards.

## Features

### 🎬 Video Controls
- **Toggle Button**: Enable/disable video background (top-right corner)
- **Play/Pause**: Control video playback when active
- **Mute/Unmute**: Audio control for the background video
- **Smooth Transitions**: Elegant fade in/out animations

### ♿ Accessibility Features
- **Reduced Motion Support**: Automatically disabled for users with motion sensitivity
- **Keyboard Navigation**: All controls are keyboard accessible
- **ARIA Labels**: Proper screen reader support
- **Visual Indicators**: Clear button states and tooltips

### 🎨 Design Integration
- **Text Readability**: Semi-transparent overlay ensures content remains legible
- **Apple-style Controls**: Consistent with the overall design language
- **Responsive Design**: Works across all device sizes
- **Performance Optimized**: Lazy loading and efficient video handling

## Technical Implementation

### Video Sources
- Primary: Professional medical/technology footage from Pixabay
- Fallback: Multiple source formats for browser compatibility
- Playback: Slower speed (0.7x) for elegant, calming effect

### Performance Optimizations
- **Conditional Loading**: Video only loads when enabled
- **Reduced Opacity**: 30% opacity to maintain focus on content
- **Backdrop Blur**: Subtle blur effect for text readability
- **Auto-pause**: Respects browser autoplay policies

### Accessibility Compliance
- **WCAG Guidelines**: Follows WCAG AA standards
- **Motion Preferences**: Respects `prefers-reduced-motion`
- **Keyboard Support**: Full keyboard navigation
- **Screen Readers**: Proper ARIA labeling

## User Experience

### Default State
- Video background is **disabled by default**
- Users can opt-in by clicking the video toggle button
- Graceful fallback to animated background elements

### Control Behavior
1. **Video Toggle**: Enables/disables the entire video background
2. **Play/Pause**: Controls playback of the active video
3. **Mute/Unmute**: Controls audio (starts muted by default)
4. **Reduced Motion**: Shows informational notice when disabled

### Browser Support
- **Modern Browsers**: Full video support
- **Older Browsers**: Graceful degradation to animated backgrounds
- **Mobile Devices**: Optimized for touch interactions

## Implementation Details

### State Management
```typescript
const [showVideoBackground, setShowVideoBackground] = useState(false);
const [isVideoPlaying, setIsVideoPlaying] = useState(true);
const [isVideoMuted, setIsVideoMuted] = useState(true);
```

### Motion Preference Detection
```typescript
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
setPrefersReducedMotion(mediaQuery.matches);
```

### Video Configuration
- **Format**: MP4 with multiple source options
- **Attributes**: `autoPlay`, `muted`, `loop`, `playsInline`
- **Optimization**: Reduced playback rate for elegance
- **Accessibility**: `aria-hidden="true"` for background videos

## Future Enhancements
- [ ] Video upload functionality for custom backgrounds
- [ ] Multiple video options/themes
- [ ] Video quality selection
- [ ] Integration with user preferences/settings
- [ ] Analytics for video engagement tracking
