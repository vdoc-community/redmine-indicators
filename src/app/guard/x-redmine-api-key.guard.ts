import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {RedmineIndicatorsService} from '../services/redmine-indicators.service';

@Injectable({
  providedIn: 'root'
})
export class XRedmineApiKeyGuard implements CanActivate {


  constructor(private redmineIndicatorsService: RedmineIndicatorsService, private router: Router) {
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['settings']);
      return false;
    }
    return true;
  }

  public isAuthenticated(): boolean {
    const token = this.redmineIndicatorsService.getXRedmineApiKey();
    // Check whether the token is expired and return
    // true or false
    return token !== null && token.length > 0;
  }

}
