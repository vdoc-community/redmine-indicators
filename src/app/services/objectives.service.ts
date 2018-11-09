import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Objective} from '../beans/objective';

@Injectable()
export class ObjectivesService {

  constructor() {
  }

  public findObjectives(): Observable<Objective[]> {
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
