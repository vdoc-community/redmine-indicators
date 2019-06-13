import { Component, OnInit } from '@angular/core';
import { ReleaseNoteIssue, ReleaseNote } from 'src/app/services/beans/dto';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReleaseNoteIssueService } from 'src/app/services/release-note-issue.service';

@Component({
  selector: 'app-release-note-issue-edit',
  templateUrl: './release-note-issue-edit.component.html',
  styleUrls: ['./release-note-issue-edit.component.scss']
})
export class ReleaseNoteIssueEditComponent implements OnInit {
  issueToEdit: ReleaseNoteIssue = null;
  releaseNote: ReleaseNote;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private releaseNoteIssueService: ReleaseNoteIssueService) {

    }

  ngOnInit() {
    this.reset();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.releaseNoteIssueService
        .findById(this.id)
        .subscribe(result => {
          this.issueToEdit = result;
        });
    });
  }

  private reset(): void {}

  edit() {
    this.releaseNoteIssueService.update(this.issueToEdit).subscribe(data => {
      this.router.navigate(['..'], { relativeTo: this.route });
    });
  }

  clearScope() {
    this.issueToEdit.context = null;
    this.issueToEdit.scope = null;
  }

  clearContext() {
    this.issueToEdit.context = null;
  }

  public cancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
