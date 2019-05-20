import { ReleaseNote } from './../../../../services/beans/dto/release-note';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ReleaseNoteService } from 'src/app/services/release-note.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-release-note-view',
  templateUrl: './release-note-view.component.html',
  styleUrls: ['./release-note-view.component.scss']
})
export class ReleaseNoteViewComponent implements OnInit {
  public controlReleaseNote = new FormControl();
  filteredReleaseNote: Observable<ReleaseNote[]>;
  public releaseNotes: Array<ReleaseNote> = [];
  selectedReleaseNote: ReleaseNote = null;
  private changed = new Array<(value: ReleaseNote) => void>();

  writeValue(releaseNote: ReleaseNote): void {
    this.selectedReleaseNote = releaseNote;
  }

  registerOnChange(fn: (value: ReleaseNote) => void): void {
    this.changed.push(fn);
  }

  registerOnTouched(fn: any): void {
  }

  constructor(private releaseNoteService: ReleaseNoteService) {}

  ngOnInit() {
    this.releaseNoteService
      .findAll()
      .subscribe(
        page => {
          page.elements.sort((a, b) => a.name.localeCompare(b.name));
          this.releaseNotes = page.elements;
        }
      );

    this.filteredReleaseNote = this.controlReleaseNote.valueChanges
      .pipe(
      startWith(''),
      map(releaseNote => releaseNote ? this._filterReleaseNotes(releaseNote) : this.releaseNotes.slice())
      );
  }

  private _filterReleaseNotes(value: string | ReleaseNote): ReleaseNote[] {
    if ( value instanceof ReleaseNote) {
      return [value];
    }
    const filterValue = value.toLowerCase();
    return this.releaseNotes.filter(option =>
      option.name.toLowerCase().includes(filterValue));
  }

  displayReleaseNote(releaseNote?: ReleaseNote ): string {
    if (!releaseNote) {
      return '';
    }
    return releaseNote.name;
  }

  releaseNoteSelect() {
    this.changed.forEach(f => f(this.selectedReleaseNote));
  }

}
