import { ChartService } from 'src/app/services/chart.service';
import { MomentModule } from 'ngx-moment';
import { BrowserModule } from '@angular/platform-browser';
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
  MatTableModule,
  MatAutocompleteModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { ObjectivesService } from './services/objectives.service';
import { ChartsModule } from 'ng2-charts';
import { IssuesService } from './services/issues.service';
import { RouterModule, Routes } from '@angular/router';
import { XRedmineApiKeyGuard } from './guard/x-redmine-api-key.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IterationsViewComponent } from './navigation/admin/iterations/iterations-view/iterations-view.component';
import { IterationsEditComponent } from './navigation/admin/iterations/iterations-edit/iterations-edit.component';
import { AdminComponent } from './navigation/admin/admin.component';
import { ConfigurationComponent } from './navigation/configuration/configuration/configuration.component';
import { ObjectiveComponent } from './navigation/dashboard/indicator/objective/objective.component';
import { BurndownComponent } from './navigation/dashboard/indicator/burndown/burndown.component';
import { IterationsObjectivesViewComponent } from './navigation/admin/iterations/iterations-objectives-view/iterations-objectives-view.component';
import { ObjectiveEditComponent } from './navigation/admin/objectives/objective-edit/objective-edit.component';
import { FitTextComponent } from './components/fit-text/fit-text.component';
import { SimpleIndicatorComponent } from './navigation/dashboard/indicator/simple-indicator/simple-indicator.component';
import { ReleaseNoteComponent } from './navigation/admin/release-note/release-note.component';

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
      },
      {
        path: 'release-note',
        component: ReleaseNoteComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ObjectiveComponent,
    BurndownComponent,
    ConfigurationComponent,
    AdminComponent,
    IterationsViewComponent,
    IterationsEditComponent,
    IterationsObjectivesViewComponent,
    ObjectiveEditComponent,
    FitTextComponent,
    SimpleIndicatorComponent,
    ReleaseNoteComponent
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
    MatNativeDateModule,
    MatSnackBarModule,
    MatTableModule,
    MatAutocompleteModule,
    MomentModule,
    ChartsModule,
    LayoutModule,
    ReactiveFormsModule
  ],
  providers: [ObjectivesService, ChartService, IssuesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
