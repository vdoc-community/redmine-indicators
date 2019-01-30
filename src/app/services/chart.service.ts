import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RedmineClient } from './http/redmine-client.service';
import { Iteration, BurndownChart, parseBurndownChart, ChartTimedValue } from './beans/dto';
import { Observable, of } from 'rxjs';
import { IterationRef, parseIterationRef } from './beans/refs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {


  constructor(
    private redmineClient: RedmineClient) {
  }

  public findBurndown(iteration: Iteration | IterationRef): Observable<BurndownChart> {
    return this.redmineClient.get(`/chart/burndown/${iteration.id}`).pipe(map(parseBurndownChart));
  }

  public findIdeal(iteration: Iteration | IterationRef): Observable<BurndownChart> {
    return this.redmineClient.get(`/chart/burndown/${iteration.id}/ideal`).pipe(map(parseBurndownChart));
  }


}
