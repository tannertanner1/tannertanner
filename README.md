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

- Add `NEXT_PUBLIC_` prefix to environment variables exposed to the client
- Run `vercel env add` to add environment variables

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
  ```

---

<!--
```bash
npm i next-themes @tabler/icons-react
touch components/theme-provider.tsx components/theme-toggle.tsx
```
-->
