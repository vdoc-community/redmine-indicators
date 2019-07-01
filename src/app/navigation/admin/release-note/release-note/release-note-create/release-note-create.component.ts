import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Project, Version, ReleaseNote } from 'src/app/services/beans/dto';
import { ReleaseNoteService } from 'src/app/services/release-note.service';

@Component({
  selector: 'app-release-note-create',
  templateUrl: './release-note-create.component.html',
  styleUrls: ['./release-note-create.component.scss']
})
export class ReleaseNoteCreateComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  selectedProject: Project = null;
  selectedVersion: Version = null;
  selectedReleaseNote: ReleaseNote;
  existing: boolean;
  releaseNotes: Array<ReleaseNote>;
  isLinear = true;
  loading = false;

  constructor(private router: Router,
              private _formBuilder: FormBuilder,
              private releaseNoteService: ReleaseNoteService) { }

  ngOnInit() {
    this.releaseNoteService.findAll()
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
    this.loading = true;
    const name = this.selectedProject.name + ' ' + this.selectedVersion.name;
    this.releaseNotes.forEach((releaseNote) => {
      if (releaseNote.name === name) {
        this.existing = true;
        this.selectedReleaseNote = releaseNote;
      }}
    );
    if (this.existing) {
      this.router.navigate([`/release-note/edit/${this.selectedReleaseNote.id}`]);
    } else {
      this.releaseNoteService.createRLN(this.selectedVersion.id).subscribe(x => {
        this.router.navigate([`/release-note/edit/${x.id}`]);
      });
    }
  }

}
