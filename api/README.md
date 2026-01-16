## Tech Stack

This official API is built with modern and reliable technologies:

- **Backend**: Nest.js, TypeORM, TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT Auth

### Prerequisites

**Required Versions:**

- [Node.js](https://nodejs.org/en/download) (v18 or higher)
- [pnpm](https://pnpm.io) (v10 or higher)
- [Docker](https://docs.docker.com/engine/install/) (v20 or higher)

Before running the application, you'll need to set up services and configure environment variables. For more details on environment variables, see the [Environment Variables](#environment-variables) section.

### Database Setup

The API uses PostgreSQL for storing data. Here's how to set it up:

1. **Start the Database**

   This creates a database with:
   - Name: `lms-system`
   - Username: `postgres`
   - Password: `postgres`
   - Port: `5432`

2. **Set Up Database Connection**

   Make sure your database connection string is in `.env` file.

   For local development use:

   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lms"
   ```

3. **Database Commands**
   - **Set up database tables**:

     ```bash
     pnpm db:push
     ```

   - **Create migration files** (after schema changes):

     ```bash
     pnpm db:generate
     ```

   - **Apply migrations**:

     ```bash
     pnpm db:migrate
     ```

   - **View database content**:
     ```bash
     pnpm db:studio
     ```
     > If you run `pnpm dev` in your terminal, the studio command should be automatically running with the app.
