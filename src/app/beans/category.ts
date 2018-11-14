import {AbstractBean} from './abstract-bean';

export class Category extends AbstractBean {

  constructor(id: number, name: string) {
    super(id, name);
  }
}
