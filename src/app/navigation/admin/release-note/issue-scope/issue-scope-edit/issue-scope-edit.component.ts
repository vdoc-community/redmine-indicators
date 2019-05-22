import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { IssueScope } from 'src/app/services/beans/dto/issue-scope';
import { IssueScopeService } from 'src/app/services/issue-scope.service';

@Component({
  selector: 'app-issue-scope-edit',
  templateUrl: './issue-scope-edit.component.html',
  styleUrls: ['./issue-scope-edit.component.scss']
})
export class IssueScopeEditComponent implements OnInit {
  scopeToEdit: IssueScope;
  newName: string;

  constructor(
    public dialogRef: MatDialogRef<IssueScopeEditComponent>,
    @Inject(MAT_DIALOG_DATA) data, private issueScopeService: IssueScopeService,
    public dialog: MatDialog) {
      this.scopeToEdit = data;
    }

  ngOnInit() {
  }

  editScope() {
    this.scopeToEdit.name = this.newName;
    this.issueScopeService
       .update(this.scopeToEdit)
       .subscribe();
  }

  deleteScope() {
    const dialogdelete = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px'
    });
    dialogdelete.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.issueScopeService.delete(this.scopeToEdit).subscribe();
      }
    });
  }

}
