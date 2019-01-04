import { EventsService } from './events.service';
import { Page } from './../beans/page';
import { Iteration } from './../beans/iteration';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RedmineClient } from './http/redmine-client.service';

@Injectable({
  providedIn: 'root'
})
export class IterationService {

  constructor(private redmineClient: RedmineClient) {}

  public findIterationById(id: number): Observable<Iteration> {
    return this.redmineClient.get(`/iteration/${id}`);
  }

  public findCurrentIteration(): Observable<Iteration> {
    return this.redmineClient.get(`/iteration/current`);
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
