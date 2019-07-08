import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Project, Pager } from 'src/app/services/beans/dto';
import { ProjectService } from 'src/app/services/project.service';
import { Observable } from 'rxjs';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-project-selector',
  templateUrl: './project-selector.component.html',
  styleUrls: ['./project-selector.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: ProjectSelectorComponent, multi: true}
  ]
})
export class ProjectSelectorComponent implements OnInit, ControlValueAccessor {
  public controlProject = new FormControl();
  filteredProjects: Project[];
  public projects: Array<Project> = [];
  selectedProject: Project = null;
  private changed = new Array<(value: Project) => void>();
  loading: boolean;

  writeValue(project: Project): void {
    this.selectedProject = project;
  }

  registerOnChange(fn: (value: Project) => void): void {
    this.changed.push(fn);
  }

  registerOnTouched(fn: any): void {
  }

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
  }

  onKeyUp(event: any) {
    if (event.target.value.length > 2) {
      this.loading = true;
      this.projectService.getFilteredProjects(event.target.value).subscribe(page => {
        this.filteredProjects = page.elements;
        this.filteredProjects.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.loading = false;
      });
    }
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
