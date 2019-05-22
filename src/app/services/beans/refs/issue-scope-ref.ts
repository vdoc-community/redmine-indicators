import { IssueScope } from './../dto/issue-scope';
import { AbstractRef, parserRef as parseRef } from './abstract-ref';

export class IssueScopeRef extends AbstractRef {

}

export function parseIssueScopeRef(json: any): IssueScopeRef {
  if (json === undefined) {
    return null;
  } else {
    return parseRef(json, new IssueScopeRef());
  }
}
