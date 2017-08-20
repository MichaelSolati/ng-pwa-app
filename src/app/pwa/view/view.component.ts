import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { PWAService } from '../../core/services/pwa.service';

@Component({
  moduleId: module.id,
  selector: 'pwa-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  private _app: Observable<any>;
  private _idSubscription: Subscription;

  constructor(private _route: ActivatedRoute, private _ps: PWAService) { }

  ngOnInit() {
    this._idSubscription = this._route.params.subscribe((params: any) => {
      this._app = this._ps.findApp(params.id);
    });
  }

  ngOnDestroy() {
    this._idSubscription.unsubscribe();
  }

  get app(): Observable<any> {
    return this._app;
  }
}
