import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MapViewComponent } from './map-view.component';

// AngularGoogleMaps Module
import { AgmCoreModule } from '@agm/core';
import { IncidentComponent } from './incident/incident.component';

// Material UI
import { MatIconModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    MapViewComponent,
    IncidentComponent
  ],
  imports: [
    MatIconModule,
    MatCardModule,
    CommonModule,
    AgmCoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAsmY7Ka-rUSyGbwsooh0XTJlBLLckRt_o'
    }),
    RouterModule.forChild([{ path: '', component: MapViewComponent }])
  ]
})
export class MapViewModule { }
