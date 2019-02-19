import { IterationService } from './../../services/iteration.service';
import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ObjectivesService} from '../../services/objectives.service';
import { Objective, Iteration, Page, SimpleIndicator, Category } from 'src/app/services/beans/dto';
import { IssuesService } from 'src/app/services/issues.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public objectives: Observable<Page<Objective>>;
  public currentIteration: Iteration;

  constructor(
    private iterationService: IterationService,
    private objectivesService: ObjectivesService,
    private issuesService: IssuesService) {
  }

  ngOnInit(): void {
    this.iterationService.findCurrent().subscribe(iteration => {
      this.currentIteration = iteration;
      this.objectives = this.objectivesService.findByIteration(iteration);
    });
  }

  public dummyCount(): Observable<SimpleIndicator> {
    const count = new SimpleIndicator();
    count.name = 'dummy';
    count.value = 999;
    return of(count);
  }

  public supportIssues(): Observable<SimpleIndicator> {
    return this.issuesService.findSupportIssues();
  }

  public devTickets(): Observable<SimpleIndicator> {
    const category = new Category(1223, 'dev');
    return this.issuesService.findOpenTickets(category, this.currentIteration);
  }

  public testTickets(): Observable<SimpleIndicator> {
    const category = new Category(1225, 'test');
    return this.issuesService.findOpenTickets(category, this.currentIteration);
  }

  public integrationTickets(): Observable<SimpleIndicator> {
    const category = new Category(1224, 'integration');
    return this.issuesService.findOpenTickets(category, this.currentIteration);
  }

  public techcenterTickets(): Observable<SimpleIndicator> {
    const category = new Category(1231, 'techcenter');
    return this.issuesService.findOpenTickets(category, this.currentIteration);
  }

}
