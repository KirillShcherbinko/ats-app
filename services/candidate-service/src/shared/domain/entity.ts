import { UniqueId } from '../kernel/unique-id';

export abstract class Entity<T> {
  protected readonly _id: UniqueId;
  protected readonly props: T;

  protected constructor(props: T, id?: UniqueId) {
    this._id = id || UniqueId.create();
    this.props = props;
  }

  get id(): UniqueId {
    return this._id;
  }

  equals(other: Entity<T>): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    if (this.constructor !== other.constructor) {
      return false;
    }
    return this._id.equals(other.id);
  }
}