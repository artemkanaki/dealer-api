import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { routes } from '@config/app.routes';
import { createDealer } from '@modules/dealer/dealer.providers';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DealerResponse } from '@modules/dealer/dtos/dealer.response.dto';
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
    const dealer = await this.createUser.createUser(body);

    return new DealerResponse(dealer);
  }
}
