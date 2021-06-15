import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import {
  DealerEntity,
  DealerProps,
} from '@modules/dealer/domain/entities/dealer.entity';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from 'src/infrastructure/database/base-classes/typeorm.repository.base';
import { QueryParams } from 'src/core/ports/repository.ports';
import { ID } from '@core/value-objects/id.value-object';
import { Email } from '@modules/dealer/domain/value-objects/email.value-object';
import { DealerOrmEntity } from './dealer.orm-entity';
import { DealerRepositoryPort } from './dealer.repository.interface';
import { DealerOrmMapper } from './dealer.orm-mapper';

@Injectable()
export class DealerRepository
  extends TypeormRepositoryBase<DealerEntity, DealerProps, DealerOrmEntity>
  implements DealerRepositoryPort {
  protected relations: string[] = ['address'];

  constructor(
    @InjectRepository(DealerOrmEntity)
    private readonly dealerRepository: Repository<DealerOrmEntity>,
  ) {
    super(
      dealerRepository,
      new DealerOrmMapper(DealerEntity, DealerOrmEntity),
      new Logger('dealer-repository'),
    );
  }

  async exists(unique: ID | Email): Promise<boolean> {
    const where: QueryParams<DealerProps> = {};
    if (unique instanceof ID) {
      where.id = unique;
    }
    if (unique instanceof Email) {
      where.email = unique;
    }

    const found = await this.findOne(where);

    return !!found;
  }

  // Used to construct a query
  protected prepareQuery(
    params: QueryParams<DealerProps>,
  ): WhereCondition<DealerOrmEntity> {
    const where: QueryParams<DealerOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    if (params.email) {
      where.email = params.email.value;
    }

    return where;
  }
}
