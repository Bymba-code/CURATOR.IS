# Curators Community Landing Page

## Overview

A clean, elegant landing page for the Curators community - a creative movement for digital editors, storytellers, and artists. The application features a sophisticated black and gold aesthetic with gallery photo backgrounds on every page, creating an immersive yet extremely minimalist experience. The design emphasizes progressive disclosure - showing only essential elements initially (main title, slogan, hamburger menu) with details revealed through scrolling. Built with React, TypeScript, and modern UI components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR and optimized production builds
- Wouter for lightweight client-side routing
- React Query (TanStack Query) for server state management and data fetching

**UI Component System**
- Shadcn/ui component library using Radix UI primitives for accessible, unstyled components
- Tailwind CSS for utility-first styling with custom theme configuration
- Class Variance Authority (CVA) for managing component variants
- Design system follows "New York" style preset with custom color palette

**Styling Approach**
- **Extreme Minimalism**: Header contains only hamburger menu (no branding text)
- **Progressive Disclosure**: Stats and detailed content hidden initially, revealed on scroll
- Dark mode by default with pure black backgrounds (#000000)
- Darkened hero overlays (90-95% opacity) for better text contrast
- Custom color palette: Pure Black (#000000), Warm Gold (#D4AF37), Soft White/Gray for text
- NO navy blue or burgundy/red colors - minimal, elegant palette
- **Typography**: Playfair Display for headings, Libre Franklin for body text (sharp, structured aesthetic)
- Reduced title sizes for cleaner presentation (text-8xl instead of text-9xl)
- Tailwind custom theme with HSL color values for flexible theming
- **Structured Design**: NO circular elements - all UI components use rectangular bordered boxes with golden accent lines
- **Golden Accents**: Top/left golden accent bars (`bg-primary/40`) on cards and sections for visual hierarchy
- **Border System**: Consistent border usage (`border-primary/20` or `border-primary/30`) with structured layouts

**Visual Effects & Interactions**
- Scroll-triggered content reveal using React hooks (stats appear after 300px scroll)
- Conditional rendering for progressive disclosure (no empty space when content hidden)
- Smooth transitions and hover states following gallery exhibition patterns
- Custom elevation system (elevate-1, elevate-2) for layered interaction feedback
- Gallery photo backgrounds on all pages (Home, About, Community, Championship, Editors, Resources, Contact)

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript for type safety
- ESM module system throughout the stack
- Custom middleware for request logging and JSON body parsing
- Development and production build separation via esbuild

**Development Tooling**
- TSX for running TypeScript in development
- Esbuild for fast production builds with external package handling
- Vite plugins for Replit integration (runtime error overlay, cartographer, dev banner)

**Routing Strategy**
- API routes prefixed with `/api` for clear separation
- Static file serving through Vite in development
- Server-side rendering setup for HTML template injection

### Data Storage Solutions

**Database Configuration**
- Drizzle ORM as the type-safe database toolkit
- PostgreSQL as the database (via `@neondatabase/serverless` adapter)
- Schema-first approach with Drizzle-Zod integration for runtime validation
- Migration system configured via `drizzle-kit`

**Current Schema**
- Users table with UUID primary keys
- Username/password authentication fields
- Simple in-memory storage implementation (MemStorage) for development/testing
- Interface-based storage design (IStorage) for easy swapping between implementations

**Database Connection**
- Environment variable-based configuration (`DATABASE_URL`)
- Connection pooling through Neon serverless adapter
- Migration files stored in `/migrations` directory

### Authentication and Authorization

**Current Implementation**
- Basic user model with username/password fields
- Storage interface provides user lookup by ID and username
- Session management setup via `connect-pg-simple` for PostgreSQL session store
- Foundation laid for authentication but not yet fully implemented in routes

### Project Structure

**Monorepo Organization**
- `/client` - Frontend React application with Vite
- `/server` - Express backend with TypeScript
- `/shared` - Shared types and schemas (Drizzle, Zod)
- `/attached_assets` - Design guidelines and branding documents
- Path aliases configured for clean imports: `@/` (client), `@shared/` (shared), `@assets/` (assets)

**Component Organization**
- `/client/src/components/ui` - Shadcn UI component library
- `/client/src/components/layout` - Header and mobile navigation (minimal hamburger-only header)
- `/client/src/pages` - Route-level page components (all with gallery backgrounds)
- `/client/src/hooks` - Custom React hooks (mobile detection, toast notifications)
- `/client/src/lib` - Utilities (cn, query client configuration)
- `/client/src/data` - Static data (site stats, social links, menu items, top editors)

## External Dependencies

### UI & Component Libraries
- **Radix UI** - Comprehensive suite of unstyled, accessible component primitives (accordion, dialog, dropdown, select, etc.)
- **Shadcn/ui** - Component system built on Radix UI with Tailwind styling
- **Lucide React** - Icon library for consistent iconography
- **React Icons** - Social media icons (Discord, Facebook, TikTok, Instagram)
- **Embla Carousel** - Touch-friendly carousel/slider component

### Styling & Design
- **Tailwind CSS** - Utility-first CSS framework with custom configuration
- **Class Variance Authority (CVA)** - Type-safe component variant management
- **clsx + tailwind-merge** - Utility for merging Tailwind classes efficiently
- **PostCSS + Autoprefixer** - CSS processing pipeline

### Data Management
- **TanStack Query (React Query)** - Async state management, caching, and data fetching
- **React Hook Form** - Performant form state management
- **Hookform Resolvers** - Validation resolvers for React Hook Form
- **Zod** - TypeScript-first schema validation
- **Drizzle-Zod** - Integration between Drizzle ORM and Zod

### Database & ORM
- **Drizzle ORM** - TypeScript ORM with SQL-like syntax
- **@neondatabase/serverless** - Neon PostgreSQL serverless driver
- **drizzle-kit** - CLI tool for migrations and schema management
- **connect-pg-simple** - PostgreSQL session store for Express

### Development Tools
- **Vite** - Next-generation frontend build tool
- **@vitejs/plugin-react** - Official React plugin for Vite
- **TSX** - TypeScript execution engine for development
- **esbuild** - Fast JavaScript/TypeScript bundler for production builds
- **@replit/vite-plugin-*** - Replit-specific development enhancements (runtime errors, cartographer, dev banner)

### Routing & Navigation
- **Wouter** - Minimalist routing library for React (lightweight alternative to React Router)

### Utilities
- **date-fns** - Modern JavaScript date utility library
- **nanoid** - Tiny, secure URL-friendly unique ID generator

## Recent Changes (October 31, 2025)

**Structured Design System Overhaul (Latest)**
- **Font Change**: Replaced Inter with Libre Franklin for body text (sharper, less-round aesthetic)
- **Removed ALL Circular Elements**: Replaced rounded-full badges, pills, and icons with rectangular bordered boxes
- **Implemented Golden Accent System**:
  - Stats boxes: Top golden accent line (`w-full h-0.5 bg-primary/40`)
  - Level/feature cards: Left golden accent bar (`w-0.5 bg-primary/40`)
  - Bordered boxes throughout: `border-primary/20` or `border-primary/30`
- **Stats Sections**: 3-column grid with bordered boxes, golden top accents, Playfair Display numbers
- **Levels Display**: Rectangular cards with left accent bars, number + name layout
- **Features/Resources**: Bordered boxes with square icon containers (NOT circular)
- **Contact/Social**: Square social icon buttons with hover-elevate effects
- **Championship Rounds**: Bordered boxes with top accent lines, number + name format
- All pages now follow consistent structured design: Home, Community, About, Championship, Editors, Resources, Contact

**Text Size Optimization**
- Reduced ALL text sizes by ~20-25% across entire site for cleaner minimalist aesthetic
- Hero titles: `text-4xl...lg:text-7xl` → `text-3xl...lg:text-6xl`
- Section headings: `text-3xl md:text-4xl` → `text-2xl md:text-3xl`
- Paragraphs: `text-lg` → `text-base`
- Line spacing: `leading-relaxed` → `leading-normal` for tighter, more compact lines
- Stats numbers: `text-3xl md:text-4xl` → `text-2xl md:text-3xl` (smaller, less bold)
- Synced community stats between home and community pages:
  - 50+ active editors
  - 2700+ Discord members  
  - 50M+ total reach
- Changed home page stats grid from 4 columns to 3 columns

**Extreme Minimalism Implementation**
- Removed "CURATORS" branding from header - now shows ONLY hamburger menu
- Implemented scroll-triggered stats reveal (appears after 300px scroll using conditional rendering)
- Increased hero overlay opacity to 90-95% for darker, more dramatic backgrounds
- Added gallery photo backgrounds to ALL pages (not just home)
- Removed all empty space issues by using conditional rendering instead of opacity-only hiding
- Button sizes reduced from px-10/12 py-6/7 to px-6 py-3

**Design Philosophy**
- Show only essential elements on first view: main title, slogan, hamburger menu
- Reveal detailed information progressively through scrolling
- Maximize empty space and visual breathing room
- Minimize text and information density for gallery-like aesthetic
- **Structured over Circular**: Rectangular boxes with borders create professional, gallery-like aesthetic
- **Golden Lines as Hierarchy**: Accent bars (top/left) guide the eye and create visual structure
- **Less is more**: Smaller text creates more refined, elegant presentation

### Design Guidelines Reference
The project includes comprehensive branding documentation defining:
- Museum/gallery aesthetic inspiration
- Color palette and typography system
- Spacing and layout principles
- Component design patterns
- Brand voice and messaging framework