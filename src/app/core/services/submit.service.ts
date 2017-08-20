import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../../environments/environment'

@Injectable()
export class SubmitService {

  constructor(private _fbDB: AngularFireDatabase, private _http: Http) { }

  public create(pwa: any, callback?: any): void {
    this._fbDB.object('/apps/' + pwa.id)
      .set(pwa)
      .then((success: any) => {
        if (callback) callback(null, pwa);
      })
      .catch((error: any) => {
        if (callback) callback(error, null);
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
