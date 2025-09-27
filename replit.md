# Marlagos Tourism Website

## Overview

Marlagos is a tourism website showcasing Lagos, Portugal, with integrated vacation rental properties and activity booking. The platform serves as a comprehensive travel guide combining property listings (inspired by Airbnb), local activities, historical information, and practical travel resources. Built as a full-stack web application with a focus on stunning visual presentation and seamless user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side navigation
- **UI Framework**: Custom component library based on Radix UI primitives with shadcn/ui styling
- **Styling**: Tailwind CSS with custom design system featuring ocean-inspired color palette
- **State Management**: TanStack React Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express server
- **API Design**: RESTful API with dedicated routes for properties, activities, bookings, and contacts
- **Calendar Integration**: iCal service for Airbnb calendar synchronization
- **File Structure**: Monorepo structure with shared types and schemas

### Component Design System
- **Design Approach**: Reference-based design inspired by Airbnb destination pages
- **Typography**: Montserrat for headings, Open Sans for body text
- **Color Scheme**: Ocean blue primary (#1E40AF), wave blue secondary (#0EA5E9), sunset orange accent (#F59E0B)
- **Layout**: Responsive design with max-width containers and consistent spacing scale

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL with Neon serverless connection
- **Schema**: Relational design with properties, activities, bookings, contacts, and availability tables
- **Validation**: Zod schemas for runtime type checking and API validation

### Key Features
- **Property Management**: Vacation rental listings with image galleries, amenities, and booking integration
- **Activity Booking**: Local activity listings with categories, difficulty levels, and participant limits
- **Calendar Synchronization**: Real-time availability sync with Airbnb iCal feeds
- **Contact System**: Inquiry forms for customer communication
- **Location Guide**: Comprehensive travel information including transportation and local attractions

## External Dependencies

### Database Services
- **Neon**: Serverless PostgreSQL database hosting
- **Connection Pooling**: @neondatabase/serverless for optimized database connections

### Calendar Integration
- **Airbnb iCal**: Direct calendar feed integration for property availability
- **iCal Parser**: Custom parsing service for calendar event processing

### UI Component Libraries
- **Radix UI**: Unstyled, accessible UI primitives for complex components
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Touch-friendly carousel component for image galleries

### Development Tools
- **Vite**: Fast build tool with HMR and plugin ecosystem
- **TypeScript**: Type safety across client and server code
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment plugins and error handling

### Styling and Assets
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **PostCSS**: CSS processing with autoprefixer
- **Google Fonts**: Web fonts for typography (Montserrat, Open Sans, DM Sans)
- **Generated Images**: AI-generated images stored in attached_assets directory

### Form and Data Handling
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation for forms and API endpoints
- **Date-fns**: Date manipulation and formatting utilities