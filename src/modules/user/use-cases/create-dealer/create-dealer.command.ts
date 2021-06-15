import { Email } from '../../domain/value-objects/email.value-object';

export interface CreateDealerProps {
  agencyId: string;
  email: string;

  country: string;
  city: string;
  postalCode: string;
  street: string;
  streetNumber: string;
}

export class CreateDealerCommand {
  constructor(props: CreateDealerProps) {
    this.agencyId = props.agencyId;
    this.email = new Email(props.email);
    this.country = props.country;
    this.city = props.city;
    this.postalCode = props.postalCode;
    this.street = props.street;
    this.streetNumber = props.streetNumber;
  }

  readonly agencyId: string;

  readonly email: Email;

  readonly country: string;

  readonly city: string;

  readonly postalCode: string;

  readonly street: string;

  readonly streetNumber: string;

}
