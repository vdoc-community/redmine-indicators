import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { IssueScope } from 'src/app/services/beans/dto/issue-scope';
import { IssueScopeService } from 'src/app/services/issue-scope.service';

@Component({
  selector: 'app-issue-scope-edit',
  templateUrl: './issue-scope-edit.component.html',
  styleUrls: ['./issue-scope-edit.component.scss']
})
export class IssueScopeEditComponent implements OnInit {
  scopeToEdit: IssueScope;
  newScope: IssueScope;
  newName: string;

  constructor(
    public dialogRef: MatDialogRef<IssueScopeEditComponent>,
    @Inject(MAT_DIALOG_DATA) data, private issueScopeService: IssueScopeService,
    public dialog: MatDialog) {
      if (data !== null) {
        this.scopeToEdit = data;
      }
    }

  ngOnInit() {
  }

  createScope() {
    this.scopeToEdit = new IssueScope(null, this.newName);
    this.issueScopeService
       .save(this.scopeToEdit)
       .subscribe(result => {
         this.newScope = result;
       });
  }
}
