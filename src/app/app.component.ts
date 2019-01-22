import { Iteration } from 'src/app/services/beans/dto';
import { IterationService } from 'src/app/services/iteration.service';
import { EventsService } from './services/events.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  title = 'redmine-indicators';
  public iteration: Iteration;

  constructor(public snackBar: MatSnackBar, private eventsService: EventsService, private iterationService: IterationService) {
  }

  ngOnInit(): void {
    this.eventsService.subscribe().subscribe((messageEvent) => {
      this.snackBar.open(messageEvent.message, null, {
        duration: 2000,
      });
    });
    this.iterationService.findCurrent().subscribe(iteration => this.iteration = iteration);
  }
}
