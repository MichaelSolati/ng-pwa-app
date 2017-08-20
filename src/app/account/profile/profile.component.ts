import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../core/services/user.service';

@Component({
  moduleId: module.id,
  selector: 'pwa-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private _us: UserService) { }

  ngOnInit() {
  }

  get user(): Observable<any> {
    return this._us.user;
  }
}
