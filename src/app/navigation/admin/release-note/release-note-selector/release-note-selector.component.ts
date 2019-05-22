import { ReleaseNote } from '../../../../services/beans/dto/release-note';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ReleaseNoteService } from 'src/app/services/release-note.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-release-note-selector',
  templateUrl: './release-note-selector.component.html',
  styleUrls: ['./release-note-selector.component.scss']
})
export class ReleaseNoteSelectorComponent implements OnInit {
  public controlReleaseNote = new FormControl();
  filteredReleaseNote: Observable<ReleaseNote[]>;
  public releaseNotes: Array<ReleaseNote> = [];
  public displayedColumns: string[] = ['name'];

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

}
