import { ModelBaseResponse } from 'src/interface-adapters/dtos/model.base.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { DealerAddressEntity } from '@modules/dealer/domain/entities/dealer-address.entity';
import { DealerAddress } from '../../../interface-adapters/interfaces/dealer-address/dealer-address.interface';

export class DealerAddressResponse extends ModelBaseResponse implements DealerAddress {
  constructor(address: DealerAddressEntity) {
    super(address);

    this.dealerId = address.dealerId.value;
    this.country = address.country;
    this.city = address.city;
    this.postalCode = address.postalCode;
    this.street = address.street;
    this.streetNumber = address.streetNumber;
  }

  @ApiProperty({
    example: '2cdc8ab1-6d50-49cc-ba14-54e4ac7ec231',
    description: `Dealer's unique ID`,
  })
  dealerId: string;

  @ApiProperty({
    example: 'UA',
    description: `Dealer's country code`,
  })
  country: string;

  @ApiProperty({
    example: 'Kiev',
    description: `Dealer's city`,
  })
  city: string;

  @ApiProperty({
    example: '02002',
    description: `Dealer's postal code`,
  })
  postalCode: string;

  @ApiProperty({
    example: 'Vostochnaya Ul.',
    description: `Dealer's street`,
  })
  street: string;

  @ApiProperty({
    example: '14, apt 61',
    description: `Dealer's street`,
  })
  streetNumber: string;
}
