import { CreateDealerAddress } from '@adapters/interfaces/dealer-address/create-dealer-address.interface';

export interface CreateDealer {
  agencyId: string;
  email: string;
  address: CreateDealerAddress;
}
