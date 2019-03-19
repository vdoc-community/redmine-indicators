import {Component, OnInit} from '@angular/core';
import {ReleaseNoteService} from 'src/app/services/release-note.service';
import { FormControl } from '@angular/forms';
import { Version } from 'src/app/services/beans/dto/version';
import { Project } from 'src/app/services/beans/dto/project';
import { ProjectService } from 'src/app/services/project.service';
import { VersionService } from 'src/app/services/version.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-release-note',
  templateUrl: './release-note.component.html',
  styleUrls: ['./release-note.component.scss']
})
export class ReleaseNoteComponent implements OnInit {
  public myControlV = new FormControl();
  public myControlP = new FormControl();
  filteredVersions: Observable<string[]>;
  filteredProjects: Observable<string[]>;
  public projects: Array<Project>;
  public versions: Array<Version>;
  idProject: number;
  idVersion: number;
  nameProject: string;
  nameVersion: string;
  optionsP: string[] = [];
  optionsV: string[] = [];

  constructor(private releaseNoteService: ReleaseNoteService,
              private versionService: VersionService,
              private projectService: ProjectService) {  }

  /**
   * Au chargement de la page,
   * Charge les projets existants dans redmine dans l'autocomplete projet
   */
  ngOnInit() {
    this.projectService
    .findProject('100')
    .subscribe(
      pageP => {
        this.projects = pageP.elements;
        for (const element of this.projects) {
          this.optionsP.push(element.name);
        }
      }
    );

    this.filteredProjects = this.myControlP.valueChanges
      .pipe(
        startWith(''),
        map(proj => this._filterProjet(proj))
      );
  }

  private _filterProjet(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsP.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filterVersion(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsV.filter(option => option.toLowerCase().includes(filterValue));
  }

  /**
   * A la selection du projet :
   * Charge les versions du projet et les charges dans le deuxieme autocomplete
   */
  selectProject() {
    this.nameProject = (<HTMLInputElement>document.getElementById('project')).value;
    const it = this;
    this.idProject = this.projects.find(function(element) {
      return element.name === it.nameProject; }).id;
    console.log(this.idProject);
    this.versionService
    .findByProject(this.idProject)
    .subscribe(
      pageV => {
        this.versions = pageV.elements;
        for (const element of this.versions) {
          this.optionsV.push(element.name);
        }
      }
    );

    this.filteredVersions = this.myControlV.valueChanges
      .pipe(
        startWith(''),
        map(vers => this._filterVersion(vers))
      );
  }

  /**
   * A la selection de la version :
   * Stockage du nom et de l'id de la version selectionnée
   */
  selectVersion() {
    this.nameVersion = (<HTMLInputElement>document.getElementById('version')).value;
    const it = this;
    this.idVersion = this.versions.find(function(element) {
      return element.name === it.nameVersion;
    }).id;
    console.log(this.idVersion);
  }

  /**
   * vide les champs et desactive les boutons et l'autocomplete version
   */
  clear() {
    this.filteredVersions = null;
    this.versions = null;
    (<HTMLInputElement>document.getElementById('project')).value = null;
    this.idProject = null;
    this.idVersion = null;
  }

  /**
   * Appel de l'api
   * Téléchargement du fichier
   */
  onClickSelect(type: string) {
    const version = this.nameProject;
    console.log(version);
    const product = this.nameVersion;
    console.log(product);
    const idV = this.idVersion;
    console.log(idV);
    if (type === 'pdf') {
      this.releaseNoteService.getPDF(version, product, idV).subscribe(x => {
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
      this.releaseNoteService.getDOC(version, product, idV).subscribe(x => {
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
      this.releaseNoteService.getZIP(version, product, idV).subscribe(x => {
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
}
