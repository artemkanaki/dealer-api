import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { routes } from '@config/app.routes';
import { createDealer } from '@modules/user/dealer.providers';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DealerResponse } from '@modules/user/dtos/dealer.response.dto';
import { CreateDealerCommand } from './create-dealer.command';
import { CreateDealerService } from './create-dealer.service';
import { CreateDealerRequest } from './create-dealer.request.dto';

@Controller()
export class CreateUserHttpController {
  constructor(
    @Inject(createDealer)
    private readonly createUser: CreateDealerService,
  ) {}

  @Post(routes.user.root)
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DealerResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Dealer already exists',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async create(@Body() body: CreateDealerRequest): Promise<DealerResponse> {
    const command = new CreateDealerCommand({
      email: body.email,
      agencyId: body.agencyId,
      country: body.address.country,
      city: body.address.city,
      postalCode: body.address.postalCode,
      street: body.address.street,
      streetNumber: body.address.streetNumber,
    });

    const dealer = await this.createUser.createUser(command);

    return new DealerResponse(dealer);
  }
}
