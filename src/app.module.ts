import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AudioModule } from './modules/audio/audio.module';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';

const { NODE_ENV } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        join(process.cwd(), 'env', `.${NODE_ENV || 'dev'}.env`),
        join(process.cwd(), 'env', '.env'),
      ],
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          redis: {
            host: configService.get<string>('REDIS_HOST'),
            port: +configService.get<number>('REDIS_PORT'),
          },
          inject: [ConfigService],
        }
      }
    }),
    AudioModule, AuthModule,
    RouterModule.register([
      {
        path: 'audio',
        module: AudioModule,
      },
      {
        path: 'auth',
        module: AuthModule,
      },
    ]),

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
