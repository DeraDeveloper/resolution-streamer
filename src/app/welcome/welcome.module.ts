import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { InstagramCallbackComponent } from './instagram-callback/instagram-callback.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NavigationComponent, InstagramCallbackComponent, LandingComponent]
})
export class WelcomeModule { }
