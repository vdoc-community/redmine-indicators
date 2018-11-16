import {Component, OnInit} from '@angular/core';
import {RedmineIndicatorsService} from '../../services/redmine-indicators.service';
import {Observable} from 'rxjs';
import {Category} from '../../beans/category';

@Component({
  selector: 'app-open-tickets',
  templateUrl: './open-tickets.component.html'
})
export class OpenTicketsComponent implements OnInit {

  categories: Observable<Category[]>;

  constructor(private redmineIndicators: RedmineIndicatorsService) {
  }

  ngOnInit() {
    this.categories = this.redmineIndicators.findCategories();
  }

}
