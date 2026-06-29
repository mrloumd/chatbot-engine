import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateBotDto {
  @ApiProperty({ example: 'Acme Support' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Acme Inc.' })
  @IsString()
  businessName: string;

  @ApiPropertyOptional({ example: 'Acme sells widgets and gadgets to small businesses.' })
  @IsOptional()
  @IsString()
  businessDescription?: string;

  @ApiPropertyOptional({
    example: 'claude-sonnet-4-6',
    description: 'Claude model for this bot (claude-haiku-4-5 | claude-sonnet-4-6 | claude-opus-4-8)',
  })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional({ example: 'friendly and professional' })
  @IsOptional()
  @IsString()
  tone?: string;

  @ApiPropertyOptional({ example: 'our support team at support@acme.com' })
  @IsOptional()
  @IsString()
  fallbackChannel?: string;

  @ApiPropertyOptional({ example: 'Cite the source title in brackets after each fact.' })
  @IsOptional()
  @IsString()
  citationRule?: string;
}
