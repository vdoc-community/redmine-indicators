import { Injectable } from '@angular/core';
import { Iteration } from '../beans/iteration';
import { Category } from '../beans/category';
import { Observable, of } from 'rxjs';
import { SimpleIndicator } from '../beans/simple-indicator';
import { RedmineIndicatorsService } from './redmine-indicators.service';
import { ConfigurationService } from './configuration/configuration.service';
import { RedmineClient } from './http/redmine-client.service';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  private redmineAwareClientService: RedmineClient;
  private redmineIndicatorsService: RedmineIndicatorsService;
  private configurationService: ConfigurationService;

  constructor(
    redmineClient: RedmineClient,
    redmineIndicatorsService: RedmineIndicatorsService,
    configurationService: ConfigurationService) {
    this.redmineAwareClientService = redmineClient;
    this.redmineIndicatorsService = redmineIndicatorsService;
    this.configurationService = configurationService;
  }

  public findOpenTickets(iteration: Iteration, category: Category): Observable<number> {
    return of(3);
  }

  public findSupportIssues(): Observable<SimpleIndicator> {
    return this.redmineAwareClientService.get<SimpleIndicator>(
      this.buildSupportIssuesUrl(
        this.configurationService.getSupportProjectId(),
        this.configurationService.getRDOpenQueryId())
    );
  }

  private buildSupportIssuesUrl( projectId: number, queryId: number): string {
    return `/issues/project/${projectId}/query/${queryId}/count/`;
  }

}
