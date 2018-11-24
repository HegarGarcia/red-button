import { Component, OnInit } from '@angular/core';
import { Platform } from "@ionic/angular";
import { GoogleMaps, GoogleMap, Environment } from "@ionic-native/google-maps/ngx";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  map: GoogleMap;
  constructor(private platform: Platform) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAsmY7Ka-rUSyGbwsooh0XTJlBLLckRt_o',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyAsmY7Ka-rUSyGbwsooh0XTJlBLLckRt_o'
    });

    this.map = GoogleMaps.create('map_canvas');
  }
}
