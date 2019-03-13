import { Component, OnInit } from '@angular/core';
import { ReleaseNoteService} from 'src/app/services/release-note.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-release-note',
  templateUrl: './release-note.component.html',
  styleUrls: ['./release-note.component.scss']
})
export class ReleaseNoteComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  /*public projects: Array<Project>;*/
  constructor(private releaseNoteService: ReleaseNoteService) {  }

  onClickSelect(type: string) {
    const version = (<HTMLInputElement>document.getElementById('version')).value;
    console.log(version);
    const product = (<HTMLInputElement>document.getElementById('product')).value;
    console.log(product);
    if (type === 'pdf') {
      this.releaseNoteService.getPDF(version, product).subscribe(x => {
        const newBlob = new Blob([x], { type: 'application/pdf' });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }
        const data = window.URL.createObjectURL(newBlob);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'RLN.pdf';
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
        }, 100);
      });
    } else if (type === 'doc') {
      this.releaseNoteService.getDOC(version, product).subscribe(x => {
        const newBlob = new Blob([x], { type: 'application/msword' });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }
        const data = window.URL.createObjectURL(newBlob);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'RLN.doc';
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
        }, 100);
      });
    } else if (type === 'zip') {
      this.releaseNoteService.getZIP(version, product).subscribe(x => {
        const newBlob = new Blob([x], { type: 'application/zip' });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }
        const data = window.URL.createObjectURL(newBlob);
        const link = document.createElement('a');
        link.href = data;
        link.download = 'RLN.zip';
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
        }, 100);
      });
    }
  }

  ngOnInit() {
    console.log('test');
    this.releaseNoteService.getProject().subscribe(data => {
      console.log(data);
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}