# Contributing Guidelines

Thank you for your interest in contributing to the RCA Library Management System! This guide will help you set up the project locally and explain how to contribute to the frontend codebase.

## Table of Contents
- [Setting Up the Backend](#setting-up-the-backend)
- [Setting Up the Frontend](#setting-up-the-frontend)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Pull Request Process](#pull-request-process)

## Setting Up the Backend

### Prerequisites
- Node.js (v18 or higher)
- pnpm (v8 or higher)
- Docker and Docker Compose (for database)
- Git

### Installation Steps

1. **Make the project directory**
```bash
mkdir RCA-LMS
cd RCA-LMS
```

2. **Clone the repository**
```bash
git clone https://github.com/codetechhq/rca-lms-api.git api
cd RCA-LMS
```

3. **Set up the backend**
```bash
cd api
pnpm install
```
4. **Configure environment variables**
```bash
cp .env.example .env
```
Edit the `.env` file and update the database connection settings and other environment variables as needed.

5. **Run database migrations**
   ```bash
   pnpm run migration:run
   ```

6. **Start the backend development server**
```bash
pnpm run start:dev
```

The API should now be running at `http://localhost:4000` (or the port specified in your environment variables).

## Setting Up the Frontend

The second thing you should do is to clone the frontend repository in the `RCA-LMS` directory where the api is located for easier management.

```bash
git clone https://github.com/codetechhq/rca-lms-web.git frontend
```

1. **Navigate to the frontend directory**
```bash
cd ../frontend
```
2. **Install dependencies**
```bash
pnpm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```
Update the API URL and other environment variables as needed.

4. **Start the development server**
```bash
pnpm run dev
```
The frontend should now be running at `http://localhost:3000` (or the port specified in your environment variables).

## Development Workflow

### Branch Naming Convention
- `feature/your-feature-name` for new features
- `bugfix/issue-description` for bug fixes
- `refactor/component-name` for code refactoring
- `docs/update-description` for documentation updates

### Commit Message Format
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
```
feat: add book search functionality
fix: resolve user authentication issue
docs: update README with new API endpoints
refactor: improve component structure
```

## Code Style Guidelines

### Frontend Guidelines

1. **TypeScript**
   - Use TypeScript for all new code
   - Define proper interfaces and types
   - Avoid using `any` type

2. **React & Next.js**
   - Use functional components with hooks
   - Follow the Next.js file-based routing conventions
   - Implement proper error handling and loading states

3. **Styling**
   - Use TailwindCSS for styling
   - Follow the utility-first approach
   - Use Shadcn UI components when applicable

4. **Best Practices**
   - Use early returns to improve readability
   - Name event handlers with a "handle" prefix (e.g., `handleClick`)
   - Implement proper accessibility features
   - Use constants instead of functions when appropriate
   - Follow DRY (Don't Repeat Yourself) principles

### Code Example
```tsx
// Good example
const BookCard = ({ book }: { book: Book }) => {
  const handleViewDetails = () => {
    // Implementation
  };

  return (
    <div className="p-4 rounded-lg bg-white shadow-md">
      <h3 className="text-lg font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-600">{book.author}</p>
      <button 
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleViewDetails}
        aria-label={`View details for ${book.title}`}
      >
        View Details
      </button>
    </div>
  );
};
```

## Pull Request Process

1. **Create a new branch** from `main` following the naming convention
2. **Make your changes** and commit them following the commit message format
3. **Test your changes** locally to ensure they work as expected
4. **Push your branch** to the remote repository
5. **Create a Pull Request** against the `main` branch
6. **Fill out the PR template** with a description of your changes
7. **Request a review** from at least one maintainer
8. **Address any feedback** from the reviewers
9. Once approved, your PR will be merged into the `main` branch

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

Thank you for contributing to RCA-LMS!
