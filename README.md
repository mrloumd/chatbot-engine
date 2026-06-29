# llm-chatbot

A multi-tenant **RAG customer-support chatbot**. Each business gets its own bot; users
pick a business and ask questions answered **only** from that business's documents.

Monorepo:

- **`backend/`** — NestJS API (chat, bots, ingestion, RAG, Claude)
- **`frontend/`** — Next.js chat UI (pick a bot → ask)

See **[plan.md](./plan.md)** for the full architecture, the system prompt, and setup.

## Quick start

```bash
npm install                            # installs both workspaces

docker compose up -d                   # start MongoDB (with vector search) on :27017
npm run db:index --workspace backend   # create the vector_index

# backend/.env and frontend/.env.local already exist —
# edit backend/.env and set ANTHROPIC_API_KEY + EMBEDDINGS_API_KEY

npm run dev:backend         # http://localhost:3001/api
npm run dev:frontend        # http://localhost:3000
```

Then create a bot (`POST /api/bots`), ingest docs (`POST /api/ingest`), and chat.

> **Stack:** NestJS · Next.js · MongoDB (Docker `mongodb-atlas-local`, Atlas in prod) · Claude · Voyage embeddings.
