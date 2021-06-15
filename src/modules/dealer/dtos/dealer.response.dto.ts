import { DealerEntity } from '@modules/dealer/domain/entities/dealer.entity';
import { ModelBaseResponse } from 'src/interface-adapters/dtos/model.base.response.dto';
import { Dealer } from 'src/interface-adapters/interfaces/dealer/dealer.interface';
import { ApiProperty } from '@nestjs/swagger';
import { DealerAddressResponse } from '@modules/dealer/dtos/dealer-address.response.dto';

export class DealerResponse extends ModelBaseResponse implements Dealer {
  constructor(dealer: DealerEntity) {
    super(dealer);
    /* Whitelisting returned data to avoid leaks.
       If a new property is added, like password or a
       credit card number, it won't be returned
       unless you specifically allow this.
       (avoid blacklisting, which will return everything
        but blacklisted items, which can lead to a data leak).
    */
    this.agencyId = dealer.agencyId;
    this.email = dealer.email.value;
    this.address = new DealerAddressResponse(dealer.address);
  }

  @ApiProperty({
    example: 'loremipsum',
    description: `Dealer's agency ID`,
  })
  agencyId: string;

  @ApiProperty({
    example: 'example@example.com',
    description: `Dealer's email`,
  })
  email: string;

  @ApiProperty({
    example: 'France',
    description: `Dealer's address`,
    type: DealerAddressResponse,
  })
  address: DealerAddressResponse;
}
