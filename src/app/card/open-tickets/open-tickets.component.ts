import {Component, OnInit} from '@angular/core';
import {OpenTicketsService} from '../../services/open-tickets.service';
import {RedmineIndicatorsService} from '../../services/redmine-indicators.service';
import {Observable} from 'rxjs';
import {Category} from '../../beans/category';

@Component({
  selector: 'app-open-tickets',
  templateUrl: './open-tickets.component.html'
})
export class OpenTicketsComponent implements OnInit {

  chartOptions = {
    responsive: true,
    legend: {
      display: false
    },
    title: {
      display: true,
      position: 'left'
    }
  };

  categories: Observable<Category[]>;

  chartData = [];

  chartLabels = [''];

  constructor(private redmineIndicators: RedmineIndicatorsService, private openTicketsService: OpenTicketsService) {
  }

  ngOnInit() {
    this.categories = this.redmineIndicators.findCategories();
    this.categories.subscribe((categories) => {
      this.chartData = [];
      categories.forEach((category) => {
        this.openTicketsService.findOpenTickets(null, category).subscribe((nb) => {
          const data = [];
          data.push(nb);
          this.chartData.push({data: data, label: category.name});
        });
      });
    });
  }

}
