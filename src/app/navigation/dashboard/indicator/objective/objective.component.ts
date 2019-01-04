import {Component, Input, OnInit} from '@angular/core';
import { Objective } from 'src/app/services/beans/dto';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html'
})

export class ObjectiveComponent implements OnInit {

  @Input()
  public objective: Objective;

  constructor() {
  }

  ngOnInit() {
  }

}
