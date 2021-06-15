import { Provider } from '@nestjs/common';
import { DealerRepository } from './database/dealer.repository';
import { CreateDealerService } from './use-cases/create-dealer/create-dealer.service';
import { DeleteDealerService } from './use-cases/delete-dealer/delete-dealer.service';
import { DealerAddressRepository } from './database/dealer-address.repository';

/* Constructing providers to avoid having framework decorators
   in application core. */

export const createDealer = Symbol('createDealer');

export const createDealerProvider: Provider = {
  provide: createDealer,
  useFactory: (dealerRepository: DealerRepository, dealerAddressRepository: DealerAddressRepository): CreateDealerService => {
    return new CreateDealerService(dealerRepository, dealerAddressRepository);
  },
  inject: [DealerRepository, DealerAddressRepository],
};

export const deleteDealer = Symbol('deleteDealer');

export const removeDealerProvider: Provider = {
  provide: deleteDealer,
  useFactory: (dealerRepository: DealerRepository): DeleteDealerService => {
    return new DeleteDealerService(dealerRepository);
  },
  inject: [DealerRepository],
};
