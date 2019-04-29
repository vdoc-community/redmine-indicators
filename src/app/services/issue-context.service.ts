import { IssueScopeRef } from './beans/refs/issueScope-ref';
import { IssueScope } from 'src/app/services/beans/dto/issue-scope';
import { Injectable } from '@angular/core';
import { AbstractCrudService } from './abstract-crud-service';
import { IssueContext, parseIssueContext } from './beans/dto/issue-context';
import { RedmineClient } from './http/redmine-client.service';
import { Observable } from 'rxjs';
import { Page } from './beans/dto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IssueContextService extends AbstractCrudService<IssueContext> {

  constructor(redmineClient: RedmineClient) {
    super(redmineClient);
  }

  public findByScope(scope: IssueScope | IssueScopeRef): Observable<Page<IssueContext>> {
    return this.redmineClient.get(`/${this.endpoint()}/scope/${scope.id}`)
    .pipe(map(json => this.pageParser(json, this.parser.bind(this))));
  }

  protected endpoint(): string {
    return 'context';
  }

  protected parser(json: any): IssueContext {
    return parseIssueContext(json);
  }

}
