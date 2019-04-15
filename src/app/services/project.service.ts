import { Project, parseProject } from './beans/dto/project';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RedmineClient } from './http/redmine-client.service';
import { map } from 'rxjs/operators';
import { AbstractCrudService } from './abstract-crud-service';
import { Page } from './beans/dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends AbstractCrudService<Project> {

  constructor(redmineClient: RedmineClient) {
    super(redmineClient);
  }

  public findProjects(limit: string): Observable<Page<Project>> {
    return this.redmineClient.get(`/project?limit=${limit}`).pipe(map(json => this.pageParser(json, this.parser)));
  }

  protected endpoint(): string {
    return 'project';
  }

  protected parser(json: any): Project {
    return parseProject(json);
  }
}
