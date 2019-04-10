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

  public getReleaseNote(versionId: number, type: 'pdf' | 'doc' | 'zip'): Observable<Blob> {
    const uri = `/apo/releaseNote/${type}?version=${versionId}`;
    return this.redmineClient.getBlob(uri);
  }
}
