import { Component, OnInit } from '@angular/core';
import { IssueScopeService } from 'src/app/services/issue-scope.service';
import { IssueScope } from 'src/app/services/beans/dto/issue-scope';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { IssueScopeEditComponent } from '../issue-scope-edit/issue-scope-edit.component';

@Component({
  selector: 'app-issue-scope-view',
  templateUrl: './issue-scope-view.component.html',
  styleUrls: ['./issue-scope-view.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: IssueScopeViewComponent, multi: true}
  ]
})
export class IssueScopeViewComponent implements OnInit {
  public controlScope = new FormControl();
  filteredIssueScopes: Observable<IssueScope[]>;
  public issueScopes: Array<IssueScope> = [];
  showAddButton = false;
  editOK = false;
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

  constructor(private issueScopeService: IssueScopeService, public dialog: MatDialog) {}

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

  private _filterScopes(value: string | IssueScope): IssueScope[] {
    if ( value instanceof IssueScope) {
      this.editOK = true;
      return [value];
    }
    this.editOK = false;
    const filterValue = value.toLowerCase();
    let results = this.issueScopes.filter(option =>
      option.name.toLowerCase().includes(filterValue));

    this.showAddButton = results.length === 0;
    if (this.showAddButton) {
      results = null;
    }

    return results;
  }

  addOption() {
    if (this.controlScope.value !== '' &&
        this.controlScope.value !== null &&
        !this.issueScopes.some(entry => entry.name === this.controlScope.value)) {
      const newScope = new IssueScope(null, this.controlScope.value);
      this.issueScopeService.save(newScope).subscribe(scope => this.issueScopes.push(scope));
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

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.selectedScope;
    this.dialog.open(IssueScopeEditComponent, dialogConfig);
  }
}
