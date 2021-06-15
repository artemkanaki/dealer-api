import { Controller, Delete, Inject, Param } from '@nestjs/common';
import { routes } from '@config/app.routes';
import { deleteDealer } from '@modules/user/dealer.providers';
import { DeleteDealerService } from './delete-dealer.service';

@Controller()
export class DeleteDealerHttpController {
  constructor(
    @Inject(deleteDealer)
    private readonly service: DeleteDealerService,
  ) {}

  @Delete(routes.user.delete)
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.service.delete(id);
  }
}
