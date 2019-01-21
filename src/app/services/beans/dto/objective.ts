import { AbstractBean } from './abstract-bean';
import { IterationRef } from '../refs/iteration-ref';

export class Objective extends AbstractBean {

  constructor(id: number, name: string) {
    super(id, name);
  }

  iteration: IterationRef;
  description: string;
}
