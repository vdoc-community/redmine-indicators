import { AbstractBean } from './abstract-bean';

export class ChartTimedValue extends AbstractBean {
  date: Date;
  value: number;
}

export function parseChartTimedValue(json: any): ChartTimedValue {
  const chartTimedValue = new ChartTimedValue(json.id, json.name);
  chartTimedValue.date = new Date(json.date);
  chartTimedValue.value = json.value;
  return chartTimedValue;
}
