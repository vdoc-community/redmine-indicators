import { Iteration, Objective } from 'src/app/services/beans/dto';
import { Component, OnInit, Input } from '@angular/core';
import { ObjectivesService } from 'src/app/services/objectives.service';
import { IterationRef } from 'src/app/services/beans/refs/iteration-ref';

@Component({
  selector: 'app-iterations-objectives-view',
  templateUrl: './iterations-objectives-view.component.html',
  styleUrls: ['./iterations-objectives-view.component.scss']
})
export class IterationsObjectivesViewComponent implements OnInit {

  private _iteration: Iteration;
  public objectives: Objective[];

  @Input()
  set iteration(iteration: Iteration) {
    this._iteration = iteration;
    this.loadObjectives();
  }

  get iteration(): Iteration {
    return this._iteration;
  }

  constructor(private objectivesService: ObjectivesService) { }

  ngOnInit() {
    this.loadObjectives();
  }

  public add() {
    const objective = new Objective(null, 'New Objective 2');
    objective.iteration = new IterationRef(this.iteration);
    objective.description = 'A very nice description';
    this.objectives.push(objective);
  }

  public onDelete(objective: Objective) {
    this.objectives.splice(this.objectives.indexOf(objective), 1);
  }

  private loadObjectives() {
    if (this._iteration) {
      this.objectivesService.findByIteration(this.iteration).subscribe(page => {
        this.objectives = page.elements;
      });
    } else {
      this.objectives = [];
    }
  }
}
