import { IssueContextService } from 'src/app/services/issue-context.service';
import { Component, OnInit, Input } from '@angular/core';
import { IssueScope, IssueContext } from 'src/app/services/beans/dto';

@Component({
  selector: 'app-scope-display',
  templateUrl: './scope-display.component.html',
  styleUrls: ['./scope-display.component.scss']
})
export class ScopeDisplayComponent implements OnInit {
  public _scope: IssueScope;
  contexts: IssueContext[];
  loading = true;

  @Input()
  set scope(scope: IssueScope | undefined) {
    if (scope) {
      this._scope = scope;
      this.importContext(this._scope);
    }
  }
  get project(): IssueScope {
    return this._scope;
  }

  constructor(private issueContextService: IssueContextService) { }

  ngOnInit() {
  }

  importContext(scope: IssueScope) {
    this.issueContextService.findByScope(scope).subscribe(pageContext => {
      this.contexts = pageContext.elements;
      this.loading = false;
    });
  }

}
