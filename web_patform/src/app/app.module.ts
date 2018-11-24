import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';

import { AppComponent } from './app.component';
import { MapViewComponent } from './map-view/map-view.component';


import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    MapViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AgmCoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAsmY7Ka-rUSyGbwsooh0XTJlBLLckRt_o'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
