import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html'
})
export class SupportComponent implements OnInit {

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

}
