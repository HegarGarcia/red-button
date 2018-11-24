import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { IncidentsService } from './incidents.service';

@NgModule({
  providers: [AuthService, IncidentsService]
})
export class CoreModule {}
