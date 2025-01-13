# Travel Hub

Modern travel platform built with Next.js and Feature-Sliced Design architecture.

## 🚀 Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework for production
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [ESLint](https://eslint.org/) - Linting
- [Prettier](https://prettier.io/) - Code formatting
- [Husky](https://typicode.github.io/husky/) - Git hooks

## 🏗️ Architecture

This project follows the Feature-Sliced Design (FSD) methodology for a scalable and maintainable architecture.

```
src/
├── app/          # Composition layer (pages, layouts)
├── widgets/      # Complex reusable components
├── features/     # User interactions, features
├── entities/     # Business entities
├── shared/       # Reusable infrastructure
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 20.x or higher
- pnpm 8.x or higher

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/travel-hub-front.git
cd travel-hub-front
```

2. Install dependencies

```bash
pnpm install
```

3. Run development server

```bash
pnpm start:dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Development

### Available Scripts

- `pnpm start:dev` - Run development server with turbopack
- `pnpm start:build` - Build for production
- `pnpm start:prod` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

### Code Style

- ESLint and Prettier are configured for code quality
- Husky is set up for pre-commit hooks
- Follow the established naming conventions and code style guides in the `docs` directory

## 📚 Documentation

Detailed documentation can be found in the `docs` directory:

- [Naming Convention](docs/Naming-Convention.md)
- [Branch Convention](docs/Branch-Convention.md)
- [Commit Convention](docs/Commit-Convention.md)
- [Pull Request Convention](docs/PullRequest-Convention.md)
- [FSD Architecture](docs/Fsd-Architecture.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
