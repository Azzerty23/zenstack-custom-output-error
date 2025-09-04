# Bug Report: `zenstack` only works at runtime with the default output location

At runtime, `zenstack` only works if the artifacts are generated into the default location (`node_modules/.zenstack`).

### Steps to Reproduce

Prerequisites: `cp .env.example .env && npx create-db`

1. `npx zenstack generate --output lib/generated/zenstack`
2. `npx prisma db seed`

👉 This fails at runtime.

### Note

If I explicitly generate into the default location, it works as expected:

1. `npx zenstack generate --output node_modules/.zenstack`
2. `npx prisma db seed`

### Logs of the failure

```sh
Loaded Prisma config from prisma.config.ts.

Prisma config detected, skipping environment variable loading.
Running seed command `tsx ./prisma/seed.ts` ...
/Users/augustin/Documents/Dev/Test/prisma-examples/generator-prisma-client/nextjs-starter-webpack/node_modules/.pnpm/@zenstackhq+runtime@2.18.1_@prisma+client@6.14.0_zod@3.25.71/node_modules/@zenstackhq/runtime/enhance.js:8
        throw new Error('Generated "enhance" function not found. Please run `zenstack generate` first.');
              ^

Error: Generated "enhance" function not found. Please run `zenstack generate` first.
    at exports.enhance (/Users/augustin/Documents/Dev/Test/prisma-examples/generator-prisma-client/nextjs-starter-webpack/node_modules/.pnpm/@zenstackhq+runtime@2.18.1_@prisma+client@6.14.0_zod@3.25.71/node_modules/@zenstackhq/runtime/enhance.js:8:15)
    at <anonymous> (/Users/augustin/Documents/Dev/Test/prisma-examples/generator-prisma-client/nextjs-starter-webpack/lib/db.ts:18:31)
    at ModuleJob.run (node:internal/modules/esm/module_job:271:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:547:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)

Node.js v22.13.1

An error occurred while running the seed command:
Error: Command failed with exit code 1: tsx ./prisma/seed.ts
```

### Content of node_modules/@zenstackhq/runtime/enhance.js

```js
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

try {
    exports.enhance = require('.zenstack/enhance').enhance;
} catch {
    exports.enhance = function () {
        throw new Error('Generated "enhance" function not found. Please run `zenstack generate` first.');
    };
}
```

-------------------

# Prisma Postgres Example: Next.js 15 Starter (Webpack, Node.js, ESM)

This project showcases how to use the Prisma ORM with Prisma Postgres in an ESM Next.js application.

## Prerequisites

To successfully run the project, you will need the following:

- Two **Prisma Postgres** connection strings:
  - Your **Prisma Postgres + Accelerate connection string** (containing your **Prisma API key**) which you can get by enabling Postgres in a project in your [Prisma Data Platform](https://pris.ly/pdp) account. You will use this connection string to run Prisma migrations.
  - Your **Prisma Postgres direct TCP connection string** which you will use with Prisma Client.
    Learn more in the [docs](https://www.prisma.io/docs/postgres/database/direct-connections).

## Tech Stack

- Next.js 15
  - Runtime: Node.js 20.19.0
  - Bundler: Webpack 5
- ESM
  - `package.json` contains `{ "type": "module" }`
  - `next.config.js` -> `next.config.mjs`
  - `postcss.config.js` -> `postcss.config.mjs`
- Prisma Client with the `prisma-client` generator
  See the [Prisma schema file](./prisma/schema.prisma) for details.

  ```prisma
  generator client {
    provider = "prisma-client"
    output = "../lib/generated/prisma"
    previewFeatures = ["driverAdapters", "queryCompiler"]
    runtime = "nodejs"
  }
  ```

## Getting started

### 1. Clone the repository

Clone the repository, navigate into it and install dependencies:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
cd prisma-examples/generator-prisma-client/nextjs-starter-webpack
pnpm install
```

### 2. Configure environment variables

Create a `.env` in the root of the project directory:

```bash
touch .env
```

Now, open the `.env` file and set the `DATABASE_URL` environment variables with the values of your connection string and your Prisma Postgres connection string:

```bash
# .env

# Prisma Postgres connection string (used for migrations)
DATABASE_URL="__YOUR_PRISMA_POSTGRES_CONNECTION_STRING__"

# Postgres connection string (used for queries by Prisma Client)
DIRECT_URL="__YOUR_PRISMA_POSTGRES_DIRECT_CONNECTION_STRING__"

NEXT_PUBLIC_URL="http://localhost:3000"
```

Note that `__YOUR_PRISMA_POSTGRES_CONNECTION_STRING__` is a placeholder value that you need to replace with the values of your Prisma Postgres + Accelerate connection string. Notice that the Accelerate connection string has the following structure: `prisma+postgres://accelerate.prisma-data.net/?api_key=<api_key_value>`.

Note that `__YOUR_PRISMA_POSTGRES_DIRECT_CONNECTION_STRING__` is a placeholder value that you need to replace with the values of your Prisma Postgres direct TCP connection string. The direct connection string has the following structure: `postgres://<username>:<password>@<host>:<port>/<database>`.

### 3. Generate Prisma Client

Run:

```
pnpm prisma generate
```

### 4. Run a migration to create the database structure and seed the database

The [Prisma schema file](./prisma/schema.prisma) contains a single `Quotes` model and a `QuoteKind` enum. You can map this model to the database and create the corresponding `Quotes` table using the following command:

```
pnpm prisma migrate dev --name init
```

You now have an empty `Quotes` table in your database. Next, run the [seed script](./prisma/seed.ts) to create some sample records in the table:

```
pnpm prisma db seed
```

### 5. Start the app

You can run the app with the following command:

```
pnpm dev
```

## Resources

- [Prisma Postgres documentation](https://www.prisma.io/docs/postgres)
- Check out the [Prisma docs](https://www.prisma.io/docs)
- [Join our community on Discord](https://pris.ly/discord?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) to share feedback and interact with other users.
- [Subscribe to our YouTube channel](https://pris.ly/youtube?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for live demos and video tutorials.
- [Follow us on X](https://pris.ly/x?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for the latest updates.
- Report issues or ask [questions on GitHub](https://pris.ly/github?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section).
