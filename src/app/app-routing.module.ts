import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstagramCallbackComponent } from './instagram-callback/instagram-callback.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'redirect', component: InstagramCallbackComponent },
  { path: 'home', component: LandingComponent },
  { path: "**", redirectTo: "/home" }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}