import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Project, Pager } from 'src/app/services/beans/dto';
import { ProjectService } from 'src/app/services/project.service';
import { Observable } from 'rxjs';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: ProjectComponent, multi: true}
  ]
})
export class ProjectComponent implements OnInit, ControlValueAccessor {
  public controlProject = new FormControl();
  filteredProjects: Observable<Project[]>;
  public projects: Array<Project> = [];
  selectedProject: Project = null;
  private changed = new Array<(value: Project) => void>();

  writeValue(project: Project): void {
    this.selectedProject = project;
  }

  registerOnChange(fn: (value: Project) => void): void {
    this.changed.push(fn);
  }

  registerOnTouched(fn: any): void {
  }

  constructor(private projectService: ProjectService) { }

  /**
   * Au chargement de la page, charge les projets existants dans redmine dans l'autocomplete projet
   * Ordre : alphabétique
   */
  ngOnInit() {
    const pager = new Pager(0, 250);
    this.projectService
      .findAll(pager)
      .subscribe(
        pageProject => {
          pageProject.elements.sort((a, b) => a.name.localeCompare(b.name));
          this.projects = pageProject.elements;
        }
      );

    this.filteredProjects = this.controlProject.valueChanges
      .pipe(
        startWith(''),
        map(project => project ? this._filterProject(project) : this.projects.slice())
      );
  }

  private _filterProject(value: string | Project): Project[] {
    if ( value instanceof Project) {
      return [value];
    }
    const filterValue = value.toLowerCase();
    return this.projects.filter(option =>
      option.name.toLowerCase().includes(filterValue));
  }

  /**
   * Affichage du nom du projet selectionné
   * @param project: Project
   */
  displayProject(project?: Project ): string {
    if (!project) {
      return '';
    }
    return project.name;
  }

  projectSelect() {
    this.changed.forEach(f => f(this.selectedProject));
  }

}
