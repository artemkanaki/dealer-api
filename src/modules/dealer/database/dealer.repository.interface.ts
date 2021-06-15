import { RepositoryPort } from 'src/core/ports/repository.ports';
import { Email } from '@modules/dealer/domain/value-objects/email.value-object';
import { ID } from '@core/value-objects/id.value-object';
import { DealerEntity, DealerProps } from '../domain/entities/dealer.entity';

/* Repository port belongs to application's core, but since it usually
 changes together with repository it is kept in the same directory for
 convenience. */
export interface DealerRepositoryPort extends RepositoryPort<DealerEntity, DealerProps> {
  exists(id: ID | Email): Promise<boolean>;
}
