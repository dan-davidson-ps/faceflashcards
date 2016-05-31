/**
 *  from http://stackoverflow.com/questions/36537878/changing-the-default-name-of-router-link-active-class-by-writing-a-custom-dire/37238132#37238132
 */

/* trying to make active page button highlight, but getting what is essentially circular dependency problems with Error: Uncaught (in promise): TypeError: Cannot read property 'isSkipSelf' of null  https://github.com/angular/angular/issues/8519 */

import { Directive, Input, HostBinding, OnInit } from '@angular/core';
import { Router, RouteSegment, UrlTree } from '@angular/router';

@Directive({
  selector: '[routerLink]'
})
export class RouterActive implements OnInit
{
  private currentUrl: UrlTree;

  @Input('routerLink') private routerLink: any[];

  constructor(private routeSegment: RouteSegment, private router: Router) {
    this.router.changes.subscribe(() => this.updateCurrentUrl());
  }

  private updateCurrentUrl(): void {
    this.currentUrl = this.router.createUrlTree(this.routerLink, this.routeSegment);
  }

  @HostBinding('class.active')
  get isRouteActive(): boolean {
    return this.currentUrl ? this.router.urlTree.contains(this.currentUrl) : null;
  }

  ngOnInit() {
    this.updateCurrentUrl();
  }
}
