import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RedmineIndicatorsService } from './redmine-indicators.service';
import { ConfigurationService } from './configuration/configuration.service';
import { RedmineClient } from './http/redmine-client.service';
import { Iteration, Category, SimpleIndicator } from './beans/dto';

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

  public findOpenTickets(category: Category | number, iteration: Iteration): Observable<SimpleIndicator> {
    const categoryId =  category instanceof Category ? category.id : category;
    return this.redmineAwareClientService.get<SimpleIndicator>(
      this.buildOpenTicketsUrl(
        categoryId,
        iteration)
    );
  }

  public findSupportIssues(): Observable<SimpleIndicator> {
    return this.redmineAwareClientService.get<SimpleIndicator>(
      this.buildSupportIssuesUrl(
        this.configurationService.getSupportProjectId(),
        this.configurationService.getRDOpenQueryId())
    );
  }

  private buildSupportIssuesUrl( projectId: number, queryId: number): string {
    return `/issue/project/${projectId}/query/${queryId}/count/`;
  }

  private buildOpenTicketsUrl( category: number, iteration: Iteration): string {
    return `/issue/category/${category}/iteration/${iteration.number}/count/`;
  }

}
