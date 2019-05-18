import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule }    from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { HealthAppComponent } from './health-app/health-app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartModule } from 'angular2-chartjs';
import {NgxPopperModule} from 'ngx-popper';

const appRoutes: Routes = [
  { path: '', component: HealthAppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    HealthAppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    CommonModule,
    ChartModule,
    NgxPopperModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
