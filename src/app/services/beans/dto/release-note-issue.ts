import { IssueContext } from 'src/app/services/beans/dto/issue-context';
import { IssueScope } from './issue-scope';
import {AbstractBean} from './abstract-bean';
import { ReleaseNote } from './release-note';

export class ReleaseNoteIssue extends AbstractBean {
  scope: IssueScope;
  context: IssueContext;
  releaseNote: ReleaseNote;
  problem: string;
  issueId: number;
  add: boolean;

  constructor(id: number,
              name: string,
              scope?: IssueScope,
              context?: IssueContext,
              problem?: string,
              issueId?: number,
              releaseNote?: ReleaseNote,
              add?: boolean) {
    super(id, name);
    this.scope = scope;
    this.context = context;
    this.problem = problem;
    this.issueId = issueId;
    this.releaseNote = releaseNote;
    this.add = add;
  }
}

export function parseReleaseNoteIssue(json: any): ReleaseNoteIssue {
  const releaseNoteIssue = new ReleaseNoteIssue(json.id, json.name);
  releaseNoteIssue.scope = json.scope;
  releaseNoteIssue.context = json.context;
  releaseNoteIssue.problem = json.problem;
  releaseNoteIssue.issueId = json.issueId;
  releaseNoteIssue.releaseNote = json.releaseNote;
  releaseNoteIssue.add = json.add;
  return releaseNoteIssue;
}
