import { EventsService } from './events.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RedmineClient } from './http/redmine-client.service';
import { Iteration, Page } from './beans/dto';
import { flatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IterationService {

  constructor(private redmineClient: RedmineClient) { }

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
    return this.redmineClient.get('/iteration').pipe(map(json => this.pageParser(json, this.parser)));
  }

  private parser(json: any): Iteration {
    const iteration = new Iteration(json.id, json.name);
    iteration.number = json.number;
    iteration.start = new Date(json.start);
    iteration.end = new Date(json.end);
    return iteration;
  }

  private pageParser<T>(json: any, parser: (item: any) => T): Page<T> {
    const page = new Page<T>();
    page.limit = json.limit;
    page.offset = json.offset;
    page.total_count = json.total_count;
    page.elements = [];
    json.elements.forEach(element => {
      page.elements.push(parser(element));
    });
    return page;
  }
}
