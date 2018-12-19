import { Iteration } from './../../../beans/iteration';
import { Component, OnInit } from '@angular/core';
import { IterationService } from 'src/app/services/iteration.service';
import { retryWhen, delay, take } from 'rxjs/operators';

@Component({
  selector: 'app-iterations-view',
  templateUrl: './iterations-view.component.html',
  styleUrls: ['./iterations-view.component.scss']
})
export class IterationsViewComponent implements OnInit {
  public iterations: Array<Iteration>;

  constructor(private iterationService: IterationService) {}

  ngOnInit() {
    this.iterationService
      .findIterations()
      .subscribe(
        page => {
          this.iterations = page.elements;
        }
      );
  }
}
