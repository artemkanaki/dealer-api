import {
  ArgumentNotProvidedException,
  ArgumentInvalidException,
  ArgumentOutOfRangeException,
} from '../exceptions';
import { Guard } from '../guard';
import { convertPropsToObject } from '../utils';
import { DateVO } from '../value-objects/date.value-object';
import { ID } from '../value-objects/id.value-object';

export interface BaseEntityProps {
  id: ID;
}

export abstract class Entity<EntityProps> {
  constructor(props: EntityProps) {
    this.validateProps(props);
    this._id = ID.generate();
    this.props = props;
  }

  protected readonly props: EntityProps;

  private readonly _id: ID;

  get id(): ID {
    return this._id;
  }

  static isEntity(entity: unknown): entity is Entity<unknown> {
    return entity instanceof Entity;
  }

  /**
   *  Check if two entities are the same Entity. Checks using ID field.
   * @param object Entity
   */
  public equals(object?: Entity<EntityProps>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity(object)) {
      return false;
    }

    return this.id ? this.id.equals(object.id) : false;
  }

  /**
   * Returns current **copy** of entity's props.
   * Modifying entity's state won't change previously created
   * copy returned by this method since it doesn't return a reference.
   * If a reference to a specific property is needed create a getter in parent class.
   *
   * @return {*}  {Props & EntityProps}
   * @memberof Entity
   */
  public getPropsCopy(): EntityProps & { id: ID } {
    const propsCopy = {
      id: this._id,
      ...this.props,
    };
    return Object.freeze(propsCopy);
  }

  /**
   * Convert to plain object. Mostly for debugging and testing purposes.
   */
  public toObject(): unknown {
    const propsCopy = convertPropsToObject(this.props);

    const result = {
      id: this._id.value,
      ...propsCopy,
    };
    return Object.freeze(result);
  }

  private validateProps(props: EntityProps) {
    const maxProps = 50;

    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        'Entity props should not be empty',
      );
    }
    if (typeof props !== 'object') {
      throw new ArgumentInvalidException('Entity props should be an object');
    }
    if (Object.keys(props).length > maxProps) {
      throw new ArgumentOutOfRangeException(
        `Entity props should not have more then ${maxProps} properties`,
      );
    }
  }
}
