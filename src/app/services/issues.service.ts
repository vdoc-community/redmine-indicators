import { Injectable } from '@angular/core';
import { Iteration } from '../beans/iteration';
import { Category } from '../beans/category';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SimpleIndicator } from '../beans/simple-indicator';
import { RedmineIndicatorsService } from './redmine-indicators.service';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  private httpClient: HttpClient;
  private redmineIndicatorsService: RedmineIndicatorsService;
  private configurationService: ConfigurationService;

  constructor(httpClient: HttpClient, redmineIndicatorsService: RedmineIndicatorsService, configurationService: ConfigurationService) {
    this.httpClient = httpClient;
    this.redmineIndicatorsService = redmineIndicatorsService;
    this.configurationService = configurationService;
  }

  public findOpenTickets(iteration: Iteration, category: Category): Observable<number> {
    return of(3);
  }

  public findSupportIssues(): Observable<SimpleIndicator> {
    return this.httpClient.get<SimpleIndicator>(
      this.buildSupportIssuesUrl(
        this.redmineIndicatorsService.getBackendUrl(),
        this.configurationService.getSupportProjectId(),
        this.configurationService.getRDOpenQueryId())
      , {
        headers: {
          "X-Redmine-API-Key": this.redmineIndicatorsService.getXRedmineApiKey()
        }
      }
    );
  }

  private buildSupportIssuesUrl(backendUrl: string, projectId: number, queryId: number): string {
    return `${backendUrl}/v1/issues/project/${projectId}/query/${queryId}/count/`;
  }

}
