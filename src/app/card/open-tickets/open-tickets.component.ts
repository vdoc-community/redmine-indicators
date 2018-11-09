import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-open-tickets',
  templateUrl: './open-tickets.component.html',
  styleUrls: ['./open-tickets.component.css']
})
export class OpenTicketsComponent implements OnInit {

  chartOptions = {
    responsive: true
  };

  chartData = [
    {data: [330, 600, 260, 700], label: 'Account A'},
    {data: [120, 455, 100, 340], label: 'Account B'},
    {data: [45, 67, 800, 500], label: 'Account C'}
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];

  constructor() {
  }

  ngOnInit() {
  }

  onChartClick(event) {
    console.log(event);
  }


}
