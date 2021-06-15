import {
  OrmEntityProps,
  OrmMapper,
} from 'src/infrastructure/database/base-classes/orm-mapper.base';
import { ID } from '@core/value-objects/id.value-object';
import { DealerEntity, DealerProps } from '../domain/entities/dealer.entity';
import { Email } from '../domain/value-objects/email.value-object';
import { DealerOrmEntity } from './dealer.orm-entity';

export class DealerOrmMapper extends OrmMapper<DealerEntity, DealerOrmEntity> {
  protected toOrmProps(entity: DealerEntity): OrmEntityProps<DealerOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<DealerOrmEntity> = {
      email: props.email.value,
      agencyId: props.agencyId,
      deleted: props.deleted,
      address: {
        id: entity.address.id.value,
        dealerId: props.id.value,
        country: props.address.country,
        city: props.address.city,
        postalCode: props.address.postalCode,
        street: props.address.street,
        streetNumber: props.address.streetNumber,
      },
    };

    return ormProps;
  }

  protected toDomainProps(ormEntity: DealerOrmEntity): DealerProps {
    const props: DealerProps = {
      email: new Email(ormEntity.email),
      agencyId: ormEntity.agencyId,
      deleted: ormEntity.deleted,
      address: {
        dealerId: new ID(ormEntity.id),
        country: ormEntity.address.country,
        city: ormEntity.address.city,
        postalCode: ormEntity.address.postalCode,
        street: ormEntity.address.street,
        streetNumber: ormEntity.address.streetNumber,
      },
    };

    return props;
  }
}
