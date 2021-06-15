import { DealerRepositoryPort } from '@modules/user/database/dealer.repository.interface';

export class DeleteDealerService {
  constructor(private readonly dealerRepo: DealerRepositoryPort) {}

  async delete(id: string): Promise<void> {
    const dealer = await this.dealerRepo.findOneByIdOrThrow(id);

    dealer.delete();

    await this.dealerRepo.save(dealer);
  }
}
