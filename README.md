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
├── src/
│   ├── components/         # Individual React components
│   ├── index.css           # Tailwind setup and theme tokens
│   └── main.jsx            # Router and app entry point
├── index.html
├── vite.config.js
└── package.json
```

## AI FAQ backend

The FAQ page includes an "Ask AI" field that sends a `POST` request to `/api/ask` with a `{ "query": "..." }` body and expects a JSON response containing an `answer` field.

During development, Vite proxies `/api` requests to `http://localhost:3001`, so the backend needs to run there. Without it, the FAQ form will display a generic failure message while the rest of the app works normally.
