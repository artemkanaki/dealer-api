import { CreateDealer } from '@adapters/interfaces/dealer/create-dealer.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDealerAddressRequest } from '@modules/user/use-cases/create-dealer/create-dealer-address.request.dto';

export class CreateDealerRequest implements CreateDealer {
  @ApiProperty({
    example: 'john@gmail.com',
    description: 'User email address',
  })
  @MaxLength(320)
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'FR', description: 'Country of residence' })
  @MaxLength(50)
  @IsString()
  agencyId!: string;

  @ApiProperty({ type: () => CreateDealerAddressRequest })
  @ValidateNested()
  @Type(() => CreateDealerAddressRequest)
  address!: CreateDealerAddressRequest;
}
