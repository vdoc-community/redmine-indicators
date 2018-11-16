import {Component, OnInit} from '@angular/core';
import {IssuesService} from '../../services/issues.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html'
})
export class SupportComponent implements OnInit {

  public count: Observable<number>;

  constructor(private issuesService: IssuesService) {
  }

  ngOnInit() {
    this.count = this.issuesService.findSupportIssues();
  }

}
