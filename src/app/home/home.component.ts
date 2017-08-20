import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PWAService } from '../core/services/pwa.service';

@Component({
  moduleId: module.id,
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
}
