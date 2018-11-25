import { Component, OnInit } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import {
  MyLocationOptions,
  MyLocation,
  GoogleMapOptions,
  GoogleMaps,
  GoogleMap,
  Environment,
  LocationService,
  Marker,
  GoogleMapsEvent,
  Geocoder,
  GeocoderRequest,
  GeocoderResult
} from '@ionic-native/google-maps/ngx';

import { IncidentsService } from '@core/incidents.service';
import { IIncidentPayload } from '@core/core.module';

import { ModalPage } from '../modal/modal.page';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  private location: MyLocation;
  map: GoogleMap;
  myLocationOptions: MyLocationOptions = {
    enableHighAccuracy: true
  };
  recentEvents: Observable<IIncidentPayload[]>;

  constructor(
    private platform: Platform,
    private incidents: IncidentsService,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
    await this.loadMarkers();
  }

  async report(event) {
    const payload: IIncidentPayload = {
      coords: {
        latitude: this.location.latLng.lat,
        longitude: this.location.latLng.lng
      },
      datatime: +Date.now(),
      event,
      address: await this.getAddress(this.location)
    };

    this.incidents.addIncident(payload);
  }

  getAddress(location) {
    return Geocoder.geocode({
      position: location.latLng
    }).then((results: GeocoderResult[]) => {
      if (results.length === 0) {
        // Not found
        return null;
      }
      return results[0].extra.lines.join(', ');
    });
  }

  async loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAsmY7Ka-rUSyGbwsooh0XTJlBLLckRt_o',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAsmY7Ka-rUSyGbwsooh0XTJlBLLckRt_o'
    });

    this.location = await LocationService.getMyLocation(this.myLocationOptions);
    const options: GoogleMapOptions = {
      controls: {
        compass: true,
        myLocationButton: true,
        myLocation: true,
        zoom: false,
        mapToolbar: true
      },
      camera: {
        target: this.location.latLng,
        zoom: 16
      }
    };
    this.map = GoogleMaps.create('map_canvas', options);
    await this.addCurrentLocationMarker();
  }

  async addCurrentLocationMarker() {
    return this.map.addMarker({
      icon: 'blue',
      position: {
        lat: this.location.latLng.lat,
        lng: this.location.latLng.lng
      }
    });
  }

  loadMarkers() {
    const date = new Date();
    date.setHours(date.getHours() - 1);
    this.incidents.query('datatime', '>', +date).subscribe(async incidents => {
      await this.map.clear();
      await this.addCurrentLocationMarker();
      incidents.forEach(incident => {
        const marker = this.map.addMarkerSync({
          position: {
            lat: incident.coords.latitude,
            lng: incident.coords.longitude
          }
        });
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(async () => {
          const modal = await this.createModal(incident);
          await modal.present();
        });
      });
    });
  }

  async createModal(props) {
    return this.modalController.create({
      component: ModalPage,
      componentProps: props
    });
  }
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
