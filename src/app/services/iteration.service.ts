import { EventsService } from './events.service';
import { Page } from './../beans/page';
import { Iteration } from './../beans/iteration';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RedmineAwareClientService } from './http/redmine-aware-client.service';

@Injectable({
  providedIn: 'root'
})
export class IterationService {

  constructor(private redmineClient: RedmineAwareClientService) {}

  public findIterationById(id: number): Observable<Iteration> {
    const it = new Iteration(id, `Iteration ${id}`);
    it.start = new Date();
    it.end = new Date();
    return of(it);
  }

  public saveIteration(iteration: Iteration): Observable<Iteration> {
    return this.redmineClient.post('/iteration', iteration);
  }
  public updateIteration(iteration: Iteration): Observable<Iteration> {
    return this.redmineClient.put(`/iteration/${iteration.id}`, iteration);
  }

  public findIterations(): Observable<Page<Iteration>> {
    return this.redmineClient.get('/iteration');
  }
}
