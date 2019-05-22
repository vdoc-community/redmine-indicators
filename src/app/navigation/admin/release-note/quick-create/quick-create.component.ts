import { IssueContextService } from 'src/app/services/issue-context.service';
import { IssueScope } from './../../../../services/beans/dto/issue-scope';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { IssueContext } from 'src/app/services/beans/dto/issue-context';
import { IssueScopeService } from 'src/app/services/issue-scope.service';

@Component({
  selector: 'app-quick-create',
  templateUrl: './quick-create.component.html',
  styleUrls: ['./quick-create.component.scss']
})
export class QuickCreateComponent implements OnInit {
  object;
  selectedScope: IssueScope;
  name: string;

  constructor(public dialogRef: MatDialogRef<QuickCreateComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              public dialog: MatDialog,
              private issueContextService: IssueContextService,
              private issueScopeService: IssueScopeService) {
    this.object = data;
  }

  ngOnInit() {
  }

  createContext() {
    this.issueContextService.save(
      new IssueContext(null, null, this.name, this.selectedScope)
      ).subscribe(x => {
        console.log(x);
      });
  }

  createScope() {
    this.issueScopeService.save(
      new IssueScope(null, this.name)
      ).subscribe(x => {
        console.log(x);
      });
  }

  objectType(object: any): string {
    if (object instanceof IssueScope) {
      return 'scope';
    } else if (object instanceof IssueContext) {
      return 'context';
    } else {
      return 'unknown';
    }
  }

}
