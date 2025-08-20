# Accessibility Guide - DSM Solutions Website

## Keyboard Navigation Features

### Global Keyboard Shortcuts

| Key Combination | Action |
|----------------|--------|
| `Tab` | Navigate through focusable elements |
| `Shift + Tab` | Navigate backwards through elements |
| `Enter` / `Space` | Activate buttons and links |
| `Escape` | Close modals or reset focus |
| `Alt + H` | Quick scroll to top of page |

### Skip Links

- **Skip to main content**: Press `Tab` on page load to access skip link
- Allows screen reader users to bypass navigation

### Navigation Header

- **Full keyboard navigation** with arrow key support
- **Focus indicators** with high contrast ring
- **ARIA labels** for screen reader support
- **Role attributes** for proper semantic structure

### Feature Carousel

- **Arrow key navigation**: Use `←` and `→` to browse features
- **Enter/Space**: Open feature details modal
- **Escape**: Close modal
- **Focus management**: Proper focus cycling through cards
- **ARIA live regions** for dynamic content updates

### Form Controls

- **Tab navigation** through all form fields
- **Clear focus indicators** with color-coded rings
- **Form validation** with accessible error messages
- **Label associations** for screen readers

### Interactive Elements

- **Button focus states** with visible outlines
- **Hover and active states** for all interactive elements
- **Loading states** with proper ARIA attributes
- **Motion preferences** respected for animations

## ARIA Support

### Semantic HTML
- Proper heading hierarchy (h1 → h2 → h3)
- Landmark roles (navigation, main, complementary)
- List semantics for carousel items

### ARIA Labels
- Descriptive labels for all interactive elements
- Status updates for dynamic content
- Modal dialog support with proper focus trapping

### Screen Reader Support
- Alternative text for icons
- Hidden text for context ("Use arrow keys to navigate")
- Proper form labeling and validation messages

## Focus Management

### Visual Indicators
- High contrast focus rings
- Color-coded focus states (blue for navigation, gold for forms)
- Consistent focus behavior across all components

### Focus Trapping
- Modal dialogs trap focus within the dialog
- Escape key returns focus to triggering element
- Tab cycling within modal boundaries

## Color and Contrast

### Accessibility Standards
- WCAG AA compliant color contrast ratios
- Focus indicators meet contrast requirements
- Error states use both color and text indicators

### Color Independence
- Information never conveyed by color alone
- Focus states use shape and contrast, not just color
- Status indicators include text labels

## Testing

### Keyboard Testing
1. Navigate entire site using only keyboard
2. Verify all interactive elements are reachable
3. Test modal interactions and focus trapping
4. Confirm skip links work properly

### Screen Reader Testing
- Test with NVDA, JAWS, or VoiceOver
- Verify proper announcement of dynamic content
- Check heading navigation and landmark identification

## Implementation Notes

### CSS Classes
```css
/* Focus visible styles */
*:focus-visible {
  @apply ring-2 ring-[#1a365d] ring-offset-2 ring-offset-white rounded-md;
}

/* Skip to content link */
.skip-to-content {
  @apply absolute left-[-9999px] z-[100] bg-[#1a365d] text-white px-4 py-2 rounded-md;
}

.skip-to-content:focus {
  @apply left-4 top-4;
}
```

### JavaScript Event Handlers
- Global keyboard event listener for shortcuts
- Modal focus management with `autoFocus` and `tabIndex`
- Arrow key navigation in carousel components
- Escape key handling for modal dismissal

## Browser Support

### Modern Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Assistive Technology
- NVDA 2020.4+
- JAWS 2021+
- VoiceOver (macOS/iOS)
- Dragon NaturallySpeaking

## Future Enhancements

1. **Voice Control**: Add support for voice navigation commands
2. **High Contrast Mode**: Implement Windows high contrast theme support
3. **Reduced Motion**: Add preference detection for motion-sensitive users
4. **Magnification**: Ensure compatibility with screen magnification tools
