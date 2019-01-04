import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const X_REDMINE_API_KEY = 'x-redmine-api-key';
@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

  public getSupportProjectId(): number {
    return environment.support.projectId;
  }

  public getRDOpenQueryId(): number {
    return environment.support.openIssuesQuery;
  }

  public getBackendUrl(): string {
    return environment.backendUrl;
  }

  public getXRedmineApiKey(): string | null {
    return localStorage.getItem(X_REDMINE_API_KEY);
  }

  public setXRedmineApiKey(xRedmineApiKey: string | null) {
    localStorage.setItem(X_REDMINE_API_KEY, xRedmineApiKey);
  }

}
