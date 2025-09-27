# Marlagos Tourism Website - Design Guidelines

## Design Approach
**Reference-Based Approach** - Inspired by Airbnb's destination pages and Visit Portugal tourism sites, emphasizing stunning photography with seamless property integration and intuitive navigation.

## Core Design Elements

### A. Color Palette
**Light Mode:**
- Primary: #1E40AF (ocean blue) 
- Secondary: #0EA5E9 (wave blue)
- Accent: #F59E0B (sunset orange) 
- Background: #FAFAFA (sand white)
- Text: #1F2937 (charcoal)
- Success: #10B981 (coastal green)

**Dark Mode:**
- Primary: #3B82F6 (lighter ocean blue)
- Secondary: #0EA5E9 (wave blue)
- Accent: #FBBF24 (brighter sunset)
- Background: #111827 (deep navy)
- Text: #F9FAFB (off-white)
- Success: #34D399 (coastal green)

### B. Typography
- **Primary:** Montserrat (headings, logo, CTAs)
- **Secondary:** Open Sans (body text, descriptions)
- **Sizes:** Scale from 14px body to 48px hero headlines
- **Weights:** Regular (400), Medium (500), Bold (700)

### C. Layout System
**Tailwind Spacing Units:** Primary spacing of 4, 8, 12, 16 units
- Containers: max-w-7xl with px-4 margins
- Section spacing: py-16 for major sections, py-8 for subsections
- Card spacing: p-6 for content cards
- Grid gaps: gap-6 for property listings, gap-4 for smaller elements

### D. Component Library

**Navigation:**
- Fixed header with transparent-to-solid transition on scroll
- Marlagos wave logo (blue wave design as specified)
- Horizontal navigation with coastal blue hover states

**Hero Sections:**
- Large hero images (100vh) with gradient overlays (ocean blue to transparent)
- Centered text with blur-background buttons (variant="outline")
- Property hero images at 60vh height

**Cards:**
- Property cards with rounded corners, subtle shadows
- Image carousels with dot indicators
- Pricing overlays with coastal green success states

**Interactive Elements:**
- Google Maps integration with custom markers
- Image galleries with lightbox functionality
- Booking CTAs using sunset orange accent color
- Review stars using success green

**Forms:**
- Consistent dark mode implementation
- Ocean blue focus states
- Rounded input fields with subtle borders

### E. Page Structure

**Homepage:**
- Hero: Full-screen Lagos scenic overview with Marlagos logo
- Featured Properties: 2-card showcase (Duplex & Studio)
- Local Highlights: 3-column grid with activity previews
- CTA Section: Visit/Book call-to-action

**Property Pages:**
- Hero gallery with 5-image grid layout
- Details sidebar with amenities and booking
- Location map integration
- Reviews section with star ratings

**Guide Pages:**
- Content sections with embedded maps
- Activity cards with provider information
- Historical timeline with coastal-themed design
- Transportation hub with practical information

## Images
- **Hero Images:** Large scenic photos of Lagos beaches, cliffs, and town views
- **Property Photos:** High-quality interior/exterior shots for both rentals
- **Activity Images:** Water sports, hiking trails, local attractions
- **Background Elements:** Subtle wave patterns and coastal textures
- **Logo:** Custom Marlagos wave design in primary blue

**Image Treatment:**
- Rounded corners on content images (8px radius)
- Gradient overlays on hero images for text readability
- Consistent aspect ratios: 16:9 for heroes, 4:3 for property cards

The design emphasizes visual storytelling through photography while maintaining clean, functional layouts that guide users naturally from discovery to booking.