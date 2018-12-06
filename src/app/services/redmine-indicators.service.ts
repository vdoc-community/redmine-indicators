import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Category} from '../beans/category';
import {Iteration} from '../beans/iteration';

@Injectable({
  providedIn: 'root'
})
export class RedmineIndicatorsService {

  constructor() {
  }

  public getXRedmineApiKey(): string | null {
    return localStorage.getItem('x-redmine-api-key');
  }

  public setXRedmineApiKey(xRedmineApiKey: string | null) {
    localStorage.setItem('x-redmine-api-key', xRedmineApiKey);
  }

  public findCurrentIteration(): Observable<Iteration> {
    const iteration = new Iteration(51, 'Marne');
    return of(iteration);
  }

  public findCategories(): Observable<Category[]> {
    const categories: Category[] = [];
    categories.push(new Category(1, 'Ité - Dev'));
    categories.push(new Category(2, 'Ité - Support'));
    categories.push(new Category(3, 'Ité - Test'));
    categories.push(new Category(4, 'Ité - Intégration'));
    return of(categories);
  }
}
