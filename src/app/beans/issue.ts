import {AbstractBean} from './abstract-bean';

export class Issue extends AbstractBean {

  constructor(id: number, name: string) {
    super(id, name);
  }
}
