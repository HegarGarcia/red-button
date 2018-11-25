import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import {
  MyLocationOptions,
  MyLocation,
  GoogleMapOptions,
  GoogleMaps,
  GoogleMap,
  Environment,
  LocationService,
  Marker,
  GoogleMapsEvent
} from '@ionic-native/google-maps/ngx';

import { IncidentsService } from '@core/incidents.service';
import { IIncidentPayload } from '@core/core.module';

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

  constructor(private platform: Platform, private incident: IncidentsService) {}

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  report(event) {
    const payload: IIncidentPayload = {
      coords: {
        latitude: this.location.latLng.lat,
        longitude: this.location.latLng.lng
      },
      datatime: +Date.now(),
      event
    };

    this.incident.addIncident(payload);
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
    const marker: Marker = this.map.addMarkerSync({
      icon: 'blue',
      position: {
        lat: this.location.latLng.lat,
        lng: this.location.latLng.lng
      }
    });
    // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => { });
  }
}
