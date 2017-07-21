import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PWAService } from '../shared/services/pwa.service';

@Component({
  selector: 'pwa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private _ps: PWAService) { }

  ngOnInit() {
  }

  get apps(): Observable<any> {
    return this._ps.apps;
  }

  public getImageURL(app: any): string {
    return (app.url + '/' + app.icons[app.icons.length - 1].src);
  }
}
