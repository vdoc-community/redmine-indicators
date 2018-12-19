import { EventsService } from './services/events.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  title = 'redmine-indicators';

  constructor(public snackBar: MatSnackBar, private eventsService: EventsService) {
  }

  ngOnInit(): void {
    this.eventsService.subscribe().subscribe((messageEvent) => {
      this.snackBar.open(messageEvent.message, null, {
        duration: 2000,
      });
    });
  }
}
