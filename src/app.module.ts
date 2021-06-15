import { Module } from '@nestjs/common';
import { DealerModule } from '@modules/dealer/dealer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestEventModule } from 'nest-event';
import { DealerRepository } from '@modules/dealer/database/dealer.repository';
import { DealerOrmEntity } from '@modules/dealer/database/dealer.orm-entity';
import { typeormConfig } from './infrastructure/configs/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TypeOrmModule.forFeature([DealerOrmEntity]),
    NestEventModule,
    DealerModule,
  ],
  controllers: [],
  providers: [DealerRepository],
})
export class AppModule {}
