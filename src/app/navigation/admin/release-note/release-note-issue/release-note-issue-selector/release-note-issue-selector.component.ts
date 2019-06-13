import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator } from '@angular/material';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ReleaseNoteIssue } from 'src/app/services/beans/dto';

@Component({
  selector: 'app-release-note-issue-selector',
  templateUrl: './release-note-issue-selector.component.html',
  styleUrls: ['./release-note-issue-selector.component.scss']
})
export class ReleaseNoteIssueSelectorComponent implements OnInit {
  releaseNoteIssues = new MatTableDataSource<ReleaseNoteIssue>(ELEMENT_DATA);
  displayedColumns: string[] = ['problem', 'issueId'];
  selectedIssue: ReleaseNoteIssue;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<ReleaseNoteIssueSelectorComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.releaseNoteIssues = this.data;
    this.releaseNoteIssues.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.releaseNoteIssues.filter = filterValue.trim().toLowerCase();
  }

  select(row: ReleaseNoteIssue) {
    if (this.selectedIssue) {
      this.selectedIssue.add = false;
    }
    this.selectedIssue = row;
    this.selectedIssue.add = true;
  }
}

const ELEMENT_DATA: ReleaseNoteIssue[] = [];
