import { AbstractRef, parserRef as parseRef } from './abstract-ref';
export class IssueContextRef extends AbstractRef {

}

export function parseIssueContextRef(json: any): IssueContextRef {
  if (json === undefined) {
    return null;
  } else {
    return parseRef(json, new IssueContextRef());
  }
}
