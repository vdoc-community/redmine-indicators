import { Component, OnInit, ViewChild } from '@angular/core';
import { IssueScopeService } from 'src/app/services/issue-scope.service';
import { IssueScope } from 'src/app/services/beans/dto/issue-scope';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { IssueScopeRef } from 'src/app/services/beans/refs/issue-scope-ref';

@Component({
  selector: 'app-issue-scope-selector',
  templateUrl: './issue-scope-selector.component.html',
  styleUrls: ['./issue-scope-selector.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: IssueScopeSelectorComponent, multi: true}
  ]
})
export class IssueScopeSelectorComponent implements OnInit {
  public controlScope = new FormControl();
  filteredIssueScopes: Observable<IssueScope[]>;
  public issueScopes: Array<IssueScope> = [];
  edit = false;
  selectedScope: IssueScope = null;
  private changed = new Array<(value: IssueScope) => void>();

  writeValue(scope: IssueScope): void {
    this.selectedScope = scope;
  }

  registerOnChange(fn: (value: IssueScope) => void): void {
    this.changed.push(fn);
  }

  registerOnTouched(fn: any): void {
  }

  constructor(private issueScopeService: IssueScopeService) {}

  ngOnInit() {
    this.issueScopeService
      .findAll()
      .subscribe(
        page => {
          page.elements.sort((a, b) => a.name.localeCompare(b.name));
          this.issueScopes = page.elements;
        }
      );

    this.filteredIssueScopes = this.controlScope.valueChanges
      .pipe(
      startWith(''),
      map(scope => scope ? this._filterScopes(scope) : this.issueScopes.slice())
      );

  }

  private _filterScopes(value: string | IssueScope | IssueScopeRef): IssueScope[] {
    if (value instanceof IssueScope || value instanceof IssueScopeRef) {
      this.edit = true;
      return [value];
    } else {
      this.edit = false;
    const filterValue = value.toLowerCase();
    return this.issueScopes.filter(option =>
      option.name.toLowerCase().indexOf(filterValue) === 0);
    }
  }

  displayScope(scope?: IssueScope ): string {
    if (!scope) {
      return '';
    }
    return scope.name;
  }

  scopeSelect() {
    this.changed.forEach(f => f(this.selectedScope));
  }
}
