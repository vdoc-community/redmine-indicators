import {AbstractBean} from './abstract-bean';

export class IssueScope extends AbstractBean {
}

export function parseIssueScope(json: any): IssueScope {
  const issueScope = new IssueScope(json.id, json.name);
  return issueScope;
}
