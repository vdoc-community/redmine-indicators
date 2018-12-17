import { Injectable } from '@angular/core';
import { Iteration } from '../beans/iteration';
import { Category } from '../beans/category';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SimpleIndicator } from '../beans/simple-indicator';
import { RedmineIndicatorsService } from './redmine-indicators.service';
import { ConfigurationService } from './configuration.service';
import { RedmineAwareClientService } from './http/redmine-aware-client.service';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  private redmineAwareClientService: RedmineAwareClientService;
  private redmineIndicatorsService: RedmineIndicatorsService;
  private configurationService: ConfigurationService;

  constructor(
    redmineAwareClientService: RedmineAwareClientService,
    redmineIndicatorsService: RedmineIndicatorsService,
    configurationService: ConfigurationService) {
    this.redmineAwareClientService = redmineAwareClientService;
    this.redmineIndicatorsService = redmineIndicatorsService;
    this.configurationService = configurationService;
  }

  public findOpenTickets(iteration: Iteration, category: Category): Observable<number> {
    return of(3);
  }

  public findSupportIssues(): Observable<SimpleIndicator> {
    return this.redmineAwareClientService.get<SimpleIndicator>(
      this.buildSupportIssuesUrl(
        this.redmineIndicatorsService.getBackendUrl(),
        this.configurationService.getSupportProjectId(),
        this.configurationService.getRDOpenQueryId())
    );
  }

  private buildSupportIssuesUrl(backendUrl: string, projectId: number, queryId: number): string {
    return `${backendUrl}/v1/issues/project/${projectId}/query/${queryId}/count/`;
  }

}
