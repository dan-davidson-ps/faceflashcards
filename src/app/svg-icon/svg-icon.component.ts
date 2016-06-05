//https://github.com/czeckd/angular2-svg-icon
import {Component, Input, OnInit, AfterViewChecked} from '@angular/core';
import {Http, Response} from '@angular/http';
import {BehaviorSubject} from 'rxjs';


@Component({
  selector: 'svg-image',
  template: `<div [innerHTML]="svgData"></div>`
})


export class SvgImageComponent implements OnInit, AfterViewChecked {
  @Input() src:string;

  private svgData:string = '';
  private svgLoadedSource = new BehaviorSubject<string>(undefined);

  svgLoaded$ = this.svgLoadedSource.asObservable();


  constructor(private http:Http) {
  }

  ngOnInit() {
    this.loadSvg();
  }

  loadSvg() {
    this.http.get(this.src)
      .subscribe(
        res => {
          this.svgData = res.text()
          this.svgLoadedSource.next('svg loaded')
        },
        error => console.error('rx error', error)
      )
  }

  ngAfterViewInit() {
    // console.log('after init');
  };

  public ngAfterViewChecked():void {
    // console.log('afterViewChecked svg')
    this.svgLoadedSource.next('svg loaded')
  }

}
