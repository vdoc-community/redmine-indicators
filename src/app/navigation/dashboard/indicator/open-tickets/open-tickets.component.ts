import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { RedmineIndicatorsService } from 'src/app/services/redmine-indicators.service';
import { Iteration, Category } from 'src/app/services/beans/dto';

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
