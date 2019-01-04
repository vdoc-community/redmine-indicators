import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { Iteration } from 'src/app/beans/iteration';
import { BurndownService } from 'src/app/services/burndown.service';

@Component({
  selector: 'app-burndown',
  templateUrl: './burndown.component.html'
})
export class BurndownComponent implements OnInit {

  @Input()
  public iteration: Iteration;

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
          labelString: 'Month'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Value'
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

  labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  constructor(private burndownService: BurndownService) {
  }

  ngOnInit() {
    this.burndownService.findBurndown(this.iteration).subscribe((values) => {
      this.datasets[0].data = values;
    });
    this.burndownService.findIdeal(this.iteration).subscribe((values) => {
      this.datasets[1].data = values;
    });
  }

}
