import { Component, OnInit, Input } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { IssueContext } from 'src/app/services/beans/dto/issue-context';
import { IssueContextService } from 'src/app/services/issue-context.service';
import { IssueScope } from 'src/app/services/beans/dto/issue-scope';
import { IssueContextEditComponent } from '../issue-context-edit/issue-context-edit.component';

@Component({
  selector: 'app-issue-context-view',
  templateUrl: './issue-context-view.component.html',
  styleUrls: ['./issue-context-view.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: IssueContextViewComponent, multi: true}
  ]
})
export class IssueContextViewComponent implements OnInit {
  public controlContext = new FormControl();
  filteredIssueContexts: Observable<IssueContext[]>;
  public issueContexts: Array<IssueContext> = [];
  showAddButton = false;
  editOK = false;
  selectedContext: IssueContext = null;
  private _scope: IssueScope;
  private changed = new Array<(value: IssueContext) => void>();

  writeValue(context: IssueContext): void {
    this.selectedContext = context;
  }

  registerOnChange(fn: (value: IssueContext) => void): void {
    this.changed.push(fn);
  }

  registerOnTouched(fn: any): void {
  }

  @Input()
  set scope(scope: IssueScope | undefined) {
    if (scope) {
      this._scope = scope;
      this.importContext(this._scope);
    }
  }
  get scope(): IssueScope {
    return this._scope;
  }

  constructor(private issueContextService: IssueContextService, private dialog: MatDialog) {}

  ngOnInit() {
  }

  importContext(scope: IssueScope) {
    this.issueContextService
      .findByScope(scope)
      .subscribe(
        pageContext => {
          pageContext.elements.sort((a, b) => a.description.localeCompare(b.description));
          this.issueContexts = pageContext.elements;
        }
      );

    this.filteredIssueContexts = this.controlContext.valueChanges
      .pipe(
        startWith(''),
        map(context => context ? this._filterContext(context) : this.issueContexts.slice())
      );
  }

  private _filterContext(value: string | IssueContext): IssueContext[] {
    if ( value instanceof IssueContext) {
      this.editOK = true;
      return [value];
    }
    this.editOK = false;
    const filterValue = value.toLowerCase();
    let results = this.issueContexts.filter(option =>
      option.description.toLowerCase().includes(filterValue));

    this.showAddButton = results.length === 0;
    if (this.showAddButton) {
      results = null;
    }

    return results;
  }

  addOption() {
    if (this.controlContext.value !== '' &&
        this.controlContext.value !== null &&
        !this.issueContexts.some(entry => entry.description === this.controlContext.value)) {
      const newContext = new IssueContext(null, null, this.controlContext.value, this._scope);
      this.issueContextService.save(newContext).subscribe(context => this.issueContexts.push(context));
    }
  }

  displayContext(context?: IssueContext ): string {
    if (!context) {
      return '';
    }
    return context.description;
  }

  contextSelect() {
    this.changed.forEach(f => f(this.selectedContext));
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.selectedContext;
    this.dialog.open(IssueContextEditComponent, dialogConfig);
  }
}
