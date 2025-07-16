# Next.js + HeroUI Project

A modern, SEO-optimized web application built with Next.js 15, TypeScript, Tailwind CSS 3.4.5, and HeroUI components.

## 🚀 Features

- ⚡ **Next.js 15** with App Router
- 🔷 **TypeScript** for type safety
- 🎨 **Tailwind CSS 3.4.5** for styling
- 🎯 **HeroUI** for beautiful React components
- 🌙 **Dark/Light mode** with next-themes
- 📱 **Responsive design**
- 🔍 **SEO optimized** with comprehensive meta tags
- 🤖 **Robots.txt** and **Sitemap.xml** included
- 📄 **PWA manifest** for progressive web app support
- ⚡ **Turbopack** for fast development

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4.5
- **UI Components:** HeroUI
- **Theme Management:** next-themes
- **Font:** Geist Sans & Geist Mono
- **Zustan:** For stage menagment

## 📦 Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd nextjs-heroui-project
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout with SEO metadata
│   ├── page.tsx             # Home page with HeroUI showcase
│   ├── providers.tsx        # HeroUI and theme providers
│   ├── sitemap.ts           # Dynamic sitemap generation
│   └── manifest.ts          # PWA manifest
├── components/              # Reusable components (add your own)
└── lib/                     # Utility functions (add your own)
```

## 🎨 Customization

### Theme Configuration

The project includes a comprehensive theme setup in `tailwind.config.ts` with HeroUI integration.

### SEO Configuration

Update the metadata in `src/app/layout.tsx` to match your project:

- Update `metadataBase` URL
- Modify OpenGraph and Twitter card settings
- Update site name and descriptions

### HeroUI Components

All HeroUI components are available. Check the [HeroUI documentation](https://heroui.com/docs) for usage examples.

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [HeroUI Documentation](https://heroui.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
