import {Component, OnInit} from '@angular/core';
import {ReleaseNoteService} from 'src/app/services/release-note.service';
import { FormControl } from '@angular/forms';
import { Project, Version } from 'src/app/services/beans/dto';
import { ProjectService } from 'src/app/services/project.service';
import { VersionService } from 'src/app/services/version.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-release-note',
  templateUrl: './release-note.component.html',
  styleUrls: ['./release-note.component.scss']
})
export class ReleaseNoteComponent implements OnInit {
  public controlVersion = new FormControl();
  filteredProjects: Observable<Project[]>;
  public projects: Array<Project> = [];
  selectedProject: Project = null;

  public controlProject = new FormControl();
  filteredVersions: Observable<Version[]>;
  public versions: Array<Version> = [];
  selectedVersion: Version = null;

  mapping: Map<string, string>;

  constructor(private releaseNoteService: ReleaseNoteService,
              private versionService: VersionService,
              private projectService: ProjectService) {
    this.mapping = new Map();
    this.mapping.set('pdf', 'application/pdf');
    this.mapping.set('doc', 'application/msword');
    this.mapping.set('zip', 'application/zip');
  }

  /**
   * Au chargement de la page,
   * charge les projets existants dans redmine dans l'autocomplete projet
   */
  ngOnInit() {
    this.projectService
      .findAll()
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

  private _filterProject(value: string): Project[] {
    const filterValue = value.toLowerCase();
    return this.projects.filter(option =>
      option.name.toLowerCase().includes(filterValue));
  }

  private _filterVersion(value: string): Version[] {
    const filterValue = value.toLowerCase();
    return this.versions.filter(option =>
      option.name.toLowerCase().includes(filterValue));
  }

  /**
   * A la selection du projet :
   * Charge les versions du projet et les charges dans le deuxieme autocomplete
   */
  selectProject() {
    this.versionService
      .findByProject(this.selectedProject.id)
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

  displayVersion(version?: Version ): string {
    if (!version) {
      return '';
    }
    return version.name;
  }
  displayProject(project: Project ): string {
    if (!project) {
      return '';
    }
    return project.name;
  }

  /**
   * vide les champs et desactive les boutons et l'autocomplete version
   */
  clear() {
    this.versions = null;
    this.selectedProject = null;
    this.selectedVersion = null;
  }

  /**
   * Appel de l'api
   * Téléchargement du fichier
   */
  onClickSelect(type: 'pdf' | 'doc' | 'zip') {
    const mime: string = this.mapping.get(type);
    this.releaseNoteService.getReleaseNote(this.selectedVersion.id, type).subscribe(x => {
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
  }
}
