import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BotsService } from './bots.service';
import { CreateBotDto } from './dto/create-bot.dto';

@Controller('bots')
export class BotsController {
  constructor(private readonly botsService: BotsService) {}

  /** List bots a user can pick. */
  @Get()
  findAll() {
    return this.botsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.botsService.findOne(id);
  }

  /** Register a new business's bot. (Admin — add auth before production.) */
  @Post()
  create(@Body() dto: CreateBotDto) {
    return this.botsService.create(dto);
  }
}
