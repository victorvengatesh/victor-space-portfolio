# Codex Project Instructions

## Goal
Maintain a cinematic space-themed portfolio for M. Victor Vengatesh. The experience must feel premium, interactive and technically impressive—not like a generic template.

## Stack
- React 19 + TypeScript
- Vite
- Three.js through React Three Fiber and Drei
- Framer Motion
- Plain CSS for the visual system

## Design rules
- Preserve the dark space aesthetic, cyan/violet/pink energy accents and glass HUD interface.
- Keep at least one meaningful 3D interaction visible on every viewport.
- Keep mobile performance strong: capped DPR, no large image textures, procedural geometry preferred.
- Every new animation must support `prefers-reduced-motion`.
- Maintain semantic HTML, keyboard-accessible controls and readable contrast.
- Avoid generic card grids unless they are visually integrated into the space mission concept.

## Validation
After changes, always run:

```bash
npm run build
```

Fix all TypeScript and build errors before finishing.
