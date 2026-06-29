import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bot, BotDocument } from './schemas/bot.schema';
import { CreateBotDto } from './dto/create-bot.dto';

@Injectable()
export class BotsService {
  constructor(@InjectModel(Bot.name) private readonly botModel: Model<BotDocument>) {}

  findAll() {
    // Only active bots are selectable by users.
    return this.botModel.find({ status: 'active' }).select('-__v').exec();
  }

  async findOne(id: string): Promise<BotDocument> {
    const bot = await this.botModel.findById(id).exec();
    if (!bot) throw new NotFoundException(`Bot ${id} not found`);
    return bot;
  }

  create(dto: CreateBotDto) {
    return this.botModel.create(dto);
  }
}
