import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RedmineIndicatorsService } from '../redmine-indicators.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedmineAwareClientService {
  private httpClient: HttpClient;
  private redmineIndicatorsService: RedmineIndicatorsService;

  constructor(httpClient: HttpClient, redmineIndicatorsService: RedmineIndicatorsService)  {
    this.httpClient = httpClient;
    this.redmineIndicatorsService = redmineIndicatorsService;
   }

  public get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(
      url,
      {
        headers: {
          'X-Redmine-API-Key': this.redmineIndicatorsService.getXRedmineApiKey()
        }
      }
    );
  }
}
