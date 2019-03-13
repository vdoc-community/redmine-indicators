import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RedmineClient } from './http/redmine-client.service';


@Injectable({
  providedIn: 'root'
})
export class ReleaseNoteService {

  constructor(private redmineClient: RedmineClient, private http: HttpClient) {
    this.getProject().subscribe(data => {
      console.log(data);
    });
  }

  public getProject(): Observable<any> {
    return this.redmineClient.get('/apo/releaseNote/version');
  }

  public getPDF(version: string, product: string): Observable<Blob> {
    const uri = '/apo/releaseNote/pdf?version=' + version + '&product=' + product;
    return this.redmineClient.getBlob(uri);
  }

  public getDOC(version: string, product: string): Observable<Blob> {
    const uri = '/apo/releaseNote/doc?version=' + version + '&product=' + product;
    return this.redmineClient.getBlob(uri);
  }
  public getZIP(version: string, product: string): Observable<Blob> {
    const uri = '/apo/releaseNote/zip?version=' + version + '&product=' + product;
    return this.redmineClient.getBlob(uri);
  }
}
