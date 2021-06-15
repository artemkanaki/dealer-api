import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealerOrmEntity } from './database/dealer.orm-entity';
import { DealerRepository } from './database/dealer.repository';
import { CreateUserHttpController } from './use-cases/create-dealer/create-user.http.controller';
import { DeleteDealerHttpController } from './use-cases/delete-dealer/delete-dealer.controller';
import { createDealerProvider, removeDealerProvider } from './dealer.providers';
import { DealerAddressOrmEntity } from './database/dealer-address.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([DealerOrmEntity, DealerAddressOrmEntity])],
  controllers: [
    CreateUserHttpController,
    DeleteDealerHttpController,
  ],
  providers: [DealerRepository, createDealerProvider, removeDealerProvider],
})
export class DealerModule {}
