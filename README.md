# Gürhan Camgöz - Personal Portfolio

A modern, responsive portfolio website showcasing research, articles, and projects in the intersection of social anthropology and artificial intelligence.

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Icon library

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx      - Navigation header
│   │   ├── Footer.tsx      - Footer section
│   │   └── Layout.tsx      - Main layout wrapper
│   ├── sections/
│   │   ├── Hero.tsx        - Hero/landing section
│   │   ├── About.tsx       - About me section
│   │   ├── Research.tsx    - Research & publications
│   │   └── Contact.tsx     - Contact section
│   └── ui/
│       ├── Button.tsx      - Reusable button component
│       ├── Card.tsx        - Card component
│       └── Section.tsx     - Section wrapper
├── types/
│   └── index.ts            - TypeScript type definitions
├── utils/
│   └── constants.ts        - App constants & personal info
├── App.tsx                 - Root component
├── main.tsx                - Entry point
└── index.css               - Global styles
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

This site is deployed to GitHub Pages via the `/docs` folder:

```bash
npm run build
rm -rf docs
mv dist docs
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
