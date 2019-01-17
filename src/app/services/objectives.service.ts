import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Iteration, Objective } from './beans/dto';
import { AbstractCrudService } from './abstract-crud-service';
import { RedmineClient } from './http/redmine-client.service';

@Injectable()
export class ObjectivesService extends AbstractCrudService<Objective> {

  constructor(redmineClient: RedmineClient) {
    super(redmineClient);
  }

  public findObjectives(iteration: Iteration): Observable<Objective[]> {
    const objectives: Objective[] = [];

    for (let i = 0; i < 2; i++) {
      const objective: Objective = new Objective(1, '');
      objective.summary = 'Objective ' + i;
      objective.description = 'Objective description' + i;
      objectives.push(objective);
    }

    return of(objectives);
  }

  protected endpoint(): string {
    return 'objective';
  }

  protected parser(json: any): Objective {
    const objective = new Objective(json.id, json.name);
    objective.summary = json.summary;
    objective.description = json.description;
    return objective;
  }

}
