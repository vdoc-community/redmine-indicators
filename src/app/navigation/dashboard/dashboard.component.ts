import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, of} from 'rxjs';
import {ObjectivesService} from '../../services/objectives.service';
import {Objective} from '../../beans/objective';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  private objectives: Observable<Objective[]>;

  constructor( private objectivesService: ObjectivesService) {
  }

  ngOnInit(): void {
    this.objectives = this.objectivesService.findObjectives(null);
  }
}
