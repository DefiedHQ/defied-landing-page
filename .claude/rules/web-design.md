# Web Design & Accessibility

- Use semantic HTML (`nav`, `main`, `section`, `article`, `button`) — not divs for everything.
- Ensure focus states are visible for keyboard navigation.
- Forms: associate labels with inputs, show validation inline, support keyboard submission.
- Animations: respect `prefers-reduced-motion`. Keep transitions under 300ms for UI feedback.
- Images: always include `alt` text, use `width`/`height` to prevent layout shift.
- Touch targets: minimum 44x44px on mobile.
- Color contrast: meet WCAG AA (4.5:1 for text, 3:1 for large text).
