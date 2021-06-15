import { CreateDealerAddress } from '@adapters/interfaces/dealer-address/create-dealer-address.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateDealerAddressRequest implements CreateDealerAddress {
  @ApiProperty({
    example: 'UA',
    description: `Dealer's country code`,
  })
  @MaxLength(2)
  @IsString()
  country!: string;

  @ApiProperty({
    example: 'Kiev',
    description: `Dealer's city`,
  })
  @MaxLength(50)
  @IsString()
  city!: string;

  @ApiProperty({
    example: '02002',
    description: `Dealer's postal code`,
  })
  @MaxLength(10)
  @IsString()
  postalCode!: string;

  @ApiProperty({
    example: 'Vostochnaya Ul.',
    description: `Dealer's street`,
  })
  @MaxLength(255)
  @IsString()
  street!: string;

  @ApiProperty({
    example: '14, apt 61',
    description: `Dealer's street`,
  })
  @MaxLength(255)
  @IsString()
  streetNumber!: string;
}
