import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from 'src/infrastructure/database/base-classes/typeorm.repository.base';
import { QueryParams } from 'src/core/ports/repository.ports';
import { DealerAddressEntity, DealerAddressProps } from '@modules/dealer/domain/entities/dealer-address.entity';
import { DealerAddressOrmEntity } from '@modules/dealer/database/dealer-address.orm-entity';
import { ID } from '@core/value-objects/id.value-object';
import { DealerAddressRepositoryPort } from '@modules/dealer/database/dealer-address.repository.interface';
import { DealerOrmEntity } from './dealer.orm-entity';
import { DealerAddressOrmMapper } from './dealer-address.orm-mapper';

@Injectable()
export class DealerAddressRepository
  extends TypeormRepositoryBase<DealerAddressEntity, DealerAddressProps, DealerAddressOrmEntity>
  implements DealerAddressRepositoryPort {
  protected relations: string[] = ['dealer'];

  constructor(
    @InjectRepository(DealerAddressOrmEntity)
    private readonly dealerAddressRepository: Repository<DealerAddressOrmEntity>,
  ) {
    super(
      dealerAddressRepository,
      new DealerAddressOrmMapper(DealerAddressEntity, DealerAddressOrmEntity),
      new Logger('dealer-address-repository'),
    );
  }

  async exists(id: ID): Promise<boolean> {
    const where: QueryParams<DealerAddressProps> = { id };

    const found = await this.findOne(where);

    return !!found;
  }

  protected prepareQuery(
    params: QueryParams<DealerAddressProps>,
  ): WhereCondition<DealerOrmEntity> {
    const where: QueryParams<DealerAddressOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    if (params.dealerId) {
      where.dealerId = params.dealerId.value;
    }

    return where;
  }
}
