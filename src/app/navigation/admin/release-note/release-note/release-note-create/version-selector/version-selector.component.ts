import { Component, OnInit, Output, EventEmitter, Input, HostListener} from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Version, Project } from 'src/app/services/beans/dto';
import { VersionService } from 'src/app/services/version.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-version-selector',
  templateUrl: './version-selector.component.html',
  styleUrls: ['./version-selector.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: VersionSelectorComponent, multi: true}
  ]
})
export class VersionSelectorComponent implements OnInit, ControlValueAccessor  {
  public controlVersion = new FormControl();
  filteredVersions: Version[];
  public versions: Array<Version> = [];
  selectedVersion: Version = null;
  private _project: Project;
  private changed = new Array<(value: Version) => void>();
  loading: boolean;

  writeValue(version: Version): void {
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
    }
  }
  get project(): Project {
    return this._project;
  }

  constructor(private versionService: VersionService) { }

  ngOnInit() {
  }

  onKeyUp(event: any) {
      this.loading = true;
      this.versionService.getFilteredVersions(event.target.value, this._project.id).subscribe(page => {
        this.filteredVersions = page.elements;
        this.filteredVersions.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.loading = false;
      });
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

  versionSelect() {
    this.changed.forEach(f => f(this.selectedVersion));
  }
}
