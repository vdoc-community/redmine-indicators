import { AbstractRef, parserRef as parseRef } from './abstract-ref';
import { Iteration } from '../dto';
import { identifierModuleUrl } from '@angular/compiler';

export class IssueScopeRef extends AbstractRef {

}

export function parseIssueScopeRef(json: any): IssueScopeRef {
  return parseRef(json, new IssueScopeRef());
}
