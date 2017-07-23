import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { SubmitService } from '../../shared/services/submit.service';

@Component({
  moduleId: module.id,
  selector: 'pwa-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {
  private _app: any;
  public formPWA: FormGroup;
  private _disabled: boolean;

  constructor(private _fb: FormBuilder, private _router: Router, private _snackBar: MdSnackBar, private _ss: SubmitService) {
    this._formsCreate();
  }

  ngOnInit() {
  }

  get app(): any {
    return this._app;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  public clearApp(): void {
    this._app = null;
  }

  private _formDisable(): void {
    this.formPWA.disable();
    this._disabled = true;
  }

  private _formEnable(): void {
    this.formPWA.enable();
    this._disabled = false;
  }

  private _formsCreate(): void {
    this.formPWA = this._fb.group({
      url: ['', Validators.required]
    });
  }

  public getApp(): void {
    if (this.formPWA.valid) {
      this._formDisable();
      const url: string = this.formPWA.value.url.replace(/\/$/, '');
      this._ss.getManifest(url)
        .subscribe((success: any) => {
          this._formEnable();
          this._app = success;
        }, (error: any) => {
          this._formEnable();
          this._snackBar.open('We couldn\'t find a manifest... (Did you forget the \'https://\'?)', null, { duration: 3000 });
        });
    } else {
      this._snackBar.open('We couldn\'t find a manifest... (Did you forget the \'https://\'?)', null, { duration: 3000 });
    }
  }
  
  public submit(): void {
    this._formDisable();
    this._ss.create(this._app, (error: any, success: any) => {
      this._formEnable();
      if (error) {
        this._snackBar.open(error.message, null, { duration: 3000 });
      } else {
        this._snackBar.open(success.name + ' Added Successfully', null, { duration: 3000 });
        this._router.navigate(['/', 'pwa', success.id]);
      }
    });
  }
}
