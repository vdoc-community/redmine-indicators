import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iterations-edit',
  templateUrl: './iterations-edit.component.html',
  styleUrls: ['./iterations-edit.component.scss']
})
export class IterationsEditComponent implements OnInit {

  public id: number | 'new';
  public label: string;
  public start: Date;
  public end: Date;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.reset();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }

  private reset(): void {
    this.label = null;
    this.start = null;
    this.end = null;
  }

  public save() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  public cancel() {
    this.reset();
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
