import { IssueScope, parseIssueScope } from './beans/dto/issue-scope';
import { Injectable } from '@angular/core';
import { AbstractCrudService } from './abstract-crud-service';
import { RedmineClient } from './http/redmine-client.service';

@Injectable({
  providedIn: 'root'
})
export class IssueScopeService extends AbstractCrudService<IssueScope> {

  constructor(redmineClient: RedmineClient) {
    super(redmineClient);
  }
  protected endpoint(): string {
    return 'scope';
  }
  protected parser(json: any): IssueScope {
    return parseIssueScope(json);
  }
}
