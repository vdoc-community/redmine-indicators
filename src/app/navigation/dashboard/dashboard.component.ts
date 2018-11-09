import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, of} from 'rxjs';
import {ObjectivesService} from '../../services/objectives.service';
import {Objective} from '../../beans/objective';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  /** Based on the screen size, switch from standard to one column per row */
  private objectives: Observable<Objective[]>;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        // return [
        //   { title: 'Objectif 1', cols: 1, rows: 1 },
        //   { title: 'Objectif 2', cols: 1, rows: 1 },
        //   { title: 'Objectif 3', cols: 1, rows: 1 },
        //   { title: 'Card 2', cols: 1, rows: 1 },
        //   { title: 'Card 3', cols: 1, rows: 1 },
        //   { title: 'Card 4', cols: 1, rows: 1 }
        // ];
      }

      return [
        {title: 'Open Tickets', cols: 1, rows: 2},
        {title: 'Support', cols: 1, rows: 1},
        {title: 'Burndown', cols: 2, rows: 1}
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private objectivesService: ObjectivesService) {
  }

  ngOnInit(): void {
    this.objectives = this.objectivesService.findObjectives();
  }
}
