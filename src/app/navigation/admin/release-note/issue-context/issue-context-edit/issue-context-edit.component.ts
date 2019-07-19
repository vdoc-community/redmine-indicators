import { Component, OnInit, Inject } from '@angular/core';
import { IssueContext, IssueScope } from 'src/app/services/beans/dto';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { IssueContextService } from 'src/app/services/issue-context.service';


@Component({
  selector: 'app-issue-context-edit',
  templateUrl: './issue-context-edit.component.html',
  styleUrls: ['./issue-context-edit.component.scss']
})
export class IssueContextEditComponent implements OnInit {
  contextToEdit: IssueContext;
  scope: IssueScope;
  newContext: IssueContext;
  newName: string;

  constructor(
    public dialogRef: MatDialogRef<IssueContextEditComponent>,
    @Inject(MAT_DIALOG_DATA) data, private issueContextService: IssueContextService,
    public dialog: MatDialog) {
      this.scope = data;
    }

  ngOnInit() {
  }

  createContext() {
    this.contextToEdit = new IssueContext(null, null, this.newName, this.scope);
    this.issueContextService
       .save(this.contextToEdit)
       .subscribe(result => {
         this.newContext = result;
       });
  }
}
