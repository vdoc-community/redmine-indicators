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
  public supportTickets = this._supportTickets.bind(this);
  public supportColor = this._supportColor.bind(this);
  public devTickets = this._devTickets.bind(this);
  public testTickets = this._testTickets.bind(this);
  public integrationTickets = this._integrationTickets.bind(this);
  public techcenterTickets = this._techcenterTickets.bind(this);

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

  private _supportTickets(): Observable<SimpleIndicator> {
    return this.issuesService.findSupportIssues();
  }

  private _supportColor(indicator: SimpleIndicator): string {
    return 'red';
  }

  private _devTickets(): Observable<SimpleIndicator> {
    const category = new Category(1223, 'dev');
    return this.issuesService.findOpenTickets(category, this.currentIteration);
  }

  public _testTickets(): Observable<SimpleIndicator> {
    const category = new Category(1225, 'test');
    return this.issuesService.findOpenTickets(category, this.currentIteration);
  }

  public _integrationTickets(): Observable<SimpleIndicator> {
    const category = new Category(1224, 'integration');
    return this.issuesService.findOpenTickets(category, this.currentIteration);
  }

  public _techcenterTickets(): Observable<SimpleIndicator> {
    const category = new Category(1231, 'techcenter');
    return this.issuesService.findOpenTickets(category, this.currentIteration);
  }

}
