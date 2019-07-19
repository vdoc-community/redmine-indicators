import { MatDialog, MatSnackBar } from '@angular/material';
import { IssueContextService } from 'src/app/services/issue-context.service';
import { IssueScopeService } from 'src/app/services/issue-scope.service';
import { IssueScope, IssueContext } from 'src/app/services/beans/dto';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContextCreateComponent } from '../../create/context-create/context-create.component';

@Component({
  selector: 'app-scope-edit',
  templateUrl: './scope-edit.component.html',
  styleUrls: ['./scope-edit.component.scss']
})
export class ScopeEditComponent implements OnInit {
  public scopeToEdit: IssueScope;
  private id: number;
  contexts: Array<IssueContext>;
  newContexts: Array<IssueContext> = [];
  deletedContext: Array<IssueContext> = [];
  title: string;
  first = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private issueScopeService: IssueScopeService,
    private issueContextService: IssueContextService,
    private _snackbar: MatSnackBar) { }

  ngOnInit() {
    if (this.first) {
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.issueScopeService
          .findById(this.id)
          .subscribe(scope => {
            this.scopeToEdit = scope;
            this.title = scope.name;
            this.issueContextService.findByScope(scope).subscribe(page => {
              this.contexts = page.elements;
            });
          });
      });
      this.first = false;
    } else {
      this.issueContextService.findByScope(this.scopeToEdit).subscribe(page => {
        this.contexts = page.elements;
      });
    }
  }

  save() {
    this.issueScopeService.update(this.scopeToEdit).subscribe();
    this.contexts.forEach(context => {
      this.issueContextService.update(context).subscribe();
    });
    this.router.navigate([`/administration/scope-context`]);
  }

  createContext() {
    const dialogRef = this.dialog.open(ContextCreateComponent, {
      data: this.scopeToEdit
    });
    dialogRef.afterClosed().subscribe(result => {
      this.issueContextService.save(result).subscribe(context => {
        this.newContexts.push(context);
        this.ngOnInit();
      });
    });
  }

  deleteContext(context: IssueContext) {
    let cancelled = false;
    this.issueContextService.delete(context).subscribe(result => {
      this.ngOnInit();
    });
    const snackBarRef = this._snackbar.open(`Context ${context.description} deleted`, 'Cancel', {
      duration: 5000
    });
    snackBarRef.onAction().subscribe(result => {
      this.issueContextService.save(context).subscribe(data => {
        this.ngOnInit();
        cancelled = true;
      });
    });
    if (!cancelled) {
      this.deletedContext.push(context);
    }
  }

  cancel() {
    this.deletedContext.forEach(element => {
      this.issueContextService.save(element).subscribe();
    });
    this.newContexts.forEach(element => {
      this.issueContextService.delete(element).subscribe();
    });
    this.router.navigate([`/administration/scope-context`]);
  }
}
