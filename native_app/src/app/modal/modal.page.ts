import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  comments: any;
  data: any;
  @ViewChild('commentInput') input;

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

  addComment(el, value) {
    el.value = '';
    this.incidents.addComment(this.id, value);
    document.querySelector('input').value = '';
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
