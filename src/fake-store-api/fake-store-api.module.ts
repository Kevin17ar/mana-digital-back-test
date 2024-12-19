import { Module } from '@nestjs/common';
import { FakeStoreApiService } from './services/fake-store-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [FakeStoreApiService],
  exports: [FakeStoreApiService],
})
export class FakeStoreApiModule { }
