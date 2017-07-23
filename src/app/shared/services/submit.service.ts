import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../../environments/environment'

@Injectable()
export class SubmitService {

  constructor(private _http: Http) { }

  public create(pwa: any, callback?: any): void {
    firebase.database()
      .ref('apps/' + pwa.id)
      .set(pwa)
      .then((success: any) => {
        (callback) ? callback(null, pwa) : null;
      })
      .catch((error: any) => {
        (callback) ? callback(error, null) : null;
      });
  }

  private _handleError(error: Response | any) {
    return Observable.throw(error);
  }

  private _handleSuccess(res: Response) {
    return JSON.parse(res.json());
  }

  public getManifest(url: string): Observable<any> {
    return this._http.post(environment.firebaseAPI + 'manifest', { url })
      .map(this._handleSuccess)
      .catch(this._handleError);
  }
}
