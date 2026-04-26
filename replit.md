# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Portfolio Artifact (`artifacts/portfolio`)

React + Vite portfolio for **Mohamad Elyoussef** (cybersecurity student, Ajman University).

### Features
- Galaxy particle canvas background — white dots that repel the cursor with smooth physics
- Cursor glow light that follows the mouse
- Typewriter hero text cycling through roles
- Skill icons grid: click/hover shows animated tooltip with tool name (only real skills used)
- Project cards with gradient mock images and scan-line animation
- Certifications carousel with swipeable cards
- Scroll-reveal animations on every section
- Contact form with success animation
- Responsive design with mobile menu

### Skills included (accurate)
Programming: Python, JavaScript, Kotlin, Java, C#, HTML5, CSS3, SQL
Security Tools: Nmap, Metasploit, Burp Suite, Wireshark
Platforms: Linux, AWS, Android, Unity, Cisco, Packet Tracer

### Projects (7 total)
Car Maintenance App (Kotlin), Cybersecurity Labs, Gaming Website, TechNova Network Design,
Network Simulation, Unity Game, Web Dev Projects

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
