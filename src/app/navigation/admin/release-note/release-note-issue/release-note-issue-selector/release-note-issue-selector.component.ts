import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ReleaseNoteIssue } from 'src/app/services/beans/dto';

@Component({
  selector: 'app-release-note-issue-selector',
  templateUrl: './release-note-issue-selector.component.html',
  styleUrls: ['./release-note-issue-selector.component.scss']
})
export class ReleaseNoteIssueSelectorComponent implements OnInit {
  displayedColumns: string[] = ['issueId', 'problem'];
  selectedIssue: ReleaseNoteIssue;
  selectedRowIndex = -1;

  @ViewChild(MatSort, {static : false}) sort2 !: MatSort;
  @ViewChild(MatPaginator, {static : false}) paginator2 !: MatPaginator;

  constructor(public dialogRef: MatDialogRef<ReleaseNoteIssueSelectorComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
    this.data.sort = this.sort2;
    this.data.paginator = this.paginator2;
  }

  applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
  }

  select(row: ReleaseNoteIssue) {
    if (this.selectedIssue) {
      this.selectedIssue.add = false;
    }
    this.selectedRowIndex = row.id;
    this.selectedIssue = row;
    this.selectedIssue.add = true;
  }
}
