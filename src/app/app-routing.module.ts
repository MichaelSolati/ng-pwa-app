import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/home/home.module#HomeModule'
  }, {
    path: 'account',
    loadChildren: 'app/account/account.module#AccountModule'
  }, {
    path: 'pwa',
    loadChildren: 'app/pwa/pwa.module#PWAModule'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
