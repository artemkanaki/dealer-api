export interface CreateDealerAddressProps {
  country: string;
  city: string;
  postalCode: string;
  street: string;
  streetNumber: string;
}

export class CreateDealerAddressCommand {
  constructor(props: CreateDealerAddressProps) {
    this.country = props.country;
    this.city = props.city;
    this.postalCode = props.postalCode;
    this.street = props.street;
    this.streetNumber = props.streetNumber;
  }

  readonly country: string;

  readonly city: string;

  readonly postalCode: string;

  readonly street: string;

  readonly streetNumber: string;
}
