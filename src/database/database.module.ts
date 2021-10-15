import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                return {
                    type: 'postgres',
                    host: configService.get<string>('POSTGRES_HOST'),
                    port: configService.get<number>('POSTGRES_PORT'),
                    username: configService.get<string>('POSTGRES_USER'),
                    password: configService.get<string>('POSTGRES_PASSWORD'),
                    database: configService.get<string>('POSTGRES_DATABASE'),
                    migrationsTableName: 'migrations',
                    migrationsRun: false,
                    synchronize: false,
                    logging: configService.get<string>('POSTGRES_LOGGING') === 'true',
                    autoLoadEntities: true,
                    timezone: configService.get('TZ'),
                };
            },
            inject: [ConfigService],
        }),
    ],
    exports: [],
})
export class DataBaseModule { }