import { Objective } from 'src/app/services/beans/dto';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-objective-edit',
  templateUrl: './objective-edit.component.html',
  styleUrls: ['./objective-edit.component.scss']
})
export class ObjectiveEditComponent implements OnInit {

  @Input()
  public objective: Objective;
  constructor() { }

  ngOnInit() {
  }

}
