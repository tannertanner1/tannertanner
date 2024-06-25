<h3>Overview</h3>

- [Dev: Demo](#dev-demo)
  - [/app](#app)
    - [Database Setup](#database-setup)
    - [UI Setup](#ui-setup)
  - [app/(admin)](#appadmin)
    - [Install Zod](#install-zod)
    - [Authentication](#authentication)
  - [app/(user)](#appuser)
    - [Stripe API and Webhook](#stripe-api-and-webhook)
    - [Resend and React Email](#resend-and-react-email)
- [Prod: Update](#prod-update)
  - [Vercel CLI](#vercel-cli)
  - [Neon Postgres](#neon-postgres)
  - [FUCK](#fuck)
    - [Plan A](#plan-a)
    - [Plan B](#plan-b)
    - [Plan C](#plan-c)

---

### <u>Dev: Demo</u>

#### /app

##### Database Setup

- Create Next.js App

  ```bash
  npx create-next-app@latest mvp-app --typescript --tailwind --eslint
  cd mvp-app && code .
  ```

- Follow [Prisma Quickstart](https://www.prisma.io/docs/getting-started/quickstart)

  ```bash
  # npm install typescript ts-node @types/node -D
  npm i ts-node -D

  npm i prisma -D
  npx prisma init --datasource-provider sqlite

  # Create a migration
  npx prisma migrate dev --name init
  ```

- Next steps:

  - Set the `DATABASE_URL` in the `.env` file to point to your existing database. If your database has no tables yet, read [Getting Started](https://pris.ly/d/getting-started).
  - Run `prisma db pull` to turn your database schema into a Prisma schema.
  - Run `prisma generate` to generate the **Prisma Client**. You can then start querying your database.

    ```bash
    # Create a migration
    npx prisma migrate dev --name init
    ```

##### UI Setup

- Install `shadcn/ui`

  ```bash
  npx shadcn-ui@latest init
  ```

  **Note:** [_Best practice for instantiating Prisma Client with Next.js_](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices)

  ```bash
  mkdir db && touch db/db.ts
  ```

#### app/(admin)

##### Install [Zod](https://zod.dev/?id=installation)

- Form validation

```bash
npm i zod
```

##### Authentication

- Create `middleware.ts` and add variables to `.env`

```bash
# middleware.ts
touch middleware.ts lib/isValidPassword.ts

# ADMIN_USERNAME
# HASHED_ADMIN_PASSWORD
```

#### app/(user)

##### Stripe API and Webhook

- Install [`react-stripe-js`](https://docs.stripe.com/stripe-js/react)

  - Create **API** keys (connect account)
    [dashboard.stripe.com/dashboard](https://dashboard.stripe.com/test/dashboard)

    > e.g., `Publishable` and `Secret` keys

    ```bash
    npm i stripe @stripe/stripe-js @stripe/react-stripe-js

    # NEXT_PUBLIC_STRIPE_PUBLIC_KEY
    # STRIPE_SECRET_KEY
    ```

- Install [`stripe-cli`](https://docs.stripe.com/stripe-cli)

  - Create **Webhook** events (handle post-payment)
    [dashboard.stripe.com/webhooks/create](https://dashboard.stripe.com/webhooks/create)

    > e.g., `Failed` and `Succeeded` events

    ```bash
    mkdir app/webhooks/stripe && touch app/webhooks/stripe/route.tsx

    # global root dir
    brew install stripe/stripe-cli/stripe
    # local root dir
    stripe login
    stripe listen --forward-to localhost:3000/webhooks/stripe

    # NEXT_PUBLIC_SERVER_URL
    # STRIPE_WEBHOOK_SECRET
    ```

##### Resend and React Email

- [Resend](https://resend.com/nextjs): **API**
- [React Email](https://react-email.dev/): **Components**

  ```bash
  npm i resend react-email @react-email/components
  mkdir email && touch email/OrderConfirmation.tsx email/OrderHistory.tsx

  # RESEND_API_KEY
  # SENDER_EMAIL
  ```

---

### <u>Prod: Update</u>

#### Vercel CLI

- FML
<!-- - Add `NEXT_PUBLIC_` prefix to environment variables exposed to the client
- Run `vercel env add` to add environment variables -->

  ```bash
  npm i @vercel/speed-insights
  # optimal image optimization in production
  npm i sharp

  # npm i -g vercel
  vercel login
  # vercel link

  # vercel env pull
  # npm install @vercel/postgres
  ```

#### Neon Postgres

- Create [Neon](https://console.neon.tech/app/projects) project, database `neondb`, and update `DATABASE_URL`
  - [neon.tech/docs/guides/nextjs](https://neon.tech/docs/guides/nextjs)
  - [neon.tech/docs/guides/prisma](https://neon.tech/docs/guides/prisma)
- Update Prisma `provider` and `migrate` schema

  ```sql
  -- datasource db {
  -- provider = "sqlite"
  -- url      = env("DATABASE_URL")
  -- }
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  ```

  ```bash
  npx prisma migrate dev --name init
  # npx prisma studio

  rm -rf node_modules .vercel .next
  npm install
  npx prisma migrate deploy
  npx prisma generate
  ```

#### FUCK

- Testing SSL Connection using a PostgreSQL client:

  ```bash
  # Attempt to connect to database using SSL
  psql "postgresql://neondb_owner:KOwd0pyv4ZkM@ep-bold-firefly-a61t9vcf.us-west-2.aws.neon.tech/neondb?sslmode=require"
  ```

```bash
npm uninstall @prisma/client prisma
npm i @prisma/client
npm i prisma -D

# genereate prisma client
npx prisma generate

```

##### Plan A

1. Create a New Next.js App

2. Initialize Prisma with PostgreSQL

   - Install Prisma and PostgreSQL Client
   - Initialize Prisma
   - Update `prisma/schema.prisma`
   - Add `DATABASE_URL` Environment Variables to `.env`
   - Run Prisma Migrate: `npx prisma migrate dev --name init`
   - Generate Prisma Client: `npx prisma generate`

3. Set environment variables in the Vercel Project Settings and `.env` by running `vercel env pull`

4. Test... `npx prisma studio`...

```bash
# 1.
npx create-next-app@latest mvp-app --typescript --tailwind --eslint
cd mvp-app && code .

# 2.
npm install prisma @prisma/client
npx prisma init
```

##### Plan B

- Set Up PostgreSQL Database
- Use [`pgloader`](https://github.com/dimitri/pgloader?tab=readme-ov-file#usage) to migrate **SQLite** database to **PostgreSQL**

  ```bash
  brew install pgloader

  # datasource db: directUrl = env("DIRECT_URL")
  # generator client: previewFeatures = ["driverAdapters"]
  ```

  ```bash
  # repair db of corrupted
  sqlite3 dev.db
  sqlite> PRAGMA integrity_check;
  # try to recover db
  sqlite3 dev.db .dump > backup.sql
  sqlite3 repaired.db < backup.sql
  # migrate from sqlite to postgres
  pgloader sqlite:///path/to/repaired.db postgresql://username:password@host:port/dbname
  ```

- Ensure your Prisma schema (schema.prisma) reflects the correct types and constraints for PostgreSQL

##### Plan C

```bash
npm install @prisma/adapter-neon @neondatabase/serverless ws
npm install @types/ws bufferutil --save-dev
```

<br />
<br />
<br />

ugg

```bash
npm i
npx prisma init --datasource-provider postgresql

# Introspect your database
npx prisma db pull
# Generate the Prisma Client
npx prisma generate
# Create a baseline migration
npx prisma migrate dev --name init

# npx prisma migrate reset

stripe listen --forward-to localhost:3000/webhooks/stripe
npx prisma studio
```

```bash
npx create-next-app@latest neon-drizzle-auth --typescript --tailwind --eslint
cd neon-drizzle-auth && code .
# npx shadcn-ui@latest init
```

```tsx
export const metadata: Metadata = {
  title: {
    absolute: "Demo",
  },
  // title: {
  //   template: "ㅜㅜ %s", // ㅠㅠ
  //   default: "ㅜㅜ", // a default is required when creating a template
  // },
  description:
    "User Management, Passwordless Authentication, Payment Processing, Transactional Emails",
  keywords: [
    "tannertanner",
    "User Management",
    "Passwordless Authentication",
    "Payment Processing",
    "Transactional Emails",
  ],
  // metadataBase: new URL("https://tannertanner.vercel.app"),
  // alternates: {
  //   canonical: "/",
  //   languages: {
  //     "en-US": "/en-US",
  //   },
  // },
  // creator: "Tanner Tanner",
  // formatDetection: {
  //   email: false,
  //   address: false,
  //   telephone: false,
  // },
  // authors: [{ name: "Tanner", url: "https://tannertanner.me" }],
  // referrer: "origin-when-cross-origin",
  // generator: "Next.js",
  // applicationName: "Demo",
  openGraph: {
    title: "Demo",
    description:
      "User Management, Passwordless Authentication, Payment Processing, Transactional Emails",
    // url: "https://tannertanner.vercel.app",
    siteName: "Demo",
    // Must be an absolute URL
    // images: [
    //   {
    //     url: "https://tannertanner.vercel.app/og.png",
    //     width: 800,
    //     height: 600,
    //   },
    //   {
    //     url: "https://tannertanner.vercel.app/og-alt.png",
    //     width: 1800,
    //     height: 1600,
    //     alt: "My custom alt",
    //   },
    // ],
    // locale: "en_US",
    // type: "website",
  },
};
// export function generateViewport(): Viewport {
//   return {
//     themeColor: 'black',
//   }
// }
// export const viewport: Viewport = {
//   // colorScheme: 'dark',
//   themeColor: [
//     { media: '(prefers-color-scheme: light)', color: 'cyan' },
//     { media: '(prefers-color-scheme: dark)', color: 'black' },
//   ],
//   width: 'device-width',
//   initialScale: 1,
//   maximumScale: 1,
//   userScalable: false,
// }
```
