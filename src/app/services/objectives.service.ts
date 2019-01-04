import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import { Iteration, Objective } from './beans/dto';

@Injectable()
export class ObjectivesService {

  constructor() {
  }

  public findObjectives(iteration: Iteration): Observable<Objective[]> {
    const objectives: Objective[] = [];

    for (let i = 0; i < 2; i++) {
      const objective: Objective = new Objective();
      objective.summary = 'Objective ' + i;
      objective.description = 'Objective description' + i;
      objectives.push(objective);
    }

    return of(objectives);
  }
}
