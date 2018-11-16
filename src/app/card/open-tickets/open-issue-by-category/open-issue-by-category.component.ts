import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../../beans/category';
import {OpenTicketsService} from '../../../services/open-tickets.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-open-issue-by-category',
  templateUrl: './open-issue-by-category.component.html',
  styleUrls: ['./open-issue-by-category.component.scss']
})
export class OpenIssueByCategoryComponent implements OnInit {

  @Input()
  public category: Category;

  public issues$: Observable<number>

  constructor(private openTicketsService: OpenTicketsService) {
  }

  ngOnInit() {
    this.issues$ = this.openTicketsService.findOpenTickets(null, this.category);
  }

}
