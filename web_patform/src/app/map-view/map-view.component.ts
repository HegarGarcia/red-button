import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '@environments/environment';

import { IncidentsService } from '../core/incidents.service';
import { IIncidentPayload } from '../core/core.module';

import * as mapboxgl from 'mapbox-gl';

import { Observable } from 'rxjs';
import { IGeoJson, FeatureCollection } from './map';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/dark-v9';
  lat = 19.255691;
  lng = -103.688039;

  source;
  markers: Observable<IGeoJson[]>;

  constructor(private incidentsService: IncidentsService) {
    mapboxgl.accessToken = environment.mapBox.accessToken;
  }

  ngOnInit() {
    this.markers = this.incidentsService.getGeoJson();
    this.initializeMap();
  }

  private initializeMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(location => {
        this.lat = location.coords.latitude;
        this.lng = location.coords.longitude;
      });
    }

    this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });

    this.map.on('load', () => {
      this.map.addSource('firestore', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      this.source = this.map.getSource('firestore');
      this.markers.subscribe(markers => {
        const data = new FeatureCollection(markers);
        this.source.setData(data);
      });

      this.map.addLayer(
        {
          id: 'firestore',
          source: 'firestore',
          type: 'heatmap',
          maxzoom: 16,
          paint: {
            'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['get', 'score'],
              0,
              0,
              5,
              1
            ],
            'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              1,
              1,
              3
            ],
            // 'heatmap-color': [
            //   'interpolate',
            //   ['linear'],
            //   ['heatmap-density'],
            //   0,
            //   'rgba(33,102,172,0)',
            //   0.2,
            //   'rgb(103,169,207)',
            //   0.4,
            //   'rgb(209,229,240)',
            //   0.6,
            //   'rgb(253,219,199)',
            //   0.8,
            //   'rgb(239,138,98)',
            //   1,
            //   'rgb(178,24,43)'
            // ],
            // Adjust the heatmap radius by zoom level
            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              0,
              1,
              10,
              5
            ],
            // Transition from heatmap to circle layer by zoom level
            'heatmap-opacity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              3,
              0.5,
              9,
              1
            ]
          }
        },
        'waterway-label'
      );

      this.map.addLayer(
        {
          id: 'earthquakes-point',
          type: 'circle',
          source: 'firestore',
          minzoom: 0,
          paint: {
            // Size circle radius by earthquake magnitude and zoom level
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              7,
              ['interpolate', ['linear'], ['get', 'score'], 0, 1, 5, 4],
              16,
              ['interpolate', ['linear'], ['get', 'score'], 0, 5, 5, 50]
            ],
            // Color circle by earthquake magnitude
            'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'score'],
              0,
              '#ffee58',
              1,
              '#ffca28',
              2,
              '#ffa726',
              3,
              '#ff7043',
              4,
              '#ef5350'
            ],
            'circle-stroke-color': 'hsla(0, 0%, 0%, 0)',
            'circle-stroke-width': 1,
            // Transition from heatmap to circle layer by zoom level
            'circle-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 8, 1]
          }
        },
        'waterway-label'
      );
    });
  }
}
