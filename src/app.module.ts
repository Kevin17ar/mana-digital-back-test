import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { config, DatabasePgConfigService } from './config';

import { UtilsModule } from './utils/utils.module';
import { FakeStoreApiModule } from './fake-store-api/fake-store-api.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: false,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabasePgConfigService,
      inject: [ConfigService]
    }),
    ScheduleModule.forRoot(),
    UtilsModule,
    FakeStoreApiModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
