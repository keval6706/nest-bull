import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller({ version: '1' })
@ApiTags('Audio')
export class AudioController {
  constructor(@InjectQueue('audio') private readonly audioQueue: Queue) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Job has been successfully created.'})
  async audio() {
    return await this.audioQueue.add('audio', {
      file: 'audio.mp3',
    });
  }
}
