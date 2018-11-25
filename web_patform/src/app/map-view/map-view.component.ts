import { Component, OnInit, ViewChild } from '@angular/core';
// Services
import { IncidentsService } from '../core/incidents.service';
// Database payload
import { IIncidentPayload } from '../core/core.module';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
  animations: [
    trigger('showDetails', [
      state('inactive', style({
        bottom: '-250px',
      })),
      state('active', style({
        bottom: '0px'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-in'))
    ])
  ]
})
export class MapViewComponent implements OnInit {

  incidents: IIncidentPayload[];
  selectedIncident: IIncidentPayload;
  details = 'inactive';

  constructor(
    private incidentsService: IncidentsService
  ) {}

  ngOnInit() {
    this.getIncidents();
  }

  // Fetching incidents with IncidentService
  getIncidents() {
    this.incidentsService.getIncidents().subscribe(incidents => this.incidents = incidents);
  }

  // Selecting the incident to preview
  selectIncident(incident): void {
    this.selectedIncident = incident;
    this.details = 'active';
  }

  closeIncident(): void {
    this.details = 'inactive';
  }
}
