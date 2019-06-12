import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ReleaseNoteIssueService } from 'src/app/services/release-note-issue.service';
import { ReleaseNoteIssue, IssueScope, IssueContext, ReleaseNote } from 'src/app/services/beans/dto';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ReleaseNoteIssueEditComponent } from '../release-note-issue-edit/release-note-issue-edit.component';
import { ReleaseNoteService } from 'src/app/services/release-note.service';
import { IssueScopeRef } from 'src/app/services/beans/refs';

@Component({
  selector: 'app-release-note-issue-view',
  templateUrl: './release-note-issue-view.component.html',
  styleUrls: ['./release-note-issue-view.component.scss']
})
export class ReleaseNoteIssueViewComponent implements OnInit {
  displayedColumns: string[] = ['select', 'scope', 'context', 'problem', 'issueId', 'edit'];
  private id: number;
  public releaseNote: ReleaseNote;
  releaseNoteIssues = new MatTableDataSource<ReleaseNoteIssue>(ELEMENT_DATA);
  selection = new SelectionModel<ReleaseNoteIssue>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
              public dialog: MatDialog,
              private releaseNoteIssueService: ReleaseNoteIssueService,
              private releaseNoteService: ReleaseNoteService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.releaseNoteIssueService
        .findAllByReleaseNoteId(this.id)
        .subscribe(releaseNoteIssue => {
          this.releaseNoteIssues.data = releaseNoteIssue.elements;
        });
      this.releaseNoteService
        .findById(this.id)
        .subscribe(result => {
          this.releaseNote = result;
        });
    });
    this.releaseNoteIssues.sortingDataAccessor = this.sortingDataAccessor;
    this.releaseNoteIssues.paginator = this.paginator;
    this.releaseNoteIssues.sort = this.sort;
  }

  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key], item);
    }
    return item[property];
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.releaseNoteIssues.data.forEach(row => this.selection.select(row));
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.releaseNoteIssues.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: ReleaseNoteIssue): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.issueId + 1}`;
  }

  openDialog(row?: ReleaseNoteIssue): void {
    const dialogRef = this.dialog.open(ReleaseNoteIssueEditComponent, {
      width: '500px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      row = result;
    });
  }

  displayScope(scope?: IssueScope ): string {
    if (!scope) {
      return '';
    }
    return scope.name;
  }

  displayContext(context?: IssueContext ): string {
    if (!context) {
      return '';
    }
    return context.description;
  }

  save() {
    this.releaseNoteIssues.data.forEach(releaseNoteIssue => {
      releaseNoteIssue.scope = new IssueScopeRef(releaseNoteIssue.scope);
      this.releaseNoteIssueService.save(releaseNoteIssue).subscribe();
    });
  }
}

const ELEMENT_DATA: ReleaseNoteIssue[] = [];
