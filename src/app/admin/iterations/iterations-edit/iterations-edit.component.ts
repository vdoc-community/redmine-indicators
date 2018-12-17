import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iterations-edit',
  templateUrl: './iterations-edit.component.html',
  styleUrls: ['./iterations-edit.component.scss']
})
export class IterationsEditComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  public save() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
