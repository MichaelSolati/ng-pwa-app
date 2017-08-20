import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { UserService } from '../../core/services/user.service';

@Component({
  moduleId: module.id,
  selector: 'pwa-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  constructor(private _router: Router, private _snackBar: MdSnackBar, private _us: UserService) { }

  ngOnInit() {
  }

  private _failure(error: any): void {
    this._snackBar.open(error.message, null, { duration: 3000 });
  }

  public signIn(selection: string): void {
    switch (selection) {
      case 'facebook':
        this._us.signInFacebook((error: any, success: any) => {
          (error) ? this._failure(error) : this._success(success);
        });
        break;
      case 'google':
        this._us.signInGoogle((error: any, success: any) => {
          (error) ? this._failure(error) : this._success(success);
        });
        break;
      case 'twitter':
        this._us.signInTwitter((error: any, success: any) => {
          (error) ? this._failure(error) : this._success(success);
        });
        break;
    }
  }

  private _success(success: any): void {
    this._snackBar.open('Welcome ' + success.user.displayName, null, { duration: 3000 });
    this._router.navigate(['/']);
  }
}
