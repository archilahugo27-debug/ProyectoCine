import { Component, ChangeDetectorRef } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonButton, IonIcon } from '@ionic/angular';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { addIcons } from 'ionicons';
import { ticketOutline, close } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, FormsModule, CommonModule, IonButton, IonIcon]
})
export class Tab2Page {
  reserva: boolean = false;
  funciones: any = [];
  private readonly http: HttpClient;
  constructor(http: HttpClient, private chd: ChangeDetectorRef) {
    this.http = http;
    this.buscarAnuncios();

    addIcons({ ticketOutline, close });
  }

  buscarAnuncios() {
    this.http.get("http://localhost:8080/funcion/buscar").subscribe(
      data => {
        this.funciones = data
        this.chd.detectChanges();
      }
    )
  }

  reservacion(){
    this.reserva = true;
  }

  cancelar(){
    this.reserva = false;
  }

}
