import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IssueScopeService } from 'src/app/services/issue-scope.service';
import { IssueScope } from 'src/app/services/beans/dto/issue-scope';

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
    @Inject(MAT_DIALOG_DATA) data, private issueScopeService: IssueScopeService) {
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

}
