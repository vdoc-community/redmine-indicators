import {AbstractBean} from './abstract-bean';

export class Project extends AbstractBean {

  constructor(id: number, name: string) {
    super(id, name);
  }
}
