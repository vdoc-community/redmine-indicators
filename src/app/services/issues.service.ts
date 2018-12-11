import { Injectable } from '@angular/core';
import { Iteration } from '../beans/iteration';
import { Category } from '../beans/category';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SimpleIndicator } from '../beans/simple-indicator';
import { RedmineIndicatorsService } from './redmine-indicators.service';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  private httpClient: HttpClient;
  private redmineIndicatorsService: RedmineIndicatorsService;

  constructor(httpClient: HttpClient, redmineIndicatorsService: RedmineIndicatorsService) {
    this.httpClient = httpClient;
    this.redmineIndicatorsService = redmineIndicatorsService;
  }

  public findOpenTickets(iteration: Iteration, category: Category): Observable<number> {
    return of(3);
  }

  public findSupportIssues(): Observable<SimpleIndicator> {
    return this.httpClient.get<SimpleIndicator>(
      `${this.redmineIndicatorsService.getBackendUrl()}/v1/issues/project/1032/query/1762/count/`
      , {
        headers: {
          "X-Redmine-API-Key": this.redmineIndicatorsService.getXRedmineApiKey()
        }
      }
    );
  }

}
