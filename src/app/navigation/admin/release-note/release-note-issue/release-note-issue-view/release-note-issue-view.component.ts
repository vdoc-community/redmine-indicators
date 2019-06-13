import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReleaseNoteIssueService } from 'src/app/services/release-note-issue.service';
import { ReleaseNoteIssue, IssueScope, IssueContext, ReleaseNote } from 'src/app/services/beans/dto';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ReleaseNoteIssueEditComponent } from '../release-note-issue-edit/release-note-issue-edit.component';
import { ReleaseNoteService } from 'src/app/services/release-note.service';
import { IssueScopeRef } from 'src/app/services/beans/refs';
import { ReleaseNoteIssueSelectorComponent } from '../release-note-issue-selector/release-note-issue-selector.component';

@Component({
  selector: 'app-release-note-issue-view',
  templateUrl: './release-note-issue-view.component.html',
  styleUrls: ['./release-note-issue-view.component.scss']
})
export class ReleaseNoteIssueViewComponent implements OnInit {
  displayedColumns: string[] = ['issueId', 'problem', 'scope', 'context'];
  private id: number;
  public releaseNote: ReleaseNote;
  private releaseNoteIssues = new MatTableDataSource<ReleaseNoteIssue>();
  selectedReleaseNoteIssues = new MatTableDataSource<ReleaseNoteIssue>();
  first = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private releaseNoteIssueService: ReleaseNoteIssueService,
              private releaseNoteService: ReleaseNoteService) { }

  ngOnInit() {
    this.reset();
    this.selectedReleaseNoteIssues = new MatTableDataSource<ReleaseNoteIssue>();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.releaseNoteIssueService
        .findAllByReleaseNoteId(this.id)
        .subscribe(result => {
          this.releaseNoteIssues.data = result.elements;
          this.selectedReleaseNoteIssues = new MatTableDataSource<ReleaseNoteIssue>();
          result.elements.forEach(element => {
            if (element.add) {
              console.log(element);
              this.selectedReleaseNoteIssues.data.push(element);
              this.first = false;
            }
          });
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

  private reset(): void {}

  openDialog(row?: ReleaseNoteIssue): void {
    const dialogRef = this.dialog.open(ReleaseNoteIssueEditComponent, {
      width: '500px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      row = result;
    });
  }

  // TODO : Possibilité de grouper les 2 fonctions display?
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

  addIssue() {
    const dialogRef = this.dialog.open(ReleaseNoteIssueSelectorComponent, {
      width: '800px',
      data: this.releaseNoteIssues
    });

    dialogRef.afterClosed().subscribe(result => {
      this.releaseNoteIssueService.update(result).subscribe(issue => {
        this.selectedReleaseNoteIssues.data.push(issue);
      });
      this.first = false;
    });
  }

  edit(row: ReleaseNoteIssue) {
    this.router.navigate([`/side/release-note/edit-issue/${row.id}`]);
  }

}
