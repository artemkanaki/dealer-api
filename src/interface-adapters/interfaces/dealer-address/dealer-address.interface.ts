import { ModelBase } from '../model.base.interface';

export interface DealerAddress extends ModelBase {
  dealerId: string;
  country: string;
  city: string;
  postalCode: string;
  street: string;
  streetNumber: string;
}
