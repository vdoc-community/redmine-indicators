
import { Router } from '@angular/router';
import { IssueScopeService } from 'src/app/services/issue-scope.service';
import { IssueScope, IssueContext } from 'src/app/services/beans/dto';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-scope-create',
  templateUrl: './scope-create.component.html',
  styleUrls: ['./scope-create.component.scss']
})
export class ScopeCreateComponent implements OnInit {
  newScope: IssueScope;
  newContext: IssueContext;
  name: string;

  constructor(private issueScopeService: IssueScopeService,
    private router: Router,
    public dialogRef: MatDialogRef<ScopeCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
     }

  ngOnInit() {
  }

  createScope() {
    this.newScope = new IssueScope(null, this.name);
    this.issueScopeService.save(this.newScope).subscribe(scope => {
      this.router.navigate([`/administration/scope-context/scope/${scope.id}`]);
    });
  }


}
