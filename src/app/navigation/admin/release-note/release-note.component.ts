
import { Component, OnInit } from '@angular/core';
import { ReleaseNoteService } from 'src/app/services/release-note.service';
import { Project, Version } from 'src/app/services/beans/dto';
import { Issue } from 'src/app/services/beans/dto/issue';
import { ReleaseNote } from 'src/app/services/beans/dto/release-note';
import { Router } from '@angular/router';

@Component({
  selector: 'app-release-note',
  templateUrl: './release-note.component.html',
  styleUrls: ['./release-note.component.scss']
})
export class ReleaseNoteComponent implements OnInit {
  selectedProject: Project = null;
  selectedVersion: Version = null;
  selectedReleaseNote: ReleaseNote;
  existing: boolean;
  releaseNotes: Array<ReleaseNote>;
  dataSourceIssue: Array<Issue>;
  public displayedColumns: string[] = ['name'];

  constructor(private releaseNoteService: ReleaseNoteService,
              private router: Router) {
  }

  ngOnInit() {
    this.releaseNoteService
      .findAll()
      .subscribe(
        page => {
          page.elements.sort((a, b) => a.name.localeCompare(b.name));
          this.releaseNotes = page.elements;
        }
      );
  }
  createRLN() {
    const name = this.selectedProject.name + ' ' + this.selectedVersion.name;
    this.releaseNotes.forEach((releaseNote) => {
      if (releaseNote.name === name) {
        this.existing = true;
        this.selectedReleaseNote = releaseNote;
      }}
    );
    if (this.existing) {
      this.router.navigate([`/admin/release-note/${this.selectedReleaseNote.id}`]);
    } else {
      this.releaseNoteService.createRLN(this.selectedVersion.id).subscribe(x => {
        this.router.navigate([`/admin/release-note/${x.id}`]);
      });
    }
  }
}
