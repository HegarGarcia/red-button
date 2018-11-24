import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { IIncidentPayload } from './core.module';

@Injectable()
export class IncidentsService {
  colectionRef: Observable<any>;

  constructor(private firestore: AngularFirestore) {}

  addIncident(payload: IIncidentPayload) {
    this.firestore.collection('incidents').add(payload);
  }

  getIncidents() {
    return this.firestore.collection('incidents').valueChanges() as Observable<
      IIncidentPayload[]
    >;
  }
}
