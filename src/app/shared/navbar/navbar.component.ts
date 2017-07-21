import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MdSidenav, MdSnackBar } from '@angular/material';
declare var window: any;

import { UserService } from '../services/user.service';

@Component({
  moduleId: module.id,
  selector: 'pwa-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MdSidenav;

  constructor(private _router: Router, private _snackBar: MdSnackBar, private _us: UserService) { }

  ngOnInit() {
    (typeof window !== 'undefined') ? window.addEventListener('resize', () => {
      (window.innerWidth < 601) ? this.navClose() : null;
    }) : null;
  }

  ngOnDestroy() {
    (typeof window !== 'undefined') ? window.removeEventListener('resize') : null;
  }

  get user(): Observable<any> {
    return this._us.user;
  }

  public navClose(): void {
    this.sidenav.close();
  }

  public navOpen(): void {
    (window.innerWidth < 601) ? this.sidenav.open() : null;
  }

  public navToggle(): void {
    (window.innerWidth < 601) ? this.sidenav.toggle() : null;
  }

  public signOut(): void {
    this.navClose();
    this._us.signOut((error: any, success: any) => {
      if (error) {
        this._snackBar.open(error.message, null, { duration: 3000 });
      } else {
        this._snackBar.open('See you next time!', null, { duration: 3000 });
        this._router.navigate(['/']);
      }
    });
  }
}