import { Injectable } from '@angular/core';
import { AbstractCrudService } from './abstract-crud-service';
import { User, parseUser } from './beans/dto/user';
import { RedmineClient } from './http/redmine-client.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractCrudService<User> {

  constructor(redmineClient: RedmineClient) {
    super(redmineClient);
  }

  public getCurrent(): Observable<User> {
    return this.redmineClient.get(`/user/current`)
    .pipe(map(json => this.parser(json)));
  }

  protected endpoint(): string {
    return 'user';
  }

  protected parser(json: any): User {
    return parseUser(json);
  }
}
