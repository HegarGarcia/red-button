import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { IncidentsService } from './incidents.service';

@NgModule({
  providers: [AuthService, IncidentsService]
})
export class CoreModule {}

export interface IIncidentPayload {
  coords: {
    latitude: string;
    longitude: string;
  };
  event: string;
  datatime: Date;
}
