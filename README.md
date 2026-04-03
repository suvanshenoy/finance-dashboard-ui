# Finance Dashboard UI
A modern and responsive finance dashboard built with React, TypeScript, and Tailwind CSS. It helps users manage transactions, track spending, and gain insights through clean visuals and real-time analytics.

## What I Built

- A complete transaction management system (add, edit, delete, filter)
- Interactive charts for balance trends and spending breakdown
- Dark/Light theme with smooth switching and system preference support
- Role-based access (Admin & Viewer)
- Fully responsive UI for mobile, tablet, and desktop

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS v4
- Zustand (state management)
- Recharts (data visualization)
- Vite (build tool)
- Deployed via Vercel (CI/CD with GitHub Actions)

## Setup Instructions

### Prerequisites
- Node.js 18+ or Bun
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finance-dashboard-ui
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   bun run dev
   # or
   npm run dev
   ```

## Key Highlights

- Clean, scalable component architecture
- Efficient state management with persistence
- Focus on performance, accessibility, and responsive design
- Fully typed codebase with TypeScript strict mode

## Responsive Design

### Breakpoints
- **Mobile** (< 640px): Single column, compact layout
- **Tablet** (640px - 1024px): 2-3 columns, medium spacing
- **Desktop** (1024px+): Full multi-column layout

## Deployment

### Automatic Deployment
Project uses GitHub Actions for CI/CD:

1. **Push to main branch** triggers workflow
2. **TypeScript check** validates all types
3. **Build process** creates production bundle
4. **Deploy to Vercel** automatically updates live site

### Manual Deployment
```bash
bun run build
# Deploy dist/ folder to your hosting provider
```

### Environment Variables
Set these in GitHub repository secrets:
- `VERCEL_TOKEN` - Vercel API token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID


## Troubleshooting

### Common Issues

**Theme not switching**
- Ensure CSS custom properties are loaded
- Check that Zustand persist is working
- Verify no manual dark mode classes are overriding

**Build errors**
- Run `bun run tsc --noEmit` to check types
- Ensure all dependencies are installed
- Check for any `any` types in components

**Deployment issues**
- Verify Vercel environment variables
- Check GitHub Actions logs
- Ensure build passes locally first

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and type checks
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
