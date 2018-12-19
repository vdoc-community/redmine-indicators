import { EventsService } from './events.service';
import { Page } from './../beans/page';
import { Iteration } from './../beans/iteration';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IterationService {

  constructor(private eventsService: EventsService) {}

  public findIterationById(id: number): Observable<Iteration> {
    const it = new Iteration(id, `Iteration ${id}`);
    it.start = new Date();
    it.end = new Date();
    return of(it);
  }

  public saveIteration(iteration: Iteration): Observable<Iteration> {
    this.eventsService.publish({message: 'iterations saved'});
    return of(iteration);
  }
  public updateIteration(iteration: Iteration): Observable<Iteration> {
    this.eventsService.publish({message: 'iterations updated'});
    return of(iteration);
  }

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
