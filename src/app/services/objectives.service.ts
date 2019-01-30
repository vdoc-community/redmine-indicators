import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Iteration, Objective, Page } from './beans/dto';
import { AbstractCrudService } from './abstract-crud-service';
import { RedmineClient } from './http/redmine-client.service';
import { IterationRef } from './beans/refs/iteration-ref';
import { parseObjective } from './beans/dto/objective';

@Injectable()
export class ObjectivesService extends AbstractCrudService<Objective> {

  constructor(redmineClient: RedmineClient) {
    super(redmineClient);
  }

  public findByIteration(iteration: Iteration | IterationRef): Observable<Page<Objective>> {
    return this.redmineClient.get(`/${this.endpoint()}/iteration/${iteration.id}`)
      .pipe(map(json => this.pageParser(json, this.parser.bind(this))));
  }

  protected endpoint(): string {
    return 'objective';
  }

  protected parser(json: any): Objective {
    return parseObjective(json);
  }

}
