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
  public displayedColumns: string[] = ['name', 'start', 'end'];

  constructor(private iterationService: IterationService) {}

  ngOnInit() {
    this.iterationService
      .findIterations()
      .subscribe(
        page => {
          this.iterations = page.elements
          .filter( (iteration) => iteration.start)
          .sort( (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());
        }
      );
  }

  public delete(iteration: Iteration): void {
    console.log(`delete ${iteration}`);
  }
}
