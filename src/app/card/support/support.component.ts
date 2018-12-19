import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { Observable, interval, timer } from 'rxjs';
import { SimpleIndicator } from 'src/app/beans/simple-indicator';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html'
})
export class SupportComponent implements OnInit {
  public status: 'loading' | 'success' | 'error' = 'loading';
  public count: SimpleIndicator;

  constructor(private issuesService: IssuesService) {
  }

  ngOnInit() {
    timer(0, 15000)
    .pipe(
      switchMap(_ => this.issuesService.findSupportIssues())
    ).subscribe(
      (simpleIndicator: SimpleIndicator) => {
        this.count = simpleIndicator;
        this.status = 'success';
      },
      (error: any) => {
        this.status = 'error';
      });
  }

}
