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
  MatAutocompleteModule,
  MatDialogModule,
  MatCheckboxModule,
  MatStepperModule,
  MatPaginatorModule,
  MatSortModule
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
// tslint:disable-next-line:max-line-length
import { IterationsObjectivesViewComponent } from './navigation/admin/iterations/iterations-objectives-view/iterations-objectives-view.component';
import { ObjectiveEditComponent } from './navigation/admin/objectives/objective-edit/objective-edit.component';
import { FitTextComponent } from './components/fit-text/fit-text.component';
import { SimpleIndicatorComponent } from './navigation/dashboard/indicator/simple-indicator/simple-indicator.component';
import { ReleaseNoteComponent } from './navigation/admin/release-note/release-note.component';
// tslint:disable-next-line:max-line-length
import { ProjectSelectorComponent } from './navigation/admin/release-note/release-note/release-note-create/project-selector/project-selector.component';
// tslint:disable-next-line:max-line-length
import { VersionSelectorComponent } from './navigation/admin/release-note/release-note/release-note-create/version-selector/version-selector.component';
import { IssueScopeEditComponent } from './navigation/admin/release-note/issue-scope/issue-scope-edit/issue-scope-edit.component';
// tslint:disable-next-line:max-line-length
import { IssueScopeSelectorComponent } from './navigation/admin/release-note/issue-scope/issue-scope-selector/issue-scope-selector.component';
import { IssueContextEditComponent } from './navigation/admin/release-note/issue-context/issue-context-edit/issue-context-edit.component';
// tslint:disable-next-line:max-line-length
import { IssueContextSelectorComponent } from './navigation/admin/release-note/issue-context/issue-context-selector/issue-context-selector.component';
// tslint:disable-next-line:max-line-length
import { ReleaseNoteSelectorComponent } from './navigation/admin/release-note/release-note/release-note-selector/release-note-selector.component';
import { CdkTableModule } from '@angular/cdk/table';
// tslint:disable-next-line:max-line-length
import { ReleaseNoteIssueViewComponent } from './navigation/admin/release-note/release-note-issue/release-note-issue-view/release-note-issue-view.component';
// tslint:disable-next-line:max-line-length
import { ReleaseNoteIssueEditComponent } from './navigation/admin/release-note/release-note-issue/release-note-issue-edit/release-note-issue-edit.component';
import { ReleaseNoteCreateComponent } from './navigation/admin/release-note/release-note/release-note-create/release-note-create.component';
// tslint:disable-next-line:max-line-length
import { ReleaseNoteIssueSelectorComponent } from './navigation/admin/release-note/release-note-issue/release-note-issue-selector/release-note-issue-selector.component';

export const ROUTES: Routes = [
  {
    path: 'side', // PB : si path = '', la navigation ne se fait plus
    component: AdminComponent,
    canActivate: [XRedmineApiKeyGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [XRedmineApiKeyGuard]
      },
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
        component: ReleaseNoteComponent,
        children: [
          {
            path: '',
            component: ReleaseNoteSelectorComponent
          },
          {
            path: 'edit/:id',
            component: ReleaseNoteIssueViewComponent
          },
          {
            path: 'new',
            component: ReleaseNoteCreateComponent
          },
          {
            path: 'edit-issue/:id',
            component: ReleaseNoteIssueEditComponent
          }
        ]
      },
    ]
  },
  {
    path: 'settings',
    component: ConfigurationComponent
  },
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
    ProjectSelectorComponent,
    VersionSelectorComponent,
    IssueScopeSelectorComponent,
    IssueContextSelectorComponent,
    IssueScopeEditComponent,
    IssueContextEditComponent,
    ReleaseNoteSelectorComponent,
    ReleaseNoteIssueViewComponent,
    ReleaseNoteIssueEditComponent,
    ReleaseNoteCreateComponent,
    ReleaseNoteIssueSelectorComponent
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
    MatDialogModule,
    MatCheckboxModule,
    CdkTableModule,
    MatStepperModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [ObjectivesService, ChartService, IssuesService],
  bootstrap: [AppComponent],
  entryComponents: [
    IssueScopeEditComponent,
    ReleaseNoteIssueEditComponent,
    ReleaseNoteIssueSelectorComponent,
    IssueContextEditComponent]
})
export class AppModule {}
