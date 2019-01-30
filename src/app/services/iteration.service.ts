import { EventsService } from './events.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RedmineClient } from './http/redmine-client.service';
import { Iteration, Page, parseIteration } from './beans/dto';
import { flatMap, map } from 'rxjs/operators';
import { AbstractCrudService } from './abstract-crud-service';

@Injectable({
  providedIn: 'root'
})
export class IterationService extends AbstractCrudService<Iteration> {


  constructor(redmineClient: RedmineClient) {
    super(redmineClient);
  }

  public findCurrent(): Observable<Iteration> {
    return this.redmineClient.get(`/iteration/current`);
  }

  protected endpoint(): string {
    return 'iteration';
  }

  protected parser(json: any): Iteration {
    return parseIteration(json);
  }

}
