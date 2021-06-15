import { DealerRepositoryPort } from '@modules/user/database/dealer.repository.interface';
import { ConflictException } from '@exceptions';
import { DealerAddressRepositoryPort } from '@modules/user/database/dealer-address.repository.interface';
import { CreateDealerCommand } from './create-dealer.command';
import { DealerEntity } from '../../domain/entities/dealer.entity';
import { DealerAddressProps } from '../../domain/entities/dealer-address.entity';

export class CreateDealerService {
  constructor(
    // no direct dependency on a repository, instead depends on a port
    private readonly dealerRepository: DealerRepositoryPort,
    private readonly dealerAddressRepository: DealerAddressRepositoryPort,
  ) {}

  async createUser(command: CreateDealerCommand): Promise<DealerEntity> {
    // user uniqueness guard
    if (await this.dealerRepository.exists(command.email)) {
      throw new ConflictException('User already exists');
    }

    const dealer = new DealerEntity({
      address: {
        country: command.country,
        city: command.city,
        postalCode: command.postalCode,
        street: command.street,
        streetNumber: command.streetNumber,
      } as DealerAddressProps,
      agencyId: command.agencyId,
      email: command.email,
      deleted: false,
    });

    await this.dealerRepository.save(dealer);
    await this.dealerAddressRepository.save(dealer.address);

    return dealer;
  }
}
