import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Objective} from '../beans/objective';
import {Iteration} from '../beans/iteration';

@Injectable({
  providedIn: 'root'
})
export class BurndownService {

  constructor() {
  }

  public findBurndown(iteration: Iteration): Observable<Number[]> {
    return of([ 20, 15, 14, 10, 8, 5, 0 ]);
  }

  public findIdeal(iteration: Iteration): Observable<Number[]> {
    return of([ 20, 19, 18, 10, 2, 1, 0 ]);
  }
}
