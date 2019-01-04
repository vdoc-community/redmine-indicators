import { BrowserModule } from '@angular/platform-browser';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './navigation/dashboard/dashboard.component';
import {
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatTableModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { ObjectiveComponent } from './card/objective/objective.component';
import { ObjectivesService } from './services/objectives.service';
import { OpenTicketsComponent } from './card/open-tickets/open-tickets.component';
import { BurndownComponent } from './card/burndown/burndown.component';
import { ChartsModule } from 'ng2-charts';
import { SupportComponent } from './card/support/support.component';
import { BurndownService } from './services/burndown.service';
import { IssuesService } from './services/issues.service';
import { OpenIssueByCategoryComponent } from './card/open-tickets/open-issue-by-category/open-issue-by-category.component';
import { RouterModule, Routes } from '@angular/router';
import { XRedmineApiKeyGuard } from './guard/x-redmine-api-key.guard';
import { ConfigurationComponent } from './configuration/configuration/configuration.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IterationsViewComponent } from './navigation/admin/iterations/iterations-view/iterations-view.component';
import { IterationsEditComponent } from './navigation/admin/iterations/iterations-edit/iterations-edit.component';
import { AdminComponent } from './navigation/admin/admin.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [XRedmineApiKeyGuard]
  },
  {
    path: 'settings',
    component: ConfigurationComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [XRedmineApiKeyGuard],
    children: [
      {
        path: 'iteration',
        component: IterationsViewComponent
      },
      {
        path: 'iteration/:id',
        component: IterationsEditComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ObjectiveComponent,
    OpenTicketsComponent,
    BurndownComponent,
    SupportComponent,
    OpenIssueByCategoryComponent,
    ConfigurationComponent,
    AdminComponent,
    IterationsViewComponent,
    IterationsEditComponent
  ],
  imports: [
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, // import HttpClientModule after BrowserModule.
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSnackBarModule,
    MatTableModule,
    ChartsModule,
    LayoutModule
  ],
  providers: [ObjectivesService, BurndownService, IssuesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
