import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { IssuesService } from 'src/app/services/issues.service';
import { Iteration, Category } from 'src/app/services/beans/dto';

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
    // this.issues$ = this.openTicketsService.findOpenTickets(this.iteration, this.category);
  }

}
