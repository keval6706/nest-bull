import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioProcessor } from './audio.processor';
import { AudioService } from './audio.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'audio',
    }),
  ],
  controllers: [AudioController],
  providers: [AudioService, AudioProcessor],
})
export class AudioModule {}
