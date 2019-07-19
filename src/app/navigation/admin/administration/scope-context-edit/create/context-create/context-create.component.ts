import { Component, OnInit, Inject } from '@angular/core';
import { IssueScope, IssueContext } from 'src/app/services/beans/dto';
import { IssueContextService } from 'src/app/services/issue-context.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-context-create',
  templateUrl: './context-create.component.html',
  styleUrls: ['./context-create.component.scss']
})
export class ContextCreateComponent implements OnInit {
  newScope: IssueScope;
  newContext: IssueContext;
  name: string;

  constructor(private issueContextService: IssueContextService,
    public dialogRef: MatDialogRef<ContextCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.newScope = data;
    }

  ngOnInit() {
  }

  createContext() {
    this.newContext = new IssueContext(null, null, this.name, this.newScope);
    this.dialogRef.close(this.newContext);
  }

}
