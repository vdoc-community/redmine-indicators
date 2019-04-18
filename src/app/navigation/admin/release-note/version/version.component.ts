import { Component, OnInit, Output, EventEmitter, Input, HostListener} from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Version, Project } from 'src/app/services/beans/dto';
import { VersionService } from 'src/app/services/version.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: VersionComponent, multi: true}
  ]
})
export class VersionComponent implements OnInit, ControlValueAccessor  {
  public controlVersion = new FormControl();
  filteredVersions: Observable<Version[]>;
  public versions: Array<Version> = [];
  selectedVersion: Version = null;
  private _project: Project;
  private changed = new Array<(value: Version) => void>();

  writeValue(version: Project): void {
    this.selectedVersion = version;
  }

  registerOnChange(fn: (value: Version) => void): void {
    this.changed.push(fn);
  }

  registerOnTouched(fn: any): void {
  }

  @Input()
  set project(project: Project | undefined) {
    if (project) {
      this._project = project;
      this.importVersion(this._project);
    }
  }
  get project(): Project {
    return this._project;
  }

  constructor(private versionService: VersionService) { }

  ngOnInit() {
  }

  importVersion(project: Project) {
    this.versionService
      .findByProject(project.id)
      .subscribe(
        pageVersion => {
          pageVersion.elements.sort((a, b) => a.name.localeCompare(b.name));
          this.versions = pageVersion.elements;
        }
      );

    this.filteredVersions = this.controlVersion.valueChanges
      .pipe(
        startWith(''),
        map(version => version ? this._filterVersion(version) : this.versions.slice())
      );
  }

  /**
   * Affichage du nom de la version selectionnée
   * @param version: Version
   */
  displayVersion(version?: Version ): string {
    if (!version) {
      return '';
    }
    return version.name;
  }

  private _filterVersion(value: string | Version): Version[] {
    if ( value instanceof Version) {
      return [value];
    }
    const filterValue = value.toLowerCase();
    return this.versions.filter(option =>
      option.name.toLowerCase().includes(filterValue));
  }

  versionSelect() {
    this.changed.forEach(f => f(this.selectedVersion));
  }
}
