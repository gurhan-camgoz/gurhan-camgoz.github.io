# Portfolio Web App Architecture Plan
## Gürhan Camgöz 

### Project Overview

A comprehensive academic portfolio showcasing research through an interactive web application deployed on GitHub Pages. This platform will serve as both a professional showcase for PhD/job applications and a functional demonstration of the author's skills. 

### Strategic Objectives

**Primary Goals:**
- Demonstrate technical competency in full-stack development and AI/ML implementation
- Provide interactive access for academic and industry evaluators
- Showcase interdisciplinary expertise bridging anthropology and computer science
- Create a living document of research methodology that can be referenced and extended

**Target Audience:**
- PhD program admissions committees
- Industry recruiters in AI/ML and research positions
- Academic collaborators interested in computational anthropology
- Researchers working on AI alignment and human-computer interaction

### Architecture Overview

#### Deployment Strategy: Static Site with Serverless Functions

**GitHub Pages (Frontend Host):**
- Static React SPA built with Vite for optimal performance
- Custom domain: `gurhan-camgoz.github.io`
- Automatic deployment via GitHub Actions on push to main branch
- CDN distribution for global accessibility

**Serverless Backend:**
- Vercel Functions or Netlify Functions for API endpoints
- Stateless architecture with external data persistence
- CORS configuration for cross-origin requests from GitHub Pages
- Environment variables for API keys and sensitive configuration

**Alternative Backend Options:**
- Firebase Functions (Google ecosystem integration)
- AWS Lambda with API Gateway (enterprise-ready scaling)
- Railway/Render for persistent backend if needed

### Frontend Architecture

#### Technology Stack

**Core Framework:**
- React 18 with TypeScript for type safety and maintainability
- Vite for fast development and optimized builds
- React Router for client-side navigation
- Tailwind CSS for responsive, modern styling

**UI Components:**
- Headless UI or Radix UI for accessible, unstyled components
- Framer Motion for smooth animations and micro-interactions
- Recharts for data visualizations (clustering plots, training metrics)
- Monaco Editor for code syntax highlighting and interactive examples

**Data Management:**
- React Query (TanStack Query) for server state management
- Zustand for client state management
- Local storage for user preferences and session data

#### Page Structure and User Experience

**Landing Page (`/`):**
- Hero section with animated introduction 
- Interactive visualizations
- Call-to-action buttons leading to demo, research, and about sections
- Modern glassmorphism design with subtle parallax effects

**Research Overview (`/research`):**
- Interactive timeline of the research
- Expandable sections for each methodology phase
- Embedded charts showing clustering analysis and training metrics
- Download links for thesis PDF and supplementary materials

**Interactive Demo (`/demo`):**
- Live interface simulating the ethnographic feedback collection process
- Pre-loaded examples from the thesis dataset
- Real-time visualization of how feedback maps to vector dimensions
- "Try Your Own" section for custom ethnographic scenarios

**Technical Documentation (`/technical`):**
- Code repositories with syntax-highlighted examples
- Architecture diagrams and system flow visualizations
- Implementation details with collapsible technical sections
- Links to GitHub repositories and Kaggle notebooks

**About & CV (`/about`):**
- Professional biography emphasizing interdisciplinary expertise
- Academic timeline with expandable project descriptions
- Skills matrix with proficiency indicators
- Contact information and social links

#### Responsive Design Considerations

**Mobile-First Approach:**
- Progressive enhancement from mobile to desktop
- Touch-friendly interactive elements
- Collapsible navigation and accordion layouts
- Optimized chart rendering for small screens

**Accessibility Standards:**
- WCAG 2.1 AA compliance
- Semantic HTML structure
- Keyboard navigation support
- Screen reader optimization with ARIA labels

### Backend Architecture

#### API Design Philosophy

**RESTful Endpoints:**
```
GET  /api/research/metrics     - Training metrics and validation data
GET  /api/research/datasets    - Dataset summaries and sample entries
POST /api/demo/evaluate        - Interactive evaluation endpoint
GET  /api/publications         - Academic publications and citations
POST /api/contact              - Contact form submission
```

**GraphQL Alternative:**
- Single endpoint with flexible querying
- Real-time subscriptions for live demo features
- Better suited for complex data relationships

#### Data Management Strategy

**Static Data (Research Artifacts):**
- JSON files hosted directly in GitHub repository
- Training metrics, clustering results, sample datasets
- Cached in browser with service worker for offline access
- Version controlled alongside code for reproducibility

**Dynamic Data (User Interactions):**
- Contact form submissions via serverless function to email service
- Demo interaction logging (anonymized) for research validation
- Optional analytics data collection with user consent

**Privacy-Conscious Implementation:**
- No personal fieldwork data exposure
- Anonymized demo interactions only
- GDPR-compliant data handling
- Clear privacy policy and data usage statements



#### Development Workflow

**Local Development:**
```bash
npm run dev          # Vite dev server with hot reload
npm run build        # Production build with optimization
npm run preview      # Preview production build locally
npm run deploy       # Deploy to GitHub Pages via gh-pages
```

**CI/CD Pipeline:**
- GitHub Actions workflow for automated testing and deployment
- Lighthouse CI for performance and accessibility audits
- Automated dependency updates with Dependabot
- Branch protection rules requiring successful builds

### Content Strategy

#### Academic Credibility

**Research Artifacts:**
- High-resolution versions of all thesis figures and charts
- Interactive versions of static visualizations from the thesis
- Downloadable datasets (privacy-compliant versions)
- Links to GitHub repositories with complete code implementations

**Professional Presentation:**
- Clean, academic design that balances innovation with credibility
- Clear explanation of technical concepts for non-technical evaluators
- Emphasis on methodological rigor and empirical validation
- Integration with academic social networks (ORCID, Google Scholar)

#### Development Phases

**Phase 1 : Core Infrastructure**
- Repository setup and basic React application
- Static content pages with responsive design
- GitHub Pages deployment pipeline

#### Resource Requirements

**Development Costs:**
- Domain name: $10-15/year (optional)
- Serverless function usage: $0-20/month (Vercel/Netlify free tiers)
- Analytics and monitoring: Free tiers available

**Maintenance:**
- Minimal ongoing costs due to static hosting
- Periodic content updates and dependency management
- Optional: Professional email setup for contact forms

### Conclusion

This portfolio web application represents an opportunity. By combining rigorous academic presentation with modern web technologies, the platform will serve as both a professional showcase and a functional research tool, positioning the author as an innovative researcher capable of bridging theoretical sophistication with practical implementation.

The emphasis on accessibility, open-source development, and multi-dimensional thinking aligns perfectly with values in both academic and industry contexts. The platform itself becomes a meta-demonstration of that complex, multi-dimensional work. 