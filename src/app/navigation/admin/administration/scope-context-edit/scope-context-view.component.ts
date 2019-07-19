import { IssueScopeService } from 'src/app/services/issue-scope.service';
import { IssueContextService } from 'src/app/services/issue-context.service';
import { Component, OnInit } from '@angular/core';
import { IssueScope } from 'src/app/services/beans/dto';
import { MatDialog } from '@angular/material';
import { ScopeCreateComponent } from './create/scope-create/scope-create.component';

@Component({
  selector: 'app-scope-context-view',
  templateUrl: './scope-context-view.component.html',
  styleUrls: ['./scope-context-view.component.scss']
})
export class ScopeContextViewComponent implements OnInit {
  scopes: Array<IssueScope> = [];
  loading = true;


  constructor(private issueContextService: IssueContextService,
    public dialog: MatDialog,
    private issueScopeService: IssueScopeService) { }

  ngOnInit() {
    this.issueScopeService.findAll().subscribe(pageScope => {
      this.scopes = pageScope.elements;
      this.loading = false;
    });
  }

  createScope() {
    const dialogRef = this.dialog.open(ScopeCreateComponent);
  }

}
