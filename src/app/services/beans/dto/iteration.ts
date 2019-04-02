import {AbstractBean, stringifyAbstractBean} from './abstract-bean';
import { parseLocalDate, stringifyLocalDate } from './date-io';

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
  iteration.start = parseLocalDate(json.start);
  iteration.end = parseLocalDate(json.end);
  return iteration;
}

export function stringifyIteration(bean: Iteration): any {
  const json = stringifyAbstractBean(bean);
  json.number = bean.number;
  json.plannedDevelopmentCost = bean.plannedDevelopmentCost;
  json.start = stringifyLocalDate(bean.start);
  json.end = stringifyLocalDate(bean.end);
  return json;
}
