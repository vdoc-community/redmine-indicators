import { flatMap, last } from 'rxjs/operators';
import { IterationService } from './../../services/iteration.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ObjectivesService } from '../../services/objectives.service';
import { Objective, Iteration, Page, SimpleIndicator, Category } from 'src/app/services/beans/dto';
import { IssuesService } from 'src/app/services/issues.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  private readonly MIN_OBJECTIVES_ROW_LENGTH = 3;

  private _objectivesRowLength = this.MIN_OBJECTIVES_ROW_LENGTH;
  public objectives: Observable<Page<Objective>>;
  public currentIteration: Iteration;
  public $currentIteration: Observable<Iteration>;
  public supportTickets = this._supportTickets.bind(this);
  public supportColor = this._supportColor.bind(this);
  public devTickets = this._devTickets.bind(this);
  public testTickets = this._testTickets.bind(this);
  public integrationTickets = this._integrationTickets.bind(this);
  public techcenterTickets = this._techcenterTickets.bind(this);

  get objectivesRowLength(): number {
    return this._objectivesRowLength;
  }

  set objectivesRowLength(objectivesRowLength: number) {
    this._objectivesRowLength = Math.max(objectivesRowLength, this.MIN_OBJECTIVES_ROW_LENGTH);
  }

  constructor(
    private iterationService: IterationService,
    private objectivesService: ObjectivesService,
    private issuesService: IssuesService) {
  }

  ngOnInit(): void {
    this.$currentIteration = this.iterationService.findCurrent();
    this.$currentIteration.subscribe(iteration => {
      this.currentIteration = iteration;
      this.objectives = this.objectivesService.findByIteration(iteration);
      this.objectives.subscribe((page) => this.objectivesRowLength = page.total_count);
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
    return this.findOpenTickets(1223);
  }

  private _testTickets(): Observable<SimpleIndicator> {
    return this.findOpenTickets(1225);
  }

  private _integrationTickets(): Observable<SimpleIndicator> {
    return this.findOpenTickets(1224);
  }

  private _techcenterTickets(): Observable<SimpleIndicator> {
    return this.findOpenTickets(1231);
  }

  private findOpenTickets(categoryId: number): Observable<SimpleIndicator> {
    return this.$currentIteration
      .pipe(last())
      .pipe(flatMap((currentIteration: Iteration) => this.issuesService.findOpenTickets(categoryId, currentIteration)));
  }

}
