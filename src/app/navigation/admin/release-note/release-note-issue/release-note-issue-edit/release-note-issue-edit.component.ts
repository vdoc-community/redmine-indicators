import { IssueContextEditComponent } from './../../issue-context/issue-context-edit/issue-context-edit.component';
import { IssueScopeEditComponent } from './../../issue-scope/issue-scope-edit/issue-scope-edit.component';
import { Component, OnInit } from '@angular/core';
import { ReleaseNoteIssue, ReleaseNote } from 'src/app/services/beans/dto';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReleaseNoteIssueService } from 'src/app/services/release-note-issue.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-release-note-issue-edit',
  templateUrl: './release-note-issue-edit.component.html',
  styleUrls: ['./release-note-issue-edit.component.scss']
})
export class ReleaseNoteIssueEditComponent implements OnInit {
  issueToEdit: ReleaseNoteIssue = null;
  releaseNote: ReleaseNote;
  id: number;
  test = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private releaseNoteIssueService: ReleaseNoteIssueService) {

    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.releaseNoteIssueService
        .findById(this.id)
        .subscribe(result => {
          this.issueToEdit = result;
        });
    });
  }

  edit() {
    this.releaseNoteIssueService.update(this.issueToEdit).subscribe(data => {
      this.router.navigate([`/release-note/edit/${this.issueToEdit.releaseNote.id}`]);
    });
  }

  createScope() {
    const dialogRef = this.dialog.open(IssueScopeEditComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.issueToEdit.scope = result;
      }
    });
  }

  createContext() {
    const dialogRef = this.dialog.open(IssueContextEditComponent, {
      width: '400px',
      data: this.issueToEdit.scope
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.issueToEdit.context = result;
      }
    });
  }

  public cancel() {
    this.router.navigate([`/release-note/edit/${this.issueToEdit.releaseNote.id}`]);
  }

}
