import { AbstractBean } from './abstract-bean';
import { IterationRef, parseIterationRef } from '../refs';
import { ChartTimedValue, parseChartTimedValue } from './chart-timed-value';

export class BurndownChart extends AbstractBean {
  iteration: IterationRef;
  values: ChartTimedValue[] = [];
}

export function parseBurndownChart(json: any): BurndownChart {
  const burndownChart = new BurndownChart(json.id, json.name);
  burndownChart.iteration = parseIterationRef(json.iteration);
  if (json.values) {
    json.values.forEach(element => {
      burndownChart.values.push(parseChartTimedValue(element));
    });
  }
  return burndownChart;
}
