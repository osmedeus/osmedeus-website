## Osmedeus Website

![Osmedeus Website](./static/www.png)

## Architecture

This is the landing page for Osmedeus, a security orchestration engine. Built with:
- **Next.js 15** with App Router (src/app/)
- **Tailwind CSS 4** with PostCSS
- **Framer Motion** for animations
- **next-themes** for dark/light mode (dark is default)

## Commands

```bash
bun dev          # Start development server (http://localhost:3000)
bun run build    # Production build
bun run lint     # Run ESLint
bun start        # Start production server
```

### Project Structure

- `src/app/` - Next.js App Router pages and global styles
- `src/components/sections/` - Page sections (hero, features, how-it-works, code-example, installation, footer)
- `src/components/ui/` - Reusable UI components (Shadcn/UI base + Aceternity UI effects)
- `src/components/navbar.tsx` - Site navigation
- `src/lib/utils.ts` - Utility functions (cn for class merging)

### UI Component Pattern

Components in `src/components/ui/` follow two patterns:
1. **Shadcn/UI** (button, card, tabs, badge, separator) - Standard accessible components using Radix primitives
2. **Aceternity UI** (aurora-background, moving-border, spotlight, text-generate-effect) - Premium visual effects with animations

All interactive/animated components use `"use client"` directive.

### Path Aliases

Uses `@/*` alias mapping to `./src/*` (configured in tsconfig.json).
