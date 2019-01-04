import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { Iteration } from 'src/app/beans/iteration';
import { Category } from 'src/app/beans/category';
import { RedmineIndicatorsService } from 'src/app/services/redmine-indicators.service';

@Component({
  selector: 'app-open-tickets',
  templateUrl: './open-tickets.component.html'
})
export class OpenTicketsComponent implements OnInit {

  @Input()
  public iteration: Iteration;

  categories$: Observable<Category[]>;

  constructor(private redmineIndicators: RedmineIndicatorsService) {
  }

  ngOnInit() {
    this.categories$ = this.redmineIndicators.findCategories();
  }

}
