import { Component, ChangeDetectorRef } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, FormsModule, CommonModule, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle],
})
export class Tab1Page {
  private readonly http: HttpClient;
  anuncios: any = [];

  constructor(http: HttpClient, private chd: ChangeDetectorRef) {
    this.http = http;
    this.buscarAnuncios();
  }

   buscarAnuncios() {
    this.http.get("http://localhost:8080/anuncio/buscar").subscribe(
      data => {
        this.anuncios = data
        this.chd.detectChanges();
      }
    )
  }

}
