# Energy offer comparator

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the node modules:

```bash
npm install
# or
yarn
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Tech stack

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [shadcn-ui](https://ui.shadcn.com/)

## Tests

This project uses [Vitest](https://vitest.dev/) as the testing framework, which provides a fast and modern testing experience with native TypeScript support.

### Running Tests

```bash
# Run all tests once
yarn test
```

### Test Structure

Tests should be placed in:

- `__tests__` directories
- Files ending with `.test.ts` or `.test.tsx`
- Files ending with `.spec.ts` or `.spec.tsx`

## Deployment

This application is deployed with [Vercel](https://vercel.com), which provides seamless deployment for Next.js applications.

Here is the URL: <https://energy-offer-comparator-cmer.vercel.app/>

## API

### Testing the API with OpenAPI

The application provides an interactive OpenAPI (Swagger) documentation interface that allows you to test all available endpoints directly from your browser.

1. **Start the development server:**

   ```bash
   yarn dev
   ```

2. **Access the OpenAPI interface:**
   Navigate to <http://localhost:3000/api/v1/openapi> in your browser

3. **Explore the API documentation:**
   - Browse all available endpoints organized by categories
   - View request/response schemas
   - See example payloads and responses

#### How to Test Endpoints

1. **Select an endpoint** from the list (e.g., GET, POST, PUT, DELETE)

2. **Click "Try it out"** to enable the interactive testing mode

3. **Fill in the parameters:**
   - Path parameters (if required)
   - Query parameters
   - Request body (for POST/PUT requests)

4. **Click "Execute"** to send the request

5. **Review the response:**
   - HTTP status code
   - Response body
   - Response headers

The OpenAPI interface will show you the exact request format and expected response structure for each endpoint.

## Database

The raw data is provided in JSON files for simplicity, but the application can be configured to use a PostgreSQL database with Prisma ORM in the future to benefit from SQL features and more advanced database capabilities (like sorting, etc...).

How to create the database:

```sql
createdb -U postgres -h localhost atp-ranking
```
