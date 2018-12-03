import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, of} from 'rxjs';
import {ObjectivesService} from '../../services/objectives.service';
import {Objective} from '../../beans/objective';
import {Iteration} from '../../beans/iteration';
import {RedmineIndicatorsService} from '../../services/redmine-indicators.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public objectives: Observable<Objective[]>;
  public currentIteration$: Observable<Iteration>;

  constructor( private redmineIndicatorsService: RedmineIndicatorsService, private objectivesService: ObjectivesService) {
  }

  ngOnInit(): void {
    this.currentIteration$ = this.redmineIndicatorsService.findCurrentIteration();
    this.objectives = this.objectivesService.findObjectives(null);
  }
}
