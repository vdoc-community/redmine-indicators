import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReleaseNoteIssue, IssueScope, IssueContext } from 'src/app/services/beans/dto';

@Component({
  selector: 'app-release-note-issue-edit',
  templateUrl: './release-note-issue-edit.component.html',
  styleUrls: ['./release-note-issue-edit.component.scss']
})
export class ReleaseNoteIssueEditComponent implements OnInit {
  selectedScope: IssueScope = null;
  selectedContext: IssueContext = null;
  issueToEdit: ReleaseNoteIssue;

  constructor(
    public dialogRef: MatDialogRef<ReleaseNoteIssueEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReleaseNoteIssue) {
      this.issueToEdit = data;
    }

  ngOnInit() {
    this.selectedContext = this.issueToEdit.context;
    this.selectedScope = this.issueToEdit.scope;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  edit() {
    this.issueToEdit.context = this.selectedContext;
    this.issueToEdit.scope = this.selectedScope;
    console.log(this.issueToEdit);
    this.dialogRef.close();
  }

  clearScope() {
    this.selectedContext = null;
    this.selectedScope = null;
    this.issueToEdit.context = null;
    this.issueToEdit.scope = null;
  }

  clearContext() {
    this.selectedContext = null;
    this.issueToEdit.context = null;
  }

}
