import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapViewModule } from './map-view/map-view.module';

import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MapViewModule,
    AppRoutingModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
