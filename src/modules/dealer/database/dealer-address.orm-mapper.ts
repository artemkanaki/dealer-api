import {
  OrmEntityProps,
  OrmMapper,
} from 'src/infrastructure/database/base-classes/orm-mapper.base';
import { ID } from '@core/value-objects/id.value-object';
import { DealerAddressEntity, DealerAddressProps } from '../domain/entities/dealer-address.entity';
import { DealerAddressOrmEntity } from './dealer-address.orm-entity';

export class DealerAddressOrmMapper extends OrmMapper<DealerAddressEntity, DealerAddressOrmEntity> {
  protected toOrmProps(entity: DealerAddressEntity): OrmEntityProps<DealerAddressOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<DealerAddressOrmEntity> = {
      dealerId: props.dealerId.value,
      country: props.country,
      city: props.city,
      postalCode: props.postalCode,
      street: props.street,
      streetNumber: props.streetNumber,
    };

    return ormProps;
  }

  protected toDomainProps(ormEntity: DealerAddressOrmEntity): DealerAddressProps {
    const props: DealerAddressProps = {
      dealerId: new ID(ormEntity.dealerId),
      country: ormEntity.country,
      city: ormEntity.city,
      postalCode: ormEntity.postalCode,
      street: ormEntity.street,
      streetNumber: ormEntity.streetNumber,
    };

    return props;
  }
}
