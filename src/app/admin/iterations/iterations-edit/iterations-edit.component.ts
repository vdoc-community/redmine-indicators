import { Iteration } from './../../../beans/iteration';
import { IterationService } from './../../../services/iteration.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iterations-edit',
  templateUrl: './iterations-edit.component.html',
  styleUrls: ['./iterations-edit.component.scss']
})
export class IterationsEditComponent implements OnInit {
  public loading = true;
  private id: number | 'new';

  public iteration: Iteration;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private iterationService: IterationService
  ) { }

  ngOnInit() {
    this.reset();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id === 'new') {
        this.iteration = new Iteration(null, null);
        this.loading = false;
      } else {
        this.iterationService
          .findIterationById(this.id)
          .subscribe(iteration => {
            this.iteration = iteration;
            this.loading = false;
          });
      }
    });
  }

  private reset(): void { }

  public save() {
    if (this.id === 'new') {
      this.iterationService.saveIteration(this.iteration);
    } else {
      this.iterationService.updateIteration(this.iteration);
    }
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  public cancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
