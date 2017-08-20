import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
declare var window: any;

@Injectable()
export class PWAService {
  private _apps: Observable<any[]>;

  constructor(private _fbDB: AngularFireDatabase) {
    if (typeof window !== 'undefined') {
      this._query();
    }
  }

  get apps(): Observable<any[]> {
    return this._apps;
  }

  public findApp(id: string): Observable<any> {
    return this._fbDB.object('/apps/' + id);
  }

  private _query(): void {
    this._apps = this._fbDB.list('/apps');
  }
}
