import {Injectable} from '@angular/core';
import {Iteration} from '../beans/iteration';
import {Category} from '../beans/category';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  constructor() {
  }

  public findOpenTickets(iteration: Iteration, category: Category): Observable<number> {
    return of(3);
  }

  public findSupportIssues(): Observable<number> {
    return of(15);
  }

}
