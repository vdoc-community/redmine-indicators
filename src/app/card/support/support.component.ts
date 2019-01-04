import { Component, OnInit, OnDestroy } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { timer, of, Subscription } from 'rxjs';
import { SimpleIndicator } from 'src/app/beans/simple-indicator';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html'
})
export class SupportComponent implements OnInit, OnDestroy {

  private issuesService: IssuesService;

  public status: 'loading' | 'success' | 'error' = 'loading';
  public count: SimpleIndicator;
  private timmer: Subscription;

  constructor(issuesService: IssuesService) {
    this.issuesService = issuesService;
  }

  ngOnInit() {
    this.timmer = timer(0, 15000)
      .pipe(switchMap(_ => this.issuesService.findSupportIssues().pipe(catchError((error: Error) => {
        return of(error);
      }))))
      .subscribe((simpleIndicator: SimpleIndicator | Error) => {
        if (simpleIndicator instanceof Error) {
          this.count = null;
          this.status = 'error';
        } else {
          this.count = simpleIndicator;
          this.status = 'success';
        }
      }
      );
  }

  ngOnDestroy(): void {
    this.timmer.unsubscribe();
  }
}
