import { ChartService } from 'src/app/services/chart.service';
import { MomentModule } from 'ngx-moment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './navigation/dashboard/dashboard.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
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
import { ProjectComponent } from './navigation/admin/release-note/project/project.component';
import { VersionComponent } from './navigation/admin/release-note/version/version.component';
import { IssueScopeViewComponent } from './navigation/admin/release-note/issue-scope-view/issue-scope-view.component';
import { IssueContextViewComponent } from './navigation/admin/release-note/issue-context-view/issue-context-view.component';
import { IssueScopeEditComponent } from './navigation/admin/release-note/issue-scope-edit/issue-scope-edit.component';

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
    ReleaseNoteComponent,
    ProjectComponent,
    VersionComponent,
    IssueScopeViewComponent,
    IssueContextViewComponent,
    IssueScopeEditComponent
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
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [ObjectivesService, ChartService, IssuesService],
  bootstrap: [AppComponent],
  entryComponents: [IssueScopeEditComponent]
})
export class AppModule {}
