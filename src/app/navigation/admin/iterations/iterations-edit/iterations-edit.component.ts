import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IterationService } from 'src/app/services/iteration.service';
import { Iteration } from 'src/app/services/beans/dto';
import { IterationsObjectivesViewComponent } from '../iterations-objectives-view/iterations-objectives-view.component';

@Component({
  providers: [IterationsObjectivesViewComponent],
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
    private iterationService: IterationService,
    private objective: IterationsObjectivesViewComponent
  ) {}

  ngOnInit() {
    this.reset();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id === 'new') {
        this.iteration = new Iteration(null, null);
        this.loading = false;
      } else {
        this.iterationService
          .findById(this.id)
          .subscribe(iteration => {
            this.iteration = iteration;
            this.loading = false;
          });
      }
    });
  }

  private reset(): void {}

  public save() {
    if (this.id === 'new') {
      this.iterationService.save(this.iteration).subscribe(data => {
        this.router.navigate(['..'], { relativeTo: this.route });
      });
    } else {
      this.iterationService.update(this.iteration).subscribe(data => {
        this.router.navigate(['..'], { relativeTo: this.route });
      });
    }
  }

  public cancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
