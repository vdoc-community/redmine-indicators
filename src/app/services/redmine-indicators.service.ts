import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../beans/category';
import { Iteration } from '../beans/iteration';

@Injectable({
  providedIn: 'root'
})
export class RedmineIndicatorsService {
  constructor() {
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
