import { TypeormEntityBase } from 'src/infrastructure/database/base-classes/typeorm.entity.base';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { DealerOrmEntity } from '@modules/user/database/dealer.orm-entity';

@Entity('address')
export class DealerAddressOrmEntity extends TypeormEntityBase {
  constructor(props?: DealerAddressOrmEntity) {
    super(props);
  }

  @Column()
  dealerId!: string;

  @Column()
  country!: string;

  @Column()
  city!: string;

  @Column()
  postalCode!: string;

  @Column()
  street!: string;

  @Column()
  streetNumber!: string;

  @OneToOne(() => DealerOrmEntity)
  @JoinColumn({ name: 'dealer_id', referencedColumnName: 'id' })
  dealer?: DealerOrmEntity;
}
