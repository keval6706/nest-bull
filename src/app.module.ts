import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AudioModule } from './modules/audio/audio.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    AudioModule,
    RouterModule.register([
      {
        path: 'audio',
        module: AudioModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
