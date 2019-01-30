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

  public findIdeal(iteration: Iteration): Observable<BurndownChart> {
    const burndownChart = new BurndownChart(-1, `ideal iteration ${iteration.id}`);
    burndownChart.iteration = parseIterationRef(iteration);
    const startValue = new ChartTimedValue(0, 'start');
    startValue.date = iteration.start;
    startValue.value = 142;
    burndownChart.values.push(startValue);

    const endValue = new ChartTimedValue(0, 'end');
    endValue.date = iteration.end;
    endValue.value = 0;
    burndownChart.values.push(endValue);

    return of(burndownChart);
  }


}
