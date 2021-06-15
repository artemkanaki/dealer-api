import { AggregateRoot } from 'src/core/base-classes/aggregate-root.base';
import {
  DealerAddressEntity,
  DealerAddressProps,
  UpdateDealerAddressProps,
} from './dealer-address.entity';
import { DealerImportedDomainEvent } from '../events/dealer-imported.domain-event';
import { Email } from '../value-objects/email.value-object';

export interface DealerProps {
  agencyId: string;
  email: Email;
  deleted: boolean;
  address: DealerAddressProps;
}

export class DealerEntity extends AggregateRoot<DealerProps> {
  constructor(props: DealerProps) {
    super(props);

    this._address = new DealerAddressEntity({
      ...props.address,
      dealerId: this.id,
    });

    this.addEvent(
      new DealerImportedDomainEvent(this.id, this.props.email),
    );
  }

  private readonly _address: DealerAddressEntity;

  get agencyId(): string {
    return this.props.agencyId;
  }

  get email(): Email {
    return this.props.email;
  }

  get deleted(): boolean {
    return this.props.deleted;
  }

  get address(): DealerAddressEntity {
    return this._address;
  }

  updateAddress(props: UpdateDealerAddressProps): void {
    this._address.update(props);
  }

  delete(): void {
    this.props.deleted = true;
  }

  restore(): void {
    this.props.deleted = false;
  }

  static validate(props: DealerProps): void {
    DealerAddressEntity.validate(props.address);

    // run validation here
  }
}
