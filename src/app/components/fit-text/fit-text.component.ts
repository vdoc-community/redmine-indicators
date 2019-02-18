import { Component, OnInit, Input, ViewChild, ViewChildren, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-fit-text',
  templateUrl: './fit-text.component.html',
  styleUrls: ['./fit-text.component.scss']
})
export class FitTextComponent implements OnInit {

  @ViewChild('containerRef')
  private containerRef: ElementRef;
  @ViewChild('imageRef')
  private imageRef: ElementRef;
  @ViewChild('textRef')
  private textRef: ElementRef;

  @Input()
  public fontSize = 13;
  private _text: any;

  get text(): any {
    return this._text;
  }

  @Input()
  set text(text: any) {
    this._text = text;
    this.update();
  }

  @Input()
  public color = 'none';

  @ViewChild('txtView')
  public txtView: ElementRef;


  constructor() {
  }

  ngOnInit() {
  }

  update(): void {
    const textSVG: SVGTextElement = this.textRef.nativeElement;
    const imageSVG: SVGElement = this.imageRef.nativeElement;
    const containerDiv: HTMLDivElement = this.containerRef.nativeElement;

    textSVG.setAttribute('y', this.fontSize.toString());
    imageSVG.setAttribute('viewBox', `0 0 ${(this._text.toString().length - 1) * this.fontSize} ${this.fontSize}`);
    imageSVG.setAttribute('width', `${ containerDiv.offsetWidth}px`);
    imageSVG.setAttribute('height', `${ containerDiv.offsetHeight}px`);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.update();
  }

}
