import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardComponent} from './navigation/dashboard/dashboard.component';
import {MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatListModule} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';
import {ObjectiveComponent} from './card/objective/objective.component';
import {ObjectivesService} from './services/objectives.service';
import {OpenTicketsComponent} from './card/open-tickets/open-tickets.component';
import {BurndownComponent} from './card/burndown/burndown.component';
import {ChartsModule} from 'ng2-charts';
import {SupportComponent} from './card/support/support.component';
import {BurndownService} from './services/burndown.service';
import {IssuesService} from './services/issues.service';
import { OpenIssueByCategoryComponent } from './card/open-tickets/open-issue-by-category/open-issue-by-category.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ObjectiveComponent,
    OpenTicketsComponent,
    BurndownComponent,
    SupportComponent,
    OpenIssueByCategoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    ChartsModule,
    LayoutModule
  ],
  providers: [
    ObjectivesService,
    BurndownService,
    IssuesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
