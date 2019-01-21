import { Objective } from 'src/app/services/beans/dto';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ObjectivesService } from 'src/app/services/objectives.service';

@Component({
  selector: 'app-objective-edit',
  templateUrl: './objective-edit.component.html',
  styleUrls: ['./objective-edit.component.scss']
})
export class ObjectiveEditComponent implements OnInit {

  private _objective: Objective;
  public updateableObjective: Objective;
  @Output()
  public deleted = new EventEmitter<Objective>();

  @Input()
  set objective(objective: Objective) {
    this._objective = objective;
    if (this._objective.id === null) {
      this.mode = 'create';
      this.updateableObjective = Object.assign(new Objective(null, null), this._objective);
    }
  }

  get objective(): Objective {
    return this._objective;
  }

  public mode: 'read' | 'edit' | 'create' = 'read';
  public objectiveService: ObjectivesService;

  constructor(objectiveService: ObjectivesService) {
    this.objectiveService = objectiveService;
  }

  ngOnInit() { }

  public save() {
    this.objectiveService.save(this.updateableObjective).subscribe(saved => {
      Object.assign(this._objective, saved);
    });
    this.mode = 'read';
  }

  public update() {
    this.objectiveService.update(this.updateableObjective).subscribe(updated => {
      Object.assign(this._objective, updated);
    });
    this.mode = 'read';
  }

  public delete() {
    if (this.mode === 'create') {
      this.deleted.emit(this._objective);
    } else {
      this.objectiveService.delete(this._objective)
        .subscribe(deleted => this.deleted.emit(this._objective));
    }
  }

  public edit() {
    this.mode = 'edit';
    this.updateableObjective = Object.assign({}, this._objective);
  }

  public cancel() {
    if (this.mode === 'create') {
      this.delete();
    } else {
      this.mode = 'read';
    }
  }

}
