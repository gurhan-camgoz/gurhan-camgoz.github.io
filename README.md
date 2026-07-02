# Gürhan Camgöz - Personal Portfolio

A modern, responsive portfolio website showcasing research, articles, and projects in the intersection of social anthropology and artificial intelligence.

## 🚀 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Vite 7** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first styling (via `@tailwindcss/vite`)
- **React Router 7** - Client-side routing
- **Framer Motion** - Smooth animations
- **Lucide React** - Icon library
- **react-helmet-async** - Per-page SEO metadata

## 📁 Project Structure

```
src/
├── layouts/            - Theme wrappers per identity (MasterLayout, AnthroLayout, AILayout)
├── pages/
│   ├── Landing.tsx     - Split-screen landing page
│   ├── anthro/         - Anthropology section (/anthro/*)
│   ├── ai/             - AI section (/ai/*): Overview, Projects, Architecture, Evaluation
│   └── horeca/         - Horeca page (work in progress)
├── components/
│   ├── ai/             - AI-section components (AINav)
│   ├── anthro/         - Anthro-section components
│   ├── horeca/         - Horeca components
│   ├── shared/         - Cross-section components (SeoHead, WaveBackground)
│   └── ui/             - Primitives (Button, Card, Section, DrawnArrow)
├── data/               - Data-driven content (aiProjects.ts)
├── content/            - Page content (horecaCv.ts)
├── assets/             - Images and thumbnails
├── types/              - TypeScript type definitions
├── utils/              - Constants and helpers
├── App.tsx             - Router setup
├── main.tsx            - Entry point
└── index.css           - Global styles and theme customizations
```

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/gurhan-camgoz/gurhan-camgoz.github.io.git
   cd gurhan-camgoz.github.io
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🚀 Deployment

This site is deployed to GitHub Pages via the `/docs` folder. The build writes directly to `docs/` (see `vite.config.ts`) and copies `index.html` to `404.html` as a SPA fallback for deep links:

```bash
npm run build
git add docs/
git commit -m "Deploy updates"
git push origin main
```

Live at: [gurhan-camgoz.github.io](https://gurhan-camgoz.github.io)

## 👤 About

Social and Cultural Anthropologist & AI Researcher exploring the socio-cultural dimensions of artificial intelligence.

- **Email**: gurhan.camgoz@gmail.com
- **Location**: Brussels, Belgium
- **GitHub**: [gurhan-camgoz](https://github.com/gurhan-camgoz)
- **LinkedIn**: [gürhan-c](https://www.linkedin.com/in/g%C3%BCrhan-c-27bb3a113/)

## 📄 License

This project is open source and available under the MIT License.
