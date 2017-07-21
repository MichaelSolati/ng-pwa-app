import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { UserService } from '../services/user.service';

@Injectable()
export class SignedInGuard implements CanActivate {
  constructor(private _us: UserService, private _router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._us.user.map((user: any) => {
      if (user) {
        return true;
      }
      this._router.navigate(['/', 'account', 'sign-in']);
      return false;
    }).catch((error: any) => {
      this._router.navigate(['/', 'account', 'sign-in']);
      return Observable.of(false);
    });
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(next, state);
  }
}
