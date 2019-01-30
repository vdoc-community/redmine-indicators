import { AbstractBean } from './abstract-bean';
import { IterationRef, parseIterationRef } from '../refs';

export class Objective extends AbstractBean {

  constructor(id: number, name: string) {
    super(id, name);
  }

  iteration: IterationRef;
  description: string;
}

export function parseObjective(json: any): Objective {
  const objective = new Objective(json.id, json.name);
  objective.description = json.description;
  objective.iteration = parseIterationRef(json.iteration);
  return objective;
}
