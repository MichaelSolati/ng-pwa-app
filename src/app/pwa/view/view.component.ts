import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { PWAService } from '../../shared/services/pwa.service';

@Component({
  moduleId: module.id,
  selector: 'pwa-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  private _app: any;
  private _idSubscription: Subscription;

  constructor(private _route: ActivatedRoute, private _ps: PWAService) { }

  ngOnInit() {
    this._idSubscription = this._route.params.subscribe((params: any) => {
      this._ps.findApp(params.id, (error: any, success: any) => {
        this._app = success;
      });
    });
  }

  ngOnDestroy() {
    this._idSubscription.unsubscribe();
  }

  get app(): any {
    return this._app;
  }

  public getImageURL(app: any): string {
    if (app) {
      return (app.url + '/' + app.icons[app.icons.length - 1].src);
    }
  }
}
