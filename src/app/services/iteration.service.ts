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
    let it = new Iteration(0, '53');
    it.start = new Date();
    it.end = new Date();
    iterations.push(it);
    it = new Iteration(1, '54');
    it.start = new Date();
    it.end = new Date();
    iterations.push(it);
    const page: Page<Iteration> = {
      total_count: 2,
      offset: 0,
      limit: 25,
      elements: iterations
    };
    return of(page);
  }
}
