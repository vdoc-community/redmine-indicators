import { IterationService } from './../../services/iteration.service';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ObjectivesService} from '../../services/objectives.service';
import { Objective, Iteration } from 'src/app/services/beans/dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public objectives: Observable<Objective[]>;
  public currentIteration$: Observable<Iteration>;

  constructor( private iterationService: IterationService, private objectivesService: ObjectivesService) {
  }

  ngOnInit(): void {
    this.currentIteration$ = this.iterationService.findCurrentIteration();
    this.objectives = this.objectivesService.findObjectives(null);
  }
}
