import {Component, Input, OnInit} from '@angular/core';
import { BurndownService } from 'src/app/services/burndown.service';
import { Iteration } from 'src/app/services/beans/dto';

@Component({
  selector: 'app-burndown',
  templateUrl: './burndown.component.html'
})
export class BurndownComponent implements OnInit {

  private _iteration: Iteration;

  @Input()
  set iteration(iteration: Iteration) {
    this._iteration = iteration;
    this.iteration ? this.update() : this.reset();
  }

  get iteration(): Iteration {
    return this._iteration;
  }

  options = {
    responsive: true,
    title: {
      display: true,
      text: 'Chart.js Line Chart'
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Day'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Points'
        }
      }]
    }
  };

  datasets = [{
    label: 'Burndown',
    data: []
  }, {
    label: 'Ideal',
    fill: false,
    data: [],
  }];

  labels = [];

  constructor(private burndownService: BurndownService) {
  }

  ngOnInit() {
  }

  private reset() {
  }

  private update() {
    let currentDay: Date = new Date(this.iteration.start);
    let dayCount = 0;
    while (this.iteration.end < currentDay) {
      this.labels.push(currentDay);
      dayCount++;
      currentDay = new Date(currentDay.setDate(currentDay.getDate() + dayCount));
    }

    this.burndownService.findBurndown(this.iteration).subscribe((values) => {
      this.datasets[0].data = values;
    });
    this.burndownService.findIdeal(this.iteration).subscribe((values) => {
      this.datasets[1].data = values;
    });
  }

}
