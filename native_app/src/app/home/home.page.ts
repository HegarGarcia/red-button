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
  MarkerOptions,
  GoogleMapsEvent
} from '@ionic-native/google-maps/ngx';

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
  constructor(private platform: Platform) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  reportCrash() {
    console.log(this.location);
  }

  reportGunfire() {

  }

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAsmY7Ka-rUSyGbwsooh0XTJlBLLckRt_o',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyAsmY7Ka-rUSyGbwsooh0XTJlBLLckRt_o'
    });

    LocationService.getMyLocation(this.myLocationOptions).then((myLocation: MyLocation) => {
      this.location = myLocation;
      const options: GoogleMapOptions = {
        controls: {
          compass: true,
          myLocationButton: true,
          myLocation: true,
          zoom: false,
          mapToolbar: true
        },
        camera: {
          target: myLocation.latLng,
          zoom: 16,
        }
      };
      console.log(myLocation.latLng);
      this.map = GoogleMaps.create('map_canvas', options);
      const marker: Marker = this.map.addMarkerSync({
        icon: 'blue',
        position: {
          lat: myLocation.latLng.lat,
          lng: myLocation.latLng.lng
        }
      });
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        alert('clicked');
      });
    });
  }
}
