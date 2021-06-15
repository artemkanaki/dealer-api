import { PrimaryColumn } from 'typeorm';

export abstract class TypeormEntityBase {
  protected constructor(props?: unknown) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @PrimaryColumn({ update: false })
  id!: string;
}
