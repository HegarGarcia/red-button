import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IIncidentPayload } from './core.module';

@Injectable()
export class IncidentsService {
  colectionRef: Observable<any>;

  constructor(private firestore: AngularFirestore) {}

  addIncident(payload: IIncidentPayload) {
    return this.firestore.collection('incidents').add(payload);
  }

  getIncidents() {
    return this.firestore.collection('incidents').valueChanges() as Observable<
      IIncidentPayload[]
    >;
  }

  getGeoJson() {
    return this.getIncidents().pipe(
      map(incidents => {
        return incidents.map(incident => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [incident.coords.longitude, incident.coords.latitude]
          },
          properties: {
            event: incident.event,
            datetime: incident.datatime,
            score: incident.score
          }
        }));
      })
    );
  }
}
