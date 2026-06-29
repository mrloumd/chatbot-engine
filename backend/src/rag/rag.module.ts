import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DocumentChunk,
  DocumentChunkSchema,
} from './schemas/document-chunk.schema';
import { ChunkerService } from './chunker.service';
import { EmbeddingsService } from './embeddings.service';
import { VectorstoreService } from './vectorstore.service';
import { RetrieverService } from './retriever.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DocumentChunk.name, schema: DocumentChunkSchema },
    ]),
  ],
  providers: [
    ChunkerService,
    EmbeddingsService,
    VectorstoreService,
    RetrieverService,
  ],
  exports: [
    ChunkerService,
    EmbeddingsService,
    VectorstoreService,
    RetrieverService,
  ],
})
export class RagModule {}
