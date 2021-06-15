import { ApiProperty } from '@nestjs/swagger';
import { ModelBase } from '../interfaces/model.base.interface';
import { BaseEntityProps } from '../../core/base-classes/entity.base';

export class ModelBaseResponse implements ModelBase {
  constructor(entity: BaseEntityProps) {
    this.id = entity.id.value;
  }

  @ApiProperty({ example: '2cdc8ab1-6d50-49cc-ba14-54e4ac7ec231' })
  id: string;
}
