import { IssueScope } from './issue-scope';
import { IssueScopeRef, parseIssueScopeRef } from './../refs/issue-scope-ref';
import {AbstractBean} from './abstract-bean';
import { IssueContextRef, parseIssueContextRef } from '../refs/issue-context-ref';
import { ReleaseNoteRef, parseReleaseNoteRef } from '../refs/release-note-ref';
import { ReleaseNote } from './release-note';

export class ReleaseNoteIssue extends AbstractBean {
  scope: IssueScopeRef | IssueScope;
  context: IssueContextRef | IssueScope;
  releaseNote: ReleaseNoteRef | ReleaseNote;
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
  releaseNoteIssue.context = parseIssueContextRef(json.context);
  releaseNoteIssue.problem = json.problem;
  releaseNoteIssue.issueId = json.issueId;
  releaseNoteIssue.releaseNote = parseReleaseNoteRef(json.releaseNote);
  releaseNoteIssue.add = json.add;
  return releaseNoteIssue;
}
