import {Component, OnInit} from '@angular/core';
import {ReleaseNoteService} from 'src/app/services/release-note.service';
import { FormControl } from '@angular/forms';
import { Version } from 'src/app/services/beans/dto/version';
import { Project } from 'src/app/services/beans/dto/project';
import { ProjectService } from 'src/app/services/project.service';
import { VersionService } from 'src/app/services/version.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { optimizeGroupPlayer } from '@angular/animations/browser/src/render/shared';

@Component({
  selector: 'app-release-note',
  templateUrl: './release-note.component.html',
  styleUrls: ['./release-note.component.scss']
})
export class ReleaseNoteComponent implements OnInit {
  public controlVersion = new FormControl();
  filteredVersions: Observable<Version[]>;

  public controlProject = new FormControl();
  filteredProjects: Observable<Project[]>;

  public projects: Array<Project>;
  public versions: Array<Version>;
  idProject: number;
  idVersion: number;
  nameProject: string;
  nameVersion: string;

  constructor(private releaseNoteService: ReleaseNoteService,
              private versionService: VersionService,
              private projectService: ProjectService) {  }

  /**
   * Au chargement de la page,
   * charge les projets existants dans redmine dans l'autocomplete projet
   */
  ngOnInit() {
    this.projectService
      .findProject('100')
      .subscribe(
        pageP => {
          this.projects = pageP.elements;
        }
      );

    this.filteredProjects = this.controlProject.valueChanges
      .pipe(
        startWith(''),
        map(project => this._filterProject(project))
      );
  }

  private _filterProject(value: any): Project[] {
    const filterValue = value.toLowerCase();
    return this.projects.filter(option =>
      option.name.toLowerCase().includes(filterValue));
  }

  private _filterVersion(value: any): Version[] {
    const filterValue = value.toLowerCase();
    return this.versions.filter(option =>
      option.name.toLowerCase().includes(filterValue));
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
    this.versionService
      .findByProject(this.idProject)
      .subscribe(
        pageV => {
          this.versions = pageV.elements;
        }
      );

    this.filteredVersions = this.controlVersion.valueChanges
      .pipe(
        startWith(''),
        map(version => this._filterVersion(version))
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
    let mime: string;
    switch (type) {
      case 'pdf': {
        mime = 'application/pdf';
        break;
      }
      case 'doc': {
        mime = 'application/msword';
        break;
      }
      case 'zip': {
        mime = 'application/zip';
        break;
      }
    }
      this.releaseNoteService.getReleaseNote(version, type).subscribe(x => {
        this.newBlob(x, type, mime);
      });
  }

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
    setTimeout(function () {
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  }
}
