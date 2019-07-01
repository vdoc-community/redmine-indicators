import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(r: ActivatedRoute) {
    r.url.subscribe((s: UrlSegment[]) => {
    });
  }

  ngOnInit() {
  }

}
