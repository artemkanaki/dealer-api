import { DealerRepositoryPort } from '@modules/dealer/database/dealer.repository.interface';
import { ConflictException } from '@exceptions';
import { DealerAddressRepositoryPort } from '@modules/dealer/database/dealer-address.repository.interface';
import { DealerEntity, DealerProps } from '../../domain/entities/dealer.entity';
import { DealerAddressProps } from '../../domain/entities/dealer-address.entity';
import { Email } from '@modules/dealer/domain/value-objects/email.value-object';

export interface CreateDealerProps {
  agencyId: string;
  email: string;
  address: {
    country: string;
    city: string;
    postalCode: string;
    street: string;
    streetNumber: string;
  }
}

export class CreateDealerService {
  constructor(
    // no direct dependency on a repository, instead depends on a port
    private readonly dealerRepository: DealerRepositoryPort,
    private readonly dealerAddressRepository: DealerAddressRepositoryPort,
  ) {}

  async createUser(props: CreateDealerProps): Promise<DealerEntity> {
    const dealerProps: DealerProps = {
      address: {
        country: props.address.country,
        city: props.address.city,
        postalCode: props.address.postalCode,
        street: props.address.street,
        streetNumber: props.address.streetNumber,
      } as DealerAddressProps,
      agencyId: props.agencyId,
      email: new Email(props.email),
      deleted: false,
    };
    // user uniqueness guard
    if (await this.dealerRepository.exists(dealerProps.email)) {
      throw new ConflictException('User already exists');
    }

    const dealer = new DealerEntity(dealerProps);

    await this.dealerRepository.save(dealer);
    await this.dealerAddressRepository.save(dealer.address);

    return dealer;
  }
}
