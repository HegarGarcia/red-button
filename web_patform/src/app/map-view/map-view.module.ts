import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MapViewComponent } from './map-view.component';

// AngularGoogleMaps Module
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MapViewComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAsmY7Ka-rUSyGbwsooh0XTJlBLLckRt_o'
    }),
    RouterModule.forChild([{ path: '', component: MapViewComponent }])
  ]
})
export class MapViewModule { }
