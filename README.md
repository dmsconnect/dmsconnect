### Apps and Packages

- `@dmsconnect/web`: a [Next.js](https://nextjs.org/) app
- `@dmsconnect/ui`: a stub React component library based on shadcn. Any changes made in this library will be reflected into the application after build.
- `@dmsconnect/constants ` : Provide constants that are use throughout the application to reference texts and other constants. (Note: This package is not ment for sharing environment variables. In SaaS platforms this type of package is used for Internationalization.)
- `@dmsconnect/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`). This package is kept as a reference.
- `@dmsconnect/typescript-config`: `tsconfig.json`s used throughout the monorepo. This package is kept as a reference.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
yarn build
```

### Develop

To develop all apps and packages, run the following command:

```
yarn dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/docs/reference/configuration)
- [CLI Usage](https://turbo.build/docs/reference/command-line-reference)

# Architecture

[Excelidraw Link](https://excalidraw.com/#json=p0MzUos9cX9Ceak5a4Iz_,vX-8verHKMT7NV47dKx8WA)
