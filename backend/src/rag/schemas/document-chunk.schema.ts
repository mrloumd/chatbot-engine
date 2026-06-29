import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DocumentChunkDocument = HydratedDocument<DocumentChunk>;

/**
 * One searchable piece of a business's document.
 * The Atlas Vector Search index `vector_index` lives on the `embedding` field,
 * with `botId` as a filter. See plan.md → Setup.
 */
@Schema({ timestamps: true })
export class DocumentChunk {
  @Prop({ required: true, index: true })
  botId: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: [Number], required: true })
  embedding: number[];

  @Prop({ default: '' })
  source: string;

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;
}

export const DocumentChunkSchema = SchemaFactory.createForClass(DocumentChunk);
