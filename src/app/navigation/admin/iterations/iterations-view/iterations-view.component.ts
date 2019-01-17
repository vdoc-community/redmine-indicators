import { Component, OnInit } from '@angular/core';
import { IterationService } from 'src/app/services/iteration.service';
import { Iteration } from 'src/app/services/beans/dto';

@Component({
  selector: 'app-iterations-view',
  templateUrl: './iterations-view.component.html',
  styleUrls: ['./iterations-view.component.scss']
})
export class IterationsViewComponent implements OnInit {
  public iterations: Array<Iteration>;
  public displayedColumns: string[] = ['number', 'name', 'start', 'end'];

  constructor(private iterationService: IterationService) {}

  ngOnInit() {
    this.iterationService
      .findAll()
      .subscribe(
        page => {
          this.iterations = page.elements
          .filter( (iteration) => iteration.start)
          .sort( (a, b) => b.start.getTime() - a.start.getTime());
        }
      );
  }

  public delete(iteration: Iteration): void {
    console.log(`delete ${iteration}`);
  }
}
