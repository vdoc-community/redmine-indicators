import { Injectable } from '@angular/core';
import { ReleaseNoteIssue, parseReleaseNoteIssue } from './beans/dto/release-note-issue';
import { AbstractCrudService } from './abstract-crud-service';
import { RedmineClient } from './http/redmine-client.service';
import { Page } from './beans/dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReleaseNoteIssueService extends AbstractCrudService<ReleaseNoteIssue> {

  constructor(redmineClient: RedmineClient) {
    super(redmineClient);
  }
  protected endpoint(): string {
    return 'issues';
  }
  protected parser(json: any): ReleaseNoteIssue {
    return parseReleaseNoteIssue(json);
  }

  public findAllByReleaseNoteId(releaseNoteId: number): Observable<Page<ReleaseNoteIssue>> {
    return this.redmineClient.get(`/${this.endpoint()}/releaseNote/${releaseNoteId}`)
    .pipe(map(json => this.pageParser(json, this.parser.bind(this))));
  }
}
