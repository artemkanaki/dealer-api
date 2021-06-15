import { ArgumentInvalidException } from '@exceptions';
import { Entity } from 'src/core/base-classes/entity.base';
import { ID } from '@core/value-objects/id.value-object';

export interface DealerAddressProps {
  dealerId: ID;
  country: string;
  city: string;
  postalCode: string;
  street: string;
  streetNumber: string;
}

export interface UpdateDealerAddressProps {
  country?: string;
  city?: string;
  postalCode?: string;
  street?: string;
  streetNumber?: string;
}

export class DealerAddressEntity extends Entity<DealerAddressProps> {
  constructor(props: DealerAddressProps) {
    super(props);
  }

  get dealerId(): ID {
    return this.props.dealerId;
  }

  get country(): string {
    return this.props.country;
  }

  get city(): string {
    return this.props.city;
  }

  get postalCode(): string {
    return this.props.postalCode;
  }

  get street(): string {
    return this.props.street;
  }

  get streetNumber(): string {
    return this.props.streetNumber;
  }

  public update(props: UpdateDealerAddressProps): void {
    this.props.country = props.country || this.props.country;
    this.props.city = props.street || this.props.city;
    this.props.postalCode = props.postalCode || this.props.postalCode;
    this.props.street = props.street || this.props.street;
    this.props.streetNumber = props.streetNumber || this.props.streetNumber;
  }

  static validate(props: DealerAddressProps): void {
    if (props.country.length !== 2) {
      throw new ArgumentInvalidException('Country should be exactly 2 char length', {
        country: props.country,
      });
    }

    // implement other fields validation here
  }
}
