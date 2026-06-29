// Creates the Atlas Vector Search index used by RAG retrieval.
// Works against the local Docker MongoDB (mongodb-atlas-local) or a real Atlas cluster.
//
//   node scripts/create-vector-index.mjs
//
// Env (all optional — defaults match docker-compose):
//   MONGODB_URI      default mongodb://localhost:27017/?directConnection=true
//   MONGODB_DB       default llm_chatbot
//   EMBEDDINGS_DIMS  default 1024 (voyage-3). Must match your embeddings model.

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/?directConnection=true';
const dbName = process.env.MONGODB_DB ?? 'llm_chatbot';
const dims = Number(process.env.EMBEDDINGS_DIMS ?? 1024);

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db(dbName);

  // createSearchIndex requires the collection to exist.
  await db.createCollection('documentchunks').catch(() => {});
  const collection = db.collection('documentchunks');

  const existing = await collection.listSearchIndexes().toArray().catch(() => []);
  if (existing.some((i) => i.name === 'vector_index')) {
    console.log('vector_index already exists — nothing to do.');
  } else {
    await collection.createSearchIndex({
      name: 'vector_index',
      type: 'vectorSearch',
      definition: {
        fields: [
          { type: 'vector', path: 'embedding', numDimensions: dims, similarity: 'cosine' },
          { type: 'filter', path: 'botId' },
        ],
      },
    });
    console.log(`Created vector_index on ${dbName}.documentchunks (dims=${dims}).`);
  }
} catch (err) {
  console.error('Failed to create vector index:', err.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
