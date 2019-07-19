import { AbstractBean } from './abstract-bean';
import { IssueScopeRef, ReleaseNoteRef, parseIssueScopeRef, parseReleaseNoteRef } from '../refs';
import { IssueContext, parseIssueContext } from './issue-context';

export class ReleaseNoteIssue extends AbstractBean {
  scope: IssueScopeRef;
  context: IssueContext;
  releaseNote: ReleaseNoteRef;
  problem: string;
  issueId: number;
  add: boolean;

  constructor(id: number,  name: string) {
    super(id, name);
  }
}

export function parseReleaseNoteIssue(json: any): ReleaseNoteIssue {
  const releaseNoteIssue = new ReleaseNoteIssue(json.id, json.name);
  releaseNoteIssue.scope = parseIssueScopeRef(json.scope);
  releaseNoteIssue.context = parseIssueContext(json.context);
  releaseNoteIssue.problem = json.problem;
  releaseNoteIssue.issueId = json.issueId;
  releaseNoteIssue.releaseNote = parseReleaseNoteRef(json.releaseNote);
  releaseNoteIssue.add = json.add;
  return releaseNoteIssue;
}
