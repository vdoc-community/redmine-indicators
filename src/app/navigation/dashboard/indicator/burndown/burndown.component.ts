import { BurndownChart } from './../../../../services/beans/dto/burndown-chart';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Iteration } from 'src/app/services/beans/dto';
import { ChartService } from 'src/app/services/chart.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-burndown',
  templateUrl: './burndown.component.html'
})
export class BurndownComponent implements OnInit {

  private readonly defaultDatasets = [{
    label: 'Real',
    lineTension: 0,
    data: [],
    borderColor: '#36A2EB',
    pointRadius: 0,
    fill: false
  }, {
    label: 'Ideal',
    borderColor: '#FF6384',
    borderDash: [5, 5],
    data: [],
    lineTension: 0,
    fill: false
  }];

  private _iteration: Iteration;

  @Input()
  set iteration(iteration: Iteration) {
    this._iteration = iteration;
    this.update();
  }

  get iteration(): Iteration {
    return this._iteration;
  }

  public options = {
    responsive: true,
    title: {
      display: false,
      text: 'Burndown'
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: false
    },
    scales: {
      xAxes: [{
        type: 'time',
        position: 'bottom',
        time: {
          // format: 'MM/DD/YYYY HH:mm',
          // round: 'day'
          tooltipFormat: 'll HH:mm'
        },
        scaleLabel: {
          display: true,
          labelString: 'Date'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Points'
        },
        ticks: {
          min: 0,
          stepSize: 10
        }
      }]
    }
  };

  public datasets: any;

  constructor(private chartService: ChartService) {
  }

  ngOnInit() {
    this.update();
  }

  private reset() {
    Object.assign(this.datasets, this.defaultDatasets);
    this.datasets[0].data = [];
    this.datasets[1].data = [];
  }

  private update() {
    if (!this.iteration) {
      this.reset();
      return;
    }
    const real$ = this.chartService.findBurndown(this.iteration);
    const ideal$ = this.chartService.findIdeal(this.iteration);

    forkJoin([real$, ideal$]).subscribe(results => {
      const real = results[0];
      const ideal = results[1];
      this.datasets = [];
      Object.assign(this.datasets, this.defaultDatasets);
      this.datasets[0].data = this.toChartJs(real);
      this.datasets[1].data = this.toChartJs(ideal);

    });
  }

  private toChartJs(burndownChart: BurndownChart): any[] {
    const points = [];
    burndownChart.values.forEach(value => {
      points.push({ x: value.date, y: value.value });
    });
    return points;
  }

}
