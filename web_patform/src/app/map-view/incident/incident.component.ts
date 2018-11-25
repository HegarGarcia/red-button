import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// Database payload
import { IIncidentPayload } from '../../core/core.module';
// Material UI
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent implements OnInit {

  @Input() incident: IIncidentPayload;

  constructor(iconRegistry: MatIconRegistry, sanitazer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'image',
      sanitazer.bypassSecurityTrustResourceUrl('./assets/images/icons/round-image-24px.svg')
    );
  }

  ngOnInit() {

  }

  dateFormat(miliseconds: number): string {

    const date = new Date(miliseconds);
    const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();

    newDate.setHours(hours - offset);

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return newDate.toLocaleDateString('es-MX', options);
  }

  formatEventText(event: string): string {
    switch (event) {
      case 'accidente-automovilistico':
        return 'Accidente automovilístico';
      case 'robo':
        return 'Robo';
      case 'conflicto-armado':
        return 'Conflicto armado';
      case 'homicidio':
      return 'Homicidio';
      default:
        return 'Evento no definido';
    }
  }
}
