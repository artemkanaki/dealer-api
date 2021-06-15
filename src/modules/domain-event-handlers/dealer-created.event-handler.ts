import { EmailService } from '@modules/email/email.service';
import { DealerImportedDomainEvent } from '@modules/dealer/domain/events/dealer-imported.domain-event';
import { DomainEventHandler, DomainEvents } from 'src/core/domain-events';

export class OnDealerCreatedEventHandler implements DomainEventHandler {
  constructor(private readonly email: EmailService) {}

  public listen(): void {
    DomainEvents.subscribe(
      DealerImportedDomainEvent,
      this.onUserCreated.bind(this),
    );
  }

  async onUserCreated(event: DealerImportedDomainEvent): Promise<void> {
    await this.email.send(event.email, 'Welcome message goes here');
    /* Other side-effects can go here, or different event handlers can
    be created if needed */
  }
}
