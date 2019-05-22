import { IssueScopeRef, parseIssueScopeRef } from '../refs/issue-scope-ref';
import {AbstractBean} from './abstract-bean';

export class IssueContext extends AbstractBean {
  scope: IssueScopeRef;
  description: string;

  constructor(id: number, name: string, description?: string, scope?: IssueScopeRef) {
    super(id, name);
    if (description) {
      this.description = description;
    }
    if (scope) {
      this.scope = scope;
    }
  }
}

export function parseIssueContext(json: any): IssueContext {
  const issueContext = new IssueContext(json.id, json.name);
  issueContext.description = json.description;
  issueContext.scope = parseIssueScopeRef(json.scope);
  return issueContext;
}
