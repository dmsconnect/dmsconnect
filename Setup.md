# DMS Connect Setup Guide

This guide will help you set up and run the DMS Connect Next.js application locally.

## Prerequisites

- Node.js version 22.x
- Yarn version v1.22.22 or later
- Git

## Local Development

### Installation

1. Clone the repository and install dependencies:

   `git clone https://github.com/RAGAdox/dms-connect`

   `cd dms-connect`

   `yarn install --frozen-lockfile`

### Setting up Clerk Authentication

DMS Connect uses Clerk for authentication. Follow these steps to set up your Clerk account and get the required API keys:

1. Create a Clerk account at [https://clerk.com/](https://clerk.com/)
2. Create a new application in the Clerk dashboard:

- Click on "Add Application"
- Give your application a name (e.g., "DMS Connect Dev")
- Select "Sign up and Sign in" as the authentication type

3. Configure your application settings:

- In the Clerk dashboard, go to your application
- Navigate to "API Keys" in the sidebar
- You'll need the following keys:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`

4. Create a `.env.local` file in the root of the project and add your Clerk keys:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key
```

### Running the Application

DMS Connect is a Next.js monorepo project. You can start the development server with (From the root directory):

```
yarn dev
```

This will start the Next.js development server on port 3000 (http://localhost:3000).

## Development Workflow

1. The project is structured as a monorepo using Yarn workspaces
2. Make changes to the codebase and see them reflected in real-time thanks to Next.js Fast Refresh

## Troubleshooting

### Next.js Build Issues

If you encounter build errors:

1. Make sure all dependencies are installed correctly
2. Check for TypeScript errors in your codebase
3. Clear the Next.js cache with `yarn next clean` and try again

### Clerk Authentication Issues

If you encounter authentication issues:

1. Verify that your Clerk API keys are correctly set in the `.env.local` file
2. Check that the redirect URLs are properly configured in the Clerk dashboard
3. Clear your browser cache and cookies

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
