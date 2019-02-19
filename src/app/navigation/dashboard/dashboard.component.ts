import { IterationService } from './../../services/iteration.service';
import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ObjectivesService} from '../../services/objectives.service';
import { Objective, Iteration, Page, SimpleIndicator } from 'src/app/services/beans/dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public objectives: Observable<Page<Objective>>;
  public currentIteration: Iteration;

  constructor( private iterationService: IterationService, private objectivesService: ObjectivesService) {
  }

  ngOnInit(): void {
    this.iterationService.findCurrent().subscribe(iteration => {
      this.currentIteration = iteration;
      this.objectives = this.objectivesService.findByIteration(iteration);
    });
  }

  public dummyCount(): Observable<SimpleIndicator>{
    const count = new SimpleIndicator();
    count.name = 'dummy';
    count.value = 999;
    return of(count);
  }
}
