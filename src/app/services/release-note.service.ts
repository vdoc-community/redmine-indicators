import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RedmineClient } from './http/redmine-client.service';


@Injectable({
  providedIn: 'root'
})
export class ReleaseNoteService {

  constructor(private redmineClient: RedmineClient) {
  }

  public getPDF(version: string, product: string, idV: number): Observable<Blob> {
    const uri = '/apo/releaseNote/pdf?version=' + version + '&product=' + product + '&id=' + idV;
    console.log(uri);
    return this.redmineClient.getBlob(uri);
  }

  public getDOC(version: string, product: string, idV: number): Observable<Blob> {
    const uri = '/apo/releaseNote/doc?version=' + version + '&product=' + product + '&id=' + idV;
    console.log(uri);
    return this.redmineClient.getBlob(uri);
  }
  public getZIP(version: string, product: string, idV: number): Observable<Blob> {
    const uri = '/apo/releaseNote/zip?version=' + version + '&product=' + product + '&id=' + idV;
    console.log(uri);
    return this.redmineClient.getBlob(uri);
  }
}
