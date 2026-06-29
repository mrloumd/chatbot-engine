import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class HistoryTurnDto {
  @ApiProperty({ enum: ['user', 'assistant'], example: 'user' })
  @IsIn(['user', 'assistant'])
  role: 'user' | 'assistant';

  @ApiProperty({ example: 'Hi, I have a question about refunds.' })
  @IsString()
  content: string;
}

export class ChatRequestDto {
  @ApiProperty({ example: '<bot id returned from POST /api/bots>' })
  @IsString()
  botId: string;

  @ApiProperty({ example: 'What is your refund policy?' })
  @IsString()
  question: string;

  @ApiPropertyOptional({ type: [HistoryTurnDto], description: 'Prior turns in this conversation.' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HistoryTurnDto)
  history?: HistoryTurnDto[];
}
