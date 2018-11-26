import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MapViewComponent } from './map-view.component';

import { IncidentComponent } from './incident/incident.component';

import { MatIconModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [MapViewComponent, IncidentComponent],
  imports: [
    MatIconModule,
    MatCardModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: MapViewComponent }])
  ]
})
export class MapViewModule {}
