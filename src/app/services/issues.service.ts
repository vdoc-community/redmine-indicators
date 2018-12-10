import { Injectable } from '@angular/core';
import { Iteration } from '../beans/iteration';
import { Category } from '../beans/category';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SimpleIndicator } from '../beans/simple-indicator';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public findOpenTickets(iteration: Iteration, category: Category): Observable<number> {
    return of(3);
  }

  public findSupportIssues(): Observable<SimpleIndicator> {
    return this.httpClient.get<SimpleIndicator>('http://localhost:8080/redmine-ng-api/v1/project/1032/query/1762/count');
  }

}
