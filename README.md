# Toy Tales

A React app that helps Andy keep track of his toys. It connects to a `json-server` backend and supports full **CRUD**: see all toys, add a toy, like a toy, and donate (delete) a toy.

## Screenshot

![Toy Tales screenshot](screenshot.png)

## Features

- **Read:** all toys load from the backend when the page opens (`GET /toys`)
- **Create:** the "Add a Toy" form saves a new toy with 0 likes (`POST /toys`)
- **Update:** the Like button adds one like and keeps the toy's position (`PATCH /toys/:id`)
- **Delete:** "Donate to GoodWill" removes the toy (`DELETE /toys/:id`)

## Built with

- React 19 and Vite
- json-server (fake REST API)
- Vitest and React Testing Library

## How it works

| Event | Fetch request | State update |
| --- | --- | --- |
| Page loads | `GET /toys` | `setToys(all toys)` |
| Form submitted | `POST /toys` | add the new toy to the array |
| Like clicked | `PATCH /toys/:id` | replace that toy, same position (`map`) |
| Donate clicked | `DELETE /toys/:id` | remove that toy (`filter`) |

Component tree:

```
App            (owns the toys state and the useEffect)
├── Header
├── ToyForm    (POST)
└── ToyContainer
    └── ToyCard  (PATCH and DELETE)
```

## Getting started

You need [Node.js](https://nodejs.org/) (v18 or newer) and npm.

```bash
# 1. Clone your fork
git clone <your-repo-url>
cd <your-repo-folder>

# 2. Install dependencies
npm install

# 3. Start the backend (keep this terminal open)
npm run server

# 4. In a second terminal, start the React app
npm run dev
```

- Backend: http://localhost:3001/toys
- App: the URL Vite prints (usually http://localhost:5173)

## Run the tests

```bash
npm run test
```

Press `q` to quit watch mode, or run `npx vitest run` for one single run.

## Project structure

```
├── db.json                 # the toys "database" for json-server
└── src/
    ├── components/
    │   ├── App.jsx
    │   ├── Header.jsx
    │   ├── ToyForm.jsx
    │   ├── ToyContainer.jsx
    │   └── ToyCard.jsx
    └── __tests__/
```
