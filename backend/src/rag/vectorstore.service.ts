import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DocumentChunk,
  DocumentChunkDocument,
} from './schemas/document-chunk.schema';

export interface RetrievedChunk {
  text: string;
  source?: string;
  score?: number;
}

@Injectable()
export class VectorstoreService {
  constructor(
    @InjectModel(DocumentChunk.name)
    private readonly chunkModel: Model<DocumentChunkDocument>,
  ) {}

  async store(
    botId: string,
    items: { text: string; embedding: number[]; source?: string }[],
  ): Promise<void> {
    await this.chunkModel.insertMany(
      items.map((i) => ({
        botId,
        text: i.text,
        embedding: i.embedding,
        source: i.source ?? '',
      })),
    );
  }

  /**
   * Vector search scoped to ONE bot. Requires an Atlas Vector Search index named
   * `vector_index` on `embedding` with `botId` as a filter (see plan.md).
   */
  async search(
    botId: string,
    queryEmbedding: number[],
    limit = 5,
  ): Promise<RetrievedChunk[]> {
    return this.chunkModel.aggregate<RetrievedChunk>([
      {
        $vectorSearch: {
          index: 'vector_index',
          path: 'embedding',
          queryVector: queryEmbedding,
          numCandidates: 100,
          limit,
          filter: { botId },
        },
      },
      {
        $project: {
          _id: 0,
          text: 1,
          source: 1,
          score: { $meta: 'vectorSearchScore' },
        },
      },
    ]);
  }
}
