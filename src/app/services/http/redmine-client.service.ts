import { ConfigurationService } from '../configuration/configuration.service';
import { EventsService } from '../events.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RedmineIndicatorsService } from '../redmine-indicators.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RedmineClient {

  constructor(
    private httpClient: HttpClient,
    private configurationService: ConfigurationService,
    private eventsService: EventsService
  ) { }

  public get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(this.buildUrl(url), {
      headers: this.buildDefaultHeaders()
    });
  }

  public getBlob(url: string): Observable<Blob> {
    return this.httpClient.get(this.buildUrl(url), {
      headers: this.buildDefaultHeaders(),
      responseType: 'blob'
    });
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(this.buildUrl(url), body, {
      headers: this.buildDefaultHeaders()
    });
  }

  public put<T>(url: string, body: any): Observable<T> {
    return this.httpClient.put<T>(this.buildUrl(url), body, {
      headers: this.buildDefaultHeaders()
    });
  }

  public delete(url: string): Observable<HttpResponse<any>> {
    return this.httpClient.delete<any>(this.buildUrl(url), {
      headers: this.buildDefaultHeaders(),
      observe: 'response'
    });
  }

  private buildDefaultHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('X-Redmine-API-Key', this.configurationService.getXRedmineApiKey());
    return headers;
  }

  private buildUrl(url: string): string {
    return `${this.configurationService.getBackendUrl()}/v1${url}`;
  }
}
