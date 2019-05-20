import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RedmineClient } from './http/redmine-client.service';
import { ReleaseNote, parseReleaseNote } from './beans/dto/release-note';
import { AbstractCrudService } from './abstract-crud-service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReleaseNoteService extends AbstractCrudService<ReleaseNote>  {

  public getReleaseNote(versionId: number, type: 'pdf' | 'doc' | 'zip'): Observable<Blob> {
    const uri = `/apo/releaseNote/${type}?version=${versionId}`;
    return this.redmineClient.getBlob(uri);
  }

  constructor(redmineClient: RedmineClient) {
    super(redmineClient);
  }
  protected endpoint(): string {
    return 'apo';
  }
  protected parser(json: any): ReleaseNote {
    return parseReleaseNote(json);
  }

  public createRLN(versionId: number): Observable<ReleaseNote> {
    return this.redmineClient.get(`/apo/releaseNote/new?version=${versionId}`)
    .pipe(map(json => this.parser(json)));
  }
}
