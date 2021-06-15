import { TypeormEntityBase } from 'src/infrastructure/database/base-classes/typeorm.entity.base';
import { Column, Entity, OneToOne } from 'typeorm';
import { DealerAddressOrmEntity } from '@modules/user/database/dealer-address.orm-entity';

@Entity('dealer')
export class DealerOrmEntity extends TypeormEntityBase {
  constructor(props?: DealerOrmEntity) {
    super(props);
  }

  @Column()
  agencyId!: string;

  @Column()
  email!: string;

  @Column()
  deleted!: boolean;

  @OneToOne(() => DealerAddressOrmEntity)
  address!: DealerAddressOrmEntity;
}
