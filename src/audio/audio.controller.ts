import { Controller, Post } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller({
  path: 'audio',
  version: '1',
})
export class AudioController {
  constructor(@InjectQueue('audio') private readonly audioQueue: Queue) {}

  @Post()
  async audio() {
    return [
      await this.audioQueue.add('audio', {
        file: 'audio.mp3',
      }),
    ];
  }
}
