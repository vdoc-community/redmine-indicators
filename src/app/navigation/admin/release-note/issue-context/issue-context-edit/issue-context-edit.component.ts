import { Component, OnInit, Inject } from '@angular/core';
import { IssueContext } from 'src/app/services/beans/dto';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { IssueContextService } from 'src/app/services/issue-context.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-issue-context-edit',
  templateUrl: './issue-context-edit.component.html',
  styleUrls: ['./issue-context-edit.component.scss']
})
export class IssueContextEditComponent implements OnInit {
  contextToEdit: IssueContext;
  newName: string;

  constructor(
    public dialogRef: MatDialogRef<IssueContextEditComponent>,
    @Inject(MAT_DIALOG_DATA) data, private issueContextService: IssueContextService,
    public dialog: MatDialog) {
      this.contextToEdit = data;
    }

  ngOnInit() {
  }

  editContext() {
    this.contextToEdit.description = this.newName;
    this.issueContextService
       .update(this.contextToEdit)
       .subscribe();
  }

  deleteContext() {
    const dialogdelete = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px'
    });
    dialogdelete.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.issueContextService.delete(this.contextToEdit).subscribe();
      }
    });
  }
}
