import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, of, Subscription } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { IssuesService } from 'src/app/services/issues.service';
import { SimpleIndicator } from 'src/app/services/beans/dto';

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
