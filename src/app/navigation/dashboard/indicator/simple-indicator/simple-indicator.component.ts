import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { timer, of, Subscription, Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { SimpleIndicator } from 'src/app/services/beans/dto';

@Component({
  selector: 'app-simple-indicator',
  templateUrl: './simple-indicator.component.html'
})
export class SimpleIndicatorComponent implements OnInit, OnDestroy {

  public status: 'loading' | 'success' | 'error' = 'loading';
  @Input()
  public name: string;
  public count: SimpleIndicator;
  @Input()
  public datasource: () => Observable<SimpleIndicator>;
  private timer: Subscription;
  @Input()
  public timerStart: number;
  @Input()
  public timerPeriod: number;


  constructor() {
  }

  ngOnInit() {
    this.timer = timer(this.timerStart, this.timerPeriod)
    .pipe(switchMap(_ => this.datasource().pipe(catchError((error: Error) => {
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
    this.timer.unsubscribe();
  }

}
