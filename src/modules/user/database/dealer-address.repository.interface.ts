import { RepositoryPort } from 'src/core/ports/repository.ports';
import { Email } from '@modules/user/domain/value-objects/email.value-object';
import { ID } from '@core/value-objects/id.value-object';
import { DealerAddressEntity, DealerAddressProps } from '../domain/entities/dealer-address.entity';

/* Repository port belongs to application's core, but since it usually
 changes together with repository it is kept in the same directory for
 convenience. */
export interface DealerAddressRepositoryPort extends RepositoryPort<DealerAddressEntity, DealerAddressProps> {
  exists(id: ID): Promise<boolean>;
}
