import { Page } from './../beans/page';
import { Iteration } from './../beans/iteration';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IterationService {
  constructor() {}

  public findIterations(): Observable<Page<Iteration>> {
    const iterations = [];
    iterations.push(new Iteration(0, '53'));
    iterations.push(new Iteration(1, '54'));
    const page: Page<Iteration> = {
      total_count: 3,
      offset: 0,
      limit: 25,
      elements: iterations
    };
    return of(page);
  }
}
