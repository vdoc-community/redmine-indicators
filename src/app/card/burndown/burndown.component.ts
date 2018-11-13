import {Component, OnInit} from '@angular/core';

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
    label: 'My First dataset',
    data: [
      20,
      5,
      3,
      10,
      3,
      3,
      9
    ]
  }, {
    label: 'My Second dataset',
    fill: false,
    data: [
      10,
      3,
      5,
      10,
      3,
      3,
      9
    ],
  }];

  labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  constructor() {
  }

  ngOnInit() {
  }

}
