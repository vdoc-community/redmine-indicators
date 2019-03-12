import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RedmineIndicatorsService } from './redmine-indicators.service';
import { ConfigurationService } from './configuration/configuration.service';
import { RedmineClient } from './http/redmine-client.service';


@Injectable({
  providedIn: 'root'
})
export class ReleaseNoteService {


  constructor(private redmineClient: RedmineClient) {
  }

  public test(): string {
    return 'service';
  }

  public getPDF(version: string, product: string): Observable<Blob> {
    const uri = '/apo/releaseNote/pdf?version=' + version + '&product=' + product;
    console.log(uri);
    return this.redmineClient.getBlob(uri);
  }

  public getDOC(version: string, product: string): Observable<Blob> {
    const uri = '/apo/releaseNote/doc?version=' + version + '&product=' + product;
    console.log(uri);
    return this.redmineClient.getBlob(uri);
  }
  public getZIP(version: string, product: string): Observable<Blob> {
    const uri = '/apo/releaseNote/zip';
    return this.redmineClient.getBlob(uri);
  }
}
