import { EventsService } from './../events.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RedmineIndicatorsService } from '../redmine-indicators.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RedmineAwareClientService {
  private httpClient: HttpClient;
  private redmineIndicatorsService: RedmineIndicatorsService;
  private eventsService: EventsService;

  constructor(
    httpClient: HttpClient,
    redmineIndicatorsService: RedmineIndicatorsService,
    eventsService: EventsService
  ) {
    this.httpClient = httpClient;
    this.redmineIndicatorsService = redmineIndicatorsService;
    this.eventsService = eventsService;
  }

  public get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(this.buildUrl(url), {
      headers: {
        'X-Redmine-API-Key': this.redmineIndicatorsService.getXRedmineApiKey()
      }
    });
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(this.buildUrl(url), body, {
      headers: {
        'X-Redmine-API-Key': this.redmineIndicatorsService.getXRedmineApiKey()
      }
    });
  }

  public put<T>(url: string, body: any): Observable<T> {
    return this.httpClient.put<T>(this.buildUrl(url), body, {
      headers: {
        'X-Redmine-API-Key': this.redmineIndicatorsService.getXRedmineApiKey()
      }
    });
  }

  private buildUrl(url: string): string {
    return `${this.redmineIndicatorsService.getBackendUrl()}/v1${url}`;
  }
}
