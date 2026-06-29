import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BotDocument = HydratedDocument<Bot>;

@Schema({ timestamps: true })
export class Bot {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  businessName: string;

  @Prop({ default: '' })
  businessDescription: string;

  /** Claude model this bot uses. See plan.md for tiers. */
  @Prop({ default: 'claude-sonnet-4-6' })
  model: string;

  @Prop({ default: 'friendly and professional' })
  tone: string;

  @Prop({ default: 'our support team' })
  fallbackChannel: string;

  /** Optional extra instruction, e.g. "Cite the source title in brackets." */
  @Prop({ default: '' })
  citationRule: string;

  @Prop({ default: 'active', enum: ['active', 'disabled'] })
  status: 'active' | 'disabled';

  @Prop({ type: Object, default: {} })
  branding: Record<string, any>;
}

export const BotSchema = SchemaFactory.createForClass(Bot);
