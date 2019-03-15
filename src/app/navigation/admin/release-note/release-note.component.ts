import {Component, OnInit} from '@angular/core';
import {ReleaseNoteService} from 'src/app/services/release-note.service';
import { FormControl } from '@angular/forms';
import { Version } from 'src/app/services/beans/dto/version';
import { Project } from 'src/app/services/beans/dto/project';
import { ProjectService } from 'src/app/services/project.service';
import { VersionService } from 'src/app/services/version.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-release-note',
  templateUrl: './release-note.component.html',
  styleUrls: ['./release-note.component.scss']
})
export class ReleaseNoteComponent implements OnInit {
  public myControlV = new FormControl();
  public myControlP = new FormControl();
  optionsVersions: Version[] = [];
  optionsProjects: Project[] = [];
  public projects: Array<Project>;
  public versions: Array<Version>;
  idProject: number;
  idVersion: number;
  nameProject: string;
  nameVersion: string;

  constructor(private releaseNoteService: ReleaseNoteService,
              private versionService: VersionService,
              private projectService: ProjectService) {  }

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

  // blob(type: string, typeMime: string, version: string, product: string) {
  //   this.releaseNoteService.getDOC(version, product).subscribe(x => {
  //     const newBlob = new Blob([x], { type: 'application/msword' });
  //     if (window.navigator && window.navigator.msSaveOrOpenBlob) {
  //       window.navigator.msSaveOrOpenBlob(newBlob);
  //       return;
  //     }
  //     const data = window.URL.createObjectURL(newBlob);
  //     const link = document.createElement('a');
  //     link.href = data;
  //     link.download = 'RLN.doc';
  //     link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  //     setTimeout(function () {
  //     window.URL.revokeObjectURL(data);
  //     link.remove();
  //     }, 100);
  //   });
  // }

  ngOnInit() {
    this.projectService
    .findProject('100')
    .subscribe(
      pageP => {
        this.projects = pageP.elements;
        this.optionsProjects = this.projects;
      }
    );

    this.optionsProjects = this.myControlP.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsProjects.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayFnP(option: Project) {
    if (option) { return option.name; }
  }

  displayFnV(option: Version) {
    if (option) { return option.name; }
  }

  selectProject() {
    this.nameProject = (<HTMLInputElement>document.getElementById('project')).value;
    const it = this;
    this.idProject = this.optionsProjects.find(function(element) {
      return element.name === it.nameProject; }).id;
    console.log(this.idProject);
    this.versionService
    .findByProject(this.idProject)
    .subscribe(
      pageV => {
        this.versions = pageV.elements;
        this.optionsVersions = this.versions;
      }
    );
  }

  selectVersion() {
    this.nameVersion = (<HTMLInputElement>document.getElementById('version')).value;
    const it = this;
    this.idVersion = this.optionsVersions.find(function(element) {
      return element.name === it.nameVersion;
    }).id;
    console.log(this.idVersion);
  }
  clear() {
    this.optionsVersions = [];
    (<HTMLInputElement>document.getElementById('project')).value = null;
    this.idProject = null;
    this.idVersion = null;
  }
}
