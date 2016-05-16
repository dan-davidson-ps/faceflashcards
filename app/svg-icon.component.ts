//https://github.com/czeckd/angular2-svg-icon
import { Component, Input, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';



@Component({
    selector: 'svg-image',
    template: `<div [innerHTML]="svgData"></div>`
})


export class SvgImageComponent implements OnInit {
    @Input() src:string;

    private svgData:string = '';

    constructor(private http: Http) {
    }

    ngOnInit() {
        this.loadSvg();
    }

    loadSvg() {
        this.http.get( this.src )
            .subscribe( res => this.svgData = res.text() )
    }

}
