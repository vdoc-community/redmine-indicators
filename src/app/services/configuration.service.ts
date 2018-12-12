import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

  public getSupportProjectId(): number {
    return environment.supportProjectId;
  }

  public getRDOpenQueryId(): number {
    return environment.rDOpenQueryId;
  }
}
