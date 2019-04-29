
import { Component, OnInit } from '@angular/core';
import { ReleaseNoteService } from 'src/app/services/release-note.service';
import { Project, Version } from 'src/app/services/beans/dto';
import { IssueScope } from 'src/app/services/beans/dto/issue-scope';
import { IssueContext } from 'src/app/services/beans/dto/issue-context';

@Component({
  selector: 'app-release-note',
  templateUrl: './release-note.component.html',
  styleUrls: ['./release-note.component.scss']
})
export class ReleaseNoteComponent implements OnInit {
  mapping: Map<string, string>;
  selectedProject: Project = null;
  selectedVersion: Version = null;
  selectedScope: IssueScope = null;
  selectedContext: IssueContext = null;

  constructor(private releaseNoteService: ReleaseNoteService) {
    this.mapping = new Map();
    this.mapping.set('pdf', 'application/pdf');
    this.mapping.set('doc', 'application/msword');
    this.mapping.set('zip', 'application/zip');
  }

  ngOnInit() {
  }

  /**
   * Appel de l'api Release Note
   * @param type 'pdf' | 'doc' | 'zip'
   */
  onClickSelect(type: 'pdf' | 'doc' | 'zip') {
    const mime: string = this.mapping.get(type);
    this.releaseNoteService.getReleaseNote(this.selectedVersion.id, type).subscribe(x => {
      this.newBlob(x, type, mime);
    });
  }

  /**
   * Téléchargement du fichier
   * @param x: Blob
   * @param type: string
   * @param mime: string
   */
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
}
