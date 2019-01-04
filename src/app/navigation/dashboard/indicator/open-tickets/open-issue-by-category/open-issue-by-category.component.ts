import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { Iteration } from 'src/app/beans/iteration';
import { Category } from 'src/app/beans/category';
import { IssuesService } from 'src/app/services/issues.service';

@Component({
  selector: 'app-open-issue-by-category',
  templateUrl: './open-issue-by-category.component.html',
  styleUrls: ['./open-issue-by-category.component.scss']
})
export class OpenIssueByCategoryComponent implements OnInit {

  @Input()
  public iteration: Iteration;

  @Input()
  public category: Category;

  public issues$: Observable<number>;

  constructor(private openTicketsService: IssuesService) {
  }

  ngOnInit() {
    this.issues$ = this.openTicketsService.findOpenTickets(this.iteration, this.category);
  }

}
