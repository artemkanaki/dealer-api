import { DomainEvent } from 'src/core/domain-events';
import { ID } from 'src/core/value-objects/id.value-object';
import { Email } from '../value-objects/email.value-object';

export class DealerImportedDomainEvent extends DomainEvent {
  constructor(
    public readonly aggregateId: ID,
    public readonly email: Email,
  ) {
    super();
  }
}
