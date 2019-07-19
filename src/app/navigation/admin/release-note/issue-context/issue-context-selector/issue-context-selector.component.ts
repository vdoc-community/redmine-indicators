import { Component, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { IssueContext, IssueScope } from 'src/app/services/beans/dto';
import { IssueContextService } from 'src/app/services/issue-context.service';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-issue-context-selector',
  templateUrl: './issue-context-selector.component.html',
  styleUrls: ['./issue-context-selector.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: IssueContextSelectorComponent, multi: true}
  ]
})
export class IssueContextSelectorComponent implements OnInit {
  public controlContext = new FormControl();
  filteredIssueContexts: Observable<IssueContext[]>;
  public issueContexts: Array<IssueContext> = [];
  edit = false;
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

  constructor(private issueContextService: IssueContextService) {}

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
      this.edit = true;
      return [value];
    } else {
      this.edit = false;
      const filterValue = value.toLowerCase();
      return this.issueContexts.filter(option =>
        option.description.toLowerCase().includes(filterValue));
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

  clear() {
    this.selectedContext = null;
  }
}
