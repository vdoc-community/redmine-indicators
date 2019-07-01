import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReleaseNoteIssueService } from 'src/app/services/release-note-issue.service';
import { ReleaseNoteIssue, IssueScope, IssueContext, ReleaseNote } from 'src/app/services/beans/dto';
import { MatDialog, MatPaginator, MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { ReleaseNoteService } from 'src/app/services/release-note.service';
import { ReleaseNoteIssueSelectorComponent } from '../release-note-issue-selector/release-note-issue-selector.component';

@Component({
  selector: 'app-release-note-issue-view',
  templateUrl: './release-note-issue-view.component.html',
  styleUrls: ['./release-note-issue-view.component.scss']
})
export class ReleaseNoteIssueViewComponent implements OnInit {
  displayedColumns: string[] = ['delete', 'issueId', 'problem', 'scope', 'context'];
  clickableColumns: string[] = ['issueId', 'problem', 'scope', 'context'];
  id: number;
  releaseNote: ReleaseNote;
  selectedData: Array<ReleaseNoteIssue> = [];
  selectedIssues: MatTableDataSource<ReleaseNoteIssue>;
  notSelectedData: Array<ReleaseNoteIssue> = [];
  notSelectedIssues: MatTableDataSource<ReleaseNoteIssue>;
  first = true;
  mapping: Map<string, string>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private releaseNoteIssueService: ReleaseNoteIssueService,
              private releaseNoteService: ReleaseNoteService,
              private _snackbar: MatSnackBar) {
    this.mapping = new Map();
    this.mapping.set('pdf', 'application/pdf');
    this.mapping.set('doc', 'application/msword');
    this.mapping.set('zip', 'application/zip');
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.releaseNoteIssueService
        .findAllByReleaseNoteId(this.id)
        .subscribe(result => {
          result.elements.forEach(element => {
            if (element.add) {
              this.selectedData.push(element);
              this.first = false;
            } else {
              this.notSelectedData.push(element);
            }
          });
          this.notSelectedIssues = new MatTableDataSource<ReleaseNoteIssue>(this.notSelectedData);
          this.selectedIssues = new MatTableDataSource<ReleaseNoteIssue>(this.selectedData);
          this.selectedIssues.paginator = this.paginator;
          this.selectedIssues.sort = this.sort;
        });
      this.releaseNoteService
        .findById(this.id)
        .subscribe(result => {
          this.releaseNote = result;
        });
    });

  }

  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key], item);
    }
    return item[property];
  }


  // Ouvre la dialog pour l'ajout d'une nouvelle issue.
  addIssue() {
    const dialogRef = this.dialog.open(ReleaseNoteIssueSelectorComponent, {
      width: '800px',
      data: this.notSelectedIssues,
      position: {top: '100px'},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.releaseNoteIssueService.update(result).subscribe(issue => {
          this.selectedData.push(result);
          const index: number = this.notSelectedData.indexOf(result);
          if (index !== -1) {
            this.notSelectedData.splice(index, 1);
          }
          this.notSelectedIssues = new MatTableDataSource<ReleaseNoteIssue>(this.notSelectedData);
          this.selectedIssues = new MatTableDataSource<ReleaseNoteIssue>(this.selectedData);
          this.selectedIssues.paginator = this.paginator;
          this.selectedIssues.sort = this.sort;
          this.first = false;
        });
      }
    });
  }

  // Ouvre l'issue du tableau pour l'éditer
  edit(row: ReleaseNoteIssue) {
    this.router.navigate([`/release-note/edit-issue/${row.id}`]);
  }

  delete(issue: ReleaseNoteIssue) {
    issue.add = false;
    this.releaseNoteIssueService.update(issue).subscribe();
    this.notSelectedData.push(issue);
    const index: number = this.selectedData.indexOf(issue);
    if (index !== -1) {
      this.selectedData.splice(index, 1);
    }
    this.notSelectedIssues = new MatTableDataSource<ReleaseNoteIssue>(this.notSelectedData);
    this.selectedIssues = new MatTableDataSource<ReleaseNoteIssue>(this.selectedData);
    this.selectedIssues.paginator = this.paginator;
    this.selectedIssues.sort = this.sort;

    this.openSnackBar(issue);

    // Fait réapparaitre la page sans issue selectionnée
    if (this.selectedIssues.data.length === 0) {
      this.first = true;
    }
  }

  openSnackBar(issue: ReleaseNoteIssue) {
    const snackBarRef = this._snackbar.open(`Issue n°${issue.issueId} deleted`, 'Cancel', {
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => {
      issue.add = true;
      this.releaseNoteIssueService.update(issue).subscribe();
      this.selectedData.push(issue);
      const index: number = this.notSelectedData.indexOf(issue);
      if (index !== -1) {
        this.notSelectedData.splice(index, 1);
      }
      this.notSelectedIssues = new MatTableDataSource<ReleaseNoteIssue>(this.notSelectedData);
      this.selectedIssues = new MatTableDataSource<ReleaseNoteIssue>(this.selectedData);
      this.selectedIssues.paginator = this.paginator;
      this.selectedIssues.sort = this.sort;
      this.first = false;
    });
  }

  onClickSelect(type: 'pdf' | 'doc' | 'zip') {
    let counter = 0;
    this.selectedData.forEach(issue => {
      if (issue.scope === null || issue.context === null) {
        counter = counter + 1;
      }
    });
    if (counter === 0) {
      const mime: string = this.mapping.get(type);
      this.releaseNoteService.getReleaseNote(this.id, type).subscribe(x => {
        this.newBlob(x, type, mime);
      });
    } else {
      this._snackbar.open(`${counter} issue(s) have no context or module`, null, {
        duration: 2000,
        panelClass: ['red-snackbar']
      });
    }
  }
  private newBlob(x: Blob, type: string, mime: string) {
    const newBlob = new Blob([x], { type: mime });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
  }
    const data = window.URL.createObjectURL(newBlob);
    const link = document.createElement('a');
    link.href = data;
    link.download = `RLN.${type}`;
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  }
   // TODO : Pourquoi ça fonctionne pas?
   private refreshSelectedTab(data: ReleaseNoteIssue[]): void {
    this.selectedIssues = new MatTableDataSource<ReleaseNoteIssue>(data);
    this.selectedIssues.paginator = this.paginator;
    this.selectedIssues.sort = this.sort;
    if (this.paginator) {
      this.paginator.length = this.selectedData.length;
    }
  }
  // TODO : Possibilité de grouper les 2 fonctions display?
  displayScope(scope?: IssueScope): string {
    if (!scope) {
      return '';
    }
    return scope.name;
  }
  displayContext(context?: IssueContext): string {
    if (!context) {
      return '';
    }
    return context.description;
  }
}
