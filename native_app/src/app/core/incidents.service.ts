import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

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

  addComment(id, comment) {
    this.firestore.collection(`incidents/${id}/comments`).add({ comment });
  }

  getComments(id) {
    return this.firestore
      .collection(`incidents/${id}/comments`)
      .valueChanges() as Observable<{}[]>;
  }

  query(key: string, conditional, value) {
    return this.firestore
      .collection('incidents', ref => ref.where(key, conditional, value))
      .snapshotChanges()
      .pipe(
        map(incidents => {
          return incidents.map(a => {
            const data = a.payload.doc.data() as IIncidentPayload;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }
}
