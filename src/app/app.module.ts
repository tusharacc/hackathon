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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SystemStatusComponent } from './system-status/system-status.component';
import { HealthStatusComponent } from './health-status/health-status.component';

const appRoutes: Routes = [
  { path: '', component: HealthStatusComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    HealthAppComponent,
    SystemStatusComponent,
    HealthStatusComponent
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
      { enableTracing: false } // <-- debugging purposes only
    ),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
