import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env.${process.env.NODE_ENV}`,
});

const configService = new ConfigService();

export const AppDatasource = new DataSource({
    type: configService.get<
        'postgres' | 'mysql' | 'sqlite' | 'mariadb' | 'mssql'
    >('DB_TYPE'),
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [User, Report],
    synchronize: false,
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
});
