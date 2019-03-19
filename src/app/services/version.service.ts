import { Version, parseVersion } from './beans/dto/version';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RedmineClient } from './http/redmine-client.service';
import { map } from 'rxjs/operators';
import { AbstractCrudService } from './abstract-crud-service';
import { Page } from './beans/dto';

@Injectable({
  providedIn: 'root'
})
export class VersionService extends AbstractCrudService<Version> {

  constructor(redmineClient: RedmineClient) {
    super(redmineClient);
  }

  public findByProject(project: number): Observable<Page<Version>> {
    return this.redmineClient.get('/version/project/' + project).pipe(map(json => this.pageParser(json, this.parser)));
  }

  protected endpoint(): string {
    return 'version';
  }

  protected parser(json: any): Version {
    return parseVersion(json);
  }
}
