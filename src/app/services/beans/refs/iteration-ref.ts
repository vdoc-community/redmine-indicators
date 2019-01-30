import { AbstractRef, parserRef as parseRef } from './abstract-ref';
import { Iteration } from '../dto';
import { identifierModuleUrl } from '@angular/compiler';

export class IterationRef extends AbstractRef {

}

export function parseIterationRef(json: any): IterationRef {
  return parseRef(json, new IterationRef());
}
