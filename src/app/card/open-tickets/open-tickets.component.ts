import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-open-tickets',
  templateUrl: './open-tickets.component.html'
})
export class OpenTicketsComponent implements OnInit {

  chartOptions = {
    responsive: true
  };

  chartData = [
    {data: [3], label: 'Ité - Dev'},
    {data: [1], label: 'Ité - Support'},
    {data: [2], label: 'Ité - Test'},
    {data: [2], label: 'Ité - Intégration'}
  ];

  chartLabels = [''];

  constructor() {
  }

  ngOnInit() {
  }

  onChartClick(event) {
    console.log(event);
  }


}
