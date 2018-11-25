import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// Database payload
import { IIncidentPayload } from '../core/core.module';
import { IncidentsService } from '../core/incidents.service';

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.css']
})
export class GraphViewComponent implements OnInit {

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public chartLabels = ['Incidents'];
  public chartType = 'bar';
  public chartLegend = true;
  chartData: any[];

  constructor(
    private incidentesService: IncidentsService
  ) {
    this.chartData = [
      { data: [0], label: 'Accidentes automovilísticos' },
      { data: [0], label: 'Robos' },
      { data: [0], label: 'Conflictos Armados' },
      { data: [0], label: 'Homicidios' }
    ];
  }

  ngOnInit() {
    this.fetchData();
  }

  addData (incident: IIncidentPayload): void {
    switch (incident.event) {
      case 'accidente-automovilistico':
        this.chartData[0].data[0]++;
        break;
      case 'robo':
        this.chartData[1].data[0]++;
        break;
      case 'conflicto-armado':
        this.chartData[2].data[0]++;
        break;
      case 'homicidio':
        this.chartData[3].data[0]++;
        break;
    }
  }

  async fetchData() {
    this.incidentesService.getIncidents().subscribe(
      (incidents) => {
        incidents.forEach(incident => {
          this.addData(incident);
        });
      }
    );
  }

}
