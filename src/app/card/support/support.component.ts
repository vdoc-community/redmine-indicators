import {Component, OnInit} from '@angular/core';
import {IssuesService} from '../../services/issues.service';
import {Observable} from 'rxjs';
import { SimpleIndicator, SimpleIndicator } from 'src/app/beans/simple-indicator';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html'
})
export class SupportComponent implements OnInit {

  public count: SimpleIndicator;

  constructor(private issuesService: IssuesService) {
  }

  ngOnInit() {
    this.issuesService.findSupportIssues().subscribe((simpleIndicator: SimpleIndicator) => {
      this.count = simpleIndicator;
    });
  }

}
