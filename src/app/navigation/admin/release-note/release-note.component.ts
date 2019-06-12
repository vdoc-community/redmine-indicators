
import { Component, OnInit } from '@angular/core';
import { ReleaseNoteService } from 'src/app/services/release-note.service';
import { Project, Version } from 'src/app/services/beans/dto';
import { ReleaseNote } from 'src/app/services/beans/dto/release-note';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  isLinear = true;
  releaseNotes: Array<ReleaseNote>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private releaseNoteService: ReleaseNoteService,
              private router: Router,
              private _formBuilder: FormBuilder) {
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
    this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
    this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
      });
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
