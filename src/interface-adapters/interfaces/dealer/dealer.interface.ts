import { ModelBase } from '../model.base.interface';
import { DealerAddress } from '../dealer-address/dealer-address.interface';

export interface Dealer extends ModelBase {
  agencyId: string;
  email: string;
  address: DealerAddress;
}
