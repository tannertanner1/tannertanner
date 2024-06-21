<h3>Demo</h3>

<!-- [TOC] -->

- [/app](#app)
  - [Database Setup](#database-setup)
  - [UI Setup](#ui-setup)
- [app/(admin)](#appadmin)
  - [Install Zod](#install-zod)
  - [Authentication](#authentication)
- [app/(user)](#appuser)
  - [Stripe API and Webhook](#stripe-api-and-webhook)
  - [Resend and React Email](#resend-and-react-email)

---

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

**Note:** Vercel CLI

- Add `NEXT_PUBLIC_` prefix to environment variables exposed to the client
- Run `vercel env add` to add environment variables

```bash
npm i @vercel/speed-insights
# optimal image optimization in production
npm i sharp

# npm i -g vercel
vercel login
# vercel link

# vercel env add DATABASE_URL ""
# vercel env add ADMIN_USERNAME ""
# vercel env add HASHED_ADMIN_PASSWORD ""
# vercel env add NEXT_PUBLIC_SERVER_URL ""
# vercel env add NEXT_PUBLIC_STRIPE_PUBLIC_KEY ""
# vercel env add STRIPE_SECRET_KEY ""
# vercel env add STRIPE_WEBHOOK_SECRET ""
# vercel env add RESEND_API_KEY ""
# vercel env add SENDER_EMAIL ""
```

<br />
<br />
<br />

```bash
$ npm run build

> build
> prisma generate && next build

Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (v5.15.0) to ./node_modules/@prisma/client in 582ms

Start using Prisma Client in Node.js (See: https://pris.ly/d/client)

`
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
`

or start using Prisma Client at the edge (See: https://pris.ly/d/accelerate)

`
import { PrismaClient } from '@prisma/client/edge'
const prisma = new PrismaClient()
`

See other ways of importing Prisma Client: http://pris.ly/d/importing-client

┌─────────────────────────────────────
 ✓ Finalizing page optimization

Route (app)                                      Size     First Load JS
┌ ƒ /                                            188 B          99.1 kB
├ ○ /_not-found                                  875 B            88 kB
├ ƒ /dashboard                                   138 B          87.2 kB
├ ƒ /dashboard/orders                            1.37 kB         119 kB
├ ƒ /dashboard/products                          1.59 kB         126 kB
├ ƒ /dashboard/products/[id]/download            0 B                0 B
├ ƒ /dashboard/products/[id]/edit                1.73 kB         103 kB
├ ƒ /dashboard/products/new                      1.73 kB         103 kB
├ ƒ /dashboard/users                             1.37 kB         119 kB
├ ƒ /orders                                      998 B          97.2 kB
├ ƒ /products                                    188 B          99.1 kB
├ ƒ /products/[id]/checkout                      9.07 kB         108 kB
├ ƒ /products/download/[downloadVerificationId]  0 B                0 B
├ ƒ /products/download/expired                   174 B            94 kB
├ ƒ /stripe/success                              189 B          99.1 kB
└ ƒ /webhooks/stripe                             0 B                0 B
+ First Load JS shared by all                    87.1 kB
  ├ chunks/23-287123a6294665fb.js                31.5 kB
  ├ chunks/fd9d1056-d12749b2364444e1.js          53.7 kB
  └ other shared chunks (total)                  1.89 kB


ƒ Middleware                                     26.9 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

<!--

"email": "cp .env ./node_modules/react-email && email dev --dir src/email --port 3001"

<br />
<br />
<br />

```bash
npm i next-themes @tabler/icons-react
touch components/theme-provider.tsx components/theme-toggle.tsx
```

-->
