import { Component, OnInit, Inject } from '@angular/core';
import { IssueScope, IssueContext } from 'src/app/services/beans/dto';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { QuickCreateComponent } from '../quick-create/quick-create.component';
import { IssueContextService } from 'src/app/services/issue-context.service';
import { IssueScopeService } from 'src/app/services/issue-scope.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-quick-edit',
  templateUrl: './quick-edit.component.html',
  styleUrls: ['./quick-edit.component.scss']
})
export class QuickEditComponent implements OnInit {
  contextToEdit: IssueContext;
  service: IssueScopeService | IssueContextService;
  scopeToEdit: IssueScope;
  selectedScope: IssueScope;
  name: string;

  constructor(public dialogRef: MatDialogRef<QuickCreateComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              public dialog: MatDialog,
              private issueContextService: IssueContextService,
              private issueScopeService: IssueScopeService) {
    if (data instanceof IssueContext) {
      this.contextToEdit = data;
      this.service = this.issueContextService;
    } else if (data instanceof IssueScope) {
      this.scopeToEdit = data;
      this.service = this.issueScopeService;
    }
  }

  ngOnInit() {
  }

  editContext() {
    if (this.selectedScope) {
      this.contextToEdit.scope = this.selectedScope;
    }
    if (this.name) {
      this.contextToEdit.description = this.name;
    }
    this.issueContextService
       .update(this.contextToEdit)
       .subscribe();
  }

  editScope() {
    this.scopeToEdit.name = this.name;
    this.issueScopeService
       .update(this.scopeToEdit)
       .subscribe();
  }

  edit(object: any) {
    if (object instanceof IssueContext) {
      if (this.selectedScope) {
        object.scope = this.selectedScope;
      }
      if (this.name) {
        object.description = this.name;
      }
    } else if (object instanceof IssueScope) {
      object.name = this.name;
    }
    this.service.update(object).subscribe();
  }

  objectType(object: any): string {
    if (object instanceof IssueScope) {
      return 'scope';
    } else if (object instanceof IssueContext) {
      return 'context';
    } else {
      return 'unknown';
    }
  }

  delete(object: any) {
    const dialogdelete = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px'
    });
    dialogdelete.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.service.delete(object).subscribe();
      }
    });
  }
}
