import {AbstractBean} from './abstract-bean';

export class Iteration extends AbstractBean {
  start: Date;
  end: Date;
  number: number;
  plannedDevelopmentCost: number;
}

export function parseIteration(json: any): Iteration {
  const iteration = new Iteration(json.id, json.name);
  iteration.number = json.number;
  iteration.plannedDevelopmentCost = json.plannedDevelopmentCost;
  iteration.start = new Date(json.start);
  iteration.end = new Date(json.end);
  return iteration;
}
