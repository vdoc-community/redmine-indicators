import { Component, OnInit } from '@angular/core';
import { ReleaseNoteIssue, IssueScope, IssueContext, ReleaseNote } from 'src/app/services/beans/dto';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ReleaseNoteIssueService } from 'src/app/services/release-note-issue.service';
import { IssueScopeRef } from 'src/app/services/beans/refs';


@Component({
  selector: 'app-release-note-edit',
  templateUrl: './release-note-edit.component.html',
  styleUrls: ['./release-note-edit.component.scss']
})
export class ReleaseNoteEditComponent implements OnInit {
  public releaseNoteIssues: Array<ReleaseNoteIssue> = null;
  public displayedColumns: string[] = ['scope', 'context', 'problem', 'ref', 'add'];
  selectedScope: IssueScope = null;
  selectedContext: IssueContext = null;
  private id: number;
  public releaseNote: ReleaseNote;
  public loading = true;
  mapping: Map<string, string>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private releaseNoteIssueService: ReleaseNoteIssueService) {
    this.mapping = new Map();
    this.mapping.set('pdf', 'application/pdf');
    this.mapping.set('doc', 'application/msword');
    this.mapping.set('zip', 'application/zip');
              }

  ngOnInit() {
    this.reset();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.releaseNoteIssueService
        .findAllByReleaseNoteId(this.id)
        .subscribe(releaseNoteIssue => {
          this.releaseNoteIssues = releaseNoteIssue.elements;
        });
    });
  }

  save() {
    this.releaseNoteIssues.forEach(releaseNoteIssue => {
      releaseNoteIssue.scope = new IssueScopeRef(releaseNoteIssue.scope);
      this.releaseNoteIssueService.update(releaseNoteIssue).subscribe();
      this.router.navigate([`/admin/release-note/`]);
    });
  }

  private reset(): void {}
}

