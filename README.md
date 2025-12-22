# Product CRUD App

A modern React application built with TypeScript and Vite for managing products with full CRUD (Create, Read, Update, Delete) operations.

## Features

- ✨ Product listing with pagination
- ➕ Add new products
- ✏️ Edit existing products
- 🗑️ Delete products
- 🧪 Comprehensive unit tests with Vitest
- 📊 Code coverage reporting
- 🎨 Modern UI with responsive design

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Query (@tanstack/react-query)** - Data fetching and state management
- **React Router** - Routing
- **Vitest** - Unit testing framework
- **React Testing Library** - Testing utilities

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.x
- **npm** (comes with Node.js)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/CES-AI-TRAINING/product-crud-app.git
cd product-crud-app
```

### 2. Install dependencies

```bash
npm install
```

This will install all required dependencies listed in `package.json`.

## Running the Application

### Development Mode

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is busy).

### Production Build

Build the application for production:

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Testing

### Run Tests

Run all tests once:

```bash
npm test
```

### Watch Mode

Run tests in watch mode (automatically re-runs on file changes):

```bash
npm run test:watch
```

### Coverage Report

Generate and view test coverage:

```bash
npm run coverage
```

To generate coverage and automatically open the HTML report (macOS):

```bash
npm run coverage:open
```

The coverage report will be available in the `coverage/` directory. Open `coverage/index.html` in your browser to view detailed coverage information.

## Code Quality

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Project Structure

```
product-crud-app/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── __tests__/    # Component tests
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductForm.tsx
│   │   └── Pagination.tsx
│   ├── pages/            # Page components
│   │   └── ProductsPage.tsx
│   ├── services/         # API services
│   │   ├── __tests__/   # Service tests
│   │   └── productService.ts
│   ├── hooks/           # Custom React hooks
│   │   └── useProducts.ts
│   ├── types/           # TypeScript type definitions
│   │   └── product.ts
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Application entry point
├── public/              # Static assets
├── coverage/            # Test coverage reports
└── docs/               # Documentation

```

## Available Scripts

| Script                  | Description                       |
| ----------------------- | --------------------------------- |
| `npm run dev`           | Start development server          |
| `npm run build`         | Build for production              |
| `npm run preview`       | Preview production build          |
| `npm test`              | Run tests once                    |
| `npm run test:watch`    | Run tests in watch mode           |
| `npm run coverage`      | Generate coverage report          |
| `npm run coverage:open` | Generate and open coverage report |
| `npm run lint`          | Run ESLint                        |

## Additional Documentation

- See [UNIT_TESTING_README.md](./UNIT_TESTING_README.md) for detailed testing documentation
- See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for architecture details

## Development Tips

- The app uses React Query for efficient data fetching and caching
- All API calls are mocked in `productService.ts` for demo purposes
- Tests are co-located with their components in `__tests__` folders
- ESLint is configured with React-specific rules for code quality
