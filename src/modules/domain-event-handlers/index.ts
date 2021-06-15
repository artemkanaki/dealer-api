import { EmailService } from '@modules/email/email.service';
import { DomainEventHandler } from 'src/core/domain-events';
import { OnDealerCreatedEventHandler } from './dealer-created.event-handler';

const domainEventHandlers: DomainEventHandler[] = [
  new OnDealerCreatedEventHandler(new EmailService()),
];

export function initDomainEventHandlers(): void {
  domainEventHandlers.forEach((eventHandler: DomainEventHandler) =>
    eventHandler.listen(),
  );
}
