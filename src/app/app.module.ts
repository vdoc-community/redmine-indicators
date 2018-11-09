import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './navigation/dashboard/dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { ObjectiveComponent } from './card/objective/objective.component';
import {ObjectivesService} from './services/objectives.service';
import { OpenTicketsComponent } from './card/open-tickets/open-tickets.component';
import { BurndownComponent } from './card/burndown/burndown.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ObjectiveComponent,
    OpenTicketsComponent,
    BurndownComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
  providers: [ObjectivesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
