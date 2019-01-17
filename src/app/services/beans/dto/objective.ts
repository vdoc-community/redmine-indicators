import { AbstractBean } from './abstract-bean';

export class Objective extends AbstractBean {

  constructor(id: number, name: string) {
    super(id, name);
  }

  summary: string;
  description: string;
}
