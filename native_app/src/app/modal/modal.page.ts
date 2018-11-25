import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { IncidentsService } from '@core/incidents.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss']
})
export class ModalPage implements OnInit {
  id: string;
  title: string;
  comments: Observable<{}[]>;
  data: any;

  constructor(
    private modalController: ModalController,
    private incidents: IncidentsService,
    private params: NavParams
  ) {
    this.title = toTitleCase(params.data.event);
    this.id = params.data.id;
    this.data = params.data;
    this.comments = this.incidents.getComments(this.id);
  }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
