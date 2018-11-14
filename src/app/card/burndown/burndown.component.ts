import {Component, OnInit} from '@angular/core';
import {BurndownService} from '../../services/burndown.service';

@Component({
  selector: 'app-burndown',
  templateUrl: './burndown.component.html'
})
export class BurndownComponent implements OnInit {


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
    this.burndownService.findBurndown(null).subscribe((values) => {
      this.datasets[0].data = values;
    });
    this.burndownService.findIdeal(null).subscribe((values) => {
      this.datasets[1].data = values;
    });
  }

}
