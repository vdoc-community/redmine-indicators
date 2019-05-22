import { IssueContextRef } from './../../../../services/beans/refs/issue-context-ref';
import { IssueScopeRef } from './../../../../services/beans/refs/issue-scope-ref';
import { Component, OnInit } from '@angular/core';
import { ReleaseNoteIssue } from 'src/app/services/beans/dto/release-note-issue';
import { IssueScope } from 'src/app/services/beans/dto/issue-scope';
import { IssueContext } from 'src/app/services/beans/dto/issue-context';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReleaseNote } from 'src/app/services/beans/dto/release-note';
import { ReleaseNoteIssueService } from 'src/app/services/release-note-issue.service';

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
      releaseNoteIssue.context = new IssueContextRef(releaseNoteIssue.context);
      console.log(releaseNoteIssue);
      this.releaseNoteIssueService.update(releaseNoteIssue).subscribe();
      this.router.navigate([`/admin/release-note/`]);
    });
  }

  private reset(): void {}
}

