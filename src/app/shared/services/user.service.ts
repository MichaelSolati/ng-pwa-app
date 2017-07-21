import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()
export class UserService {
  private _user: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private _zone: NgZone) {
    this._watchAuthState();
  }

  get user(): Observable<any> {
    return this._user.asObservable();
  }

  private _signIn(provider: any, callback: any): void {
    firebase.auth().signInWithPopup(provider).then((result: any) => {
      callback(null, result);
    }).catch((error: any) => {
      callback(error, null);
    });
  }

  public signInFacebook(callback?: any): void {
    const provider = new firebase.auth.FacebookAuthProvider();
    this._signIn(provider, (error: any, result: any) => {
      (callback) ? callback(error, result) : null;
    });
  }

  public signInGoogle(callback?: any): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    this._signIn(provider, (error: any, result: any) => {
      (callback) ? callback(error, result) : null;
    });
  }

  public signInTwitter(callback?: any): void {
    const provider = new firebase.auth.TwitterAuthProvider();
    this._signIn(provider, (error: any, result: any) => {
      (callback) ? callback(error, result) : null;
    });
  }

  public signOut(callback?: any): void {
    firebase.auth().signOut().then((result: any) => {
      this._user.next(null);
      callback(null, result);
    }).catch((error: any) => {
      callback(error, null);
    });
  }

  private _watchAuthState(): void {
    firebase.auth().onAuthStateChanged((user: any) => {
      this._zone.run(() => {
        (user) ? this._user.next(user) : this._user.next(null);
      });
    });
  }
}