import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
declare var window: any;

@Injectable()
export class PWAService {
  private _apps: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private _zone: NgZone) {
    if (typeof window !== 'undefined') {
      this._query();
    }
  }

  get apps(): Observable<any[]> {
    return this._apps.asObservable();
  }

  public findApp(id: string, callback?: any): void {
    firebase
      .database()
      .ref('apps')
      .child(id)
      .on('value', (snapshot: any) => {
        this._zone.run(() => {
          (callback) ? callback(null, snapshot.val()) : null;
        });
      });
  }

  private _query(): void {
    firebase
      .database()
      .ref('apps')
      .on('value', (snapshot: any) => {
        let apps: any[] = [];
        let query: any = snapshot.val();
        for (let id in query) {
          let item: any = query[id];
          item['id'] = id;
          apps.push(item);
        }
        this._zone.run(() => {
          this._apps.next(apps);
        });
      });
  }
}
