# Learning React

A collection of small React components built while learning React. Each component lives on its own route and focuses on a specific concept, from state and effects to forms, validation, and animation.

## Components

| Route       | Component            | What it practices                                      |
| ----------- | -------------------- | ------------------------------------------------------ |
| `/counter`  | `Counter`            | `useState`, functional state updates                    |
| `/notes`    | `Notes`              | Array state, add/delete, controlled modal inputs        |
| `/clock`    | `Clock`              | `useEffect`, `setInterval`, cleanup on unmount          |
| `/signup`   | `SignUpForm`         | Controlled inputs, form validation, password visibility |
| `/password` | `PasswordShowHide`   | Derived state, show/hide toggle, validation feedback    |
| `/otp`      | `OtpPin`             | Refs, auto-focus, keyboard handling, paste support      |
| `/faq`      | `Faq`                | Accordion animation with Framer Motion, AI query input  |

The home route (`/`) lists every component with a link to its page.

## Tech stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://motion.dev/)
- [Lucide React](https://lucide.dev/) icons

## Getting started

### Prerequisites

- Node.js 20 or newer
- [pnpm](https://pnpm.io/)

### Install and run

```bash
pnpm install
pnpm dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

### Available scripts

```bash
pnpm dev       # start the development server
pnpm build     # create a production build in dist/
pnpm preview   # preview the production build locally
pnpm lint      # run ESLint
```

## Project structure

```text
.
├── public/                 # Static assets
├── server/
│   └── index.js            # Express API used by the AI FAQ
├── src/
│   ├── components/         # Individual React components
│   ├── index.css           # Tailwind setup and theme tokens
│   └── main.jsx            # Router and app entry point
├── index.html
├── vite.config.js
└── package.json
```

## AI FAQ backend

The FAQ page includes an "Ask AI" field. It sends a `POST` request to `/api/ask` with `{ "query": "..." }` and expects `{ "answer": "..." }` back. A small Express server is included in `server/index.js` and calls an OpenAI-compatible chat completions API.

Start the server in a second terminal:

```bash
AI_API_KEY=your-key pnpm server
```

Then keep the Vite dev server running with `pnpm dev`. Vite proxies `/api` requests to `http://localhost:3001`.

Optional environment variables:

| Variable      | Default                     | Purpose                              |
| ------------- | --------------------------- | ------------------------------------ |
| `AI_API_KEY`  | none (required)             | API key for the AI provider          |
| `AI_API_URL`  | `https://api.openai.com/v1` | Base URL or full chat completions URL |
| `AI_MODEL`    | `gpt-4o-mini`               | Model used for answers               |
| `PORT`        | `3001`                      | Port for the local API server        |
| `VITE_AI_API_URL` | `/api/ask`              | Frontend override for the API route  |

For local development you can put these in `.env.local` or `.env` at the project root. Both are ignored by git. To use Groq, set:

```bash
AI_API_URL=https://api.groq.com/openai/v1
AI_MODEL=openai/gpt-oss-120b
```
