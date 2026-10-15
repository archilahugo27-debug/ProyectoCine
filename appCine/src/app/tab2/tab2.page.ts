import { Component, ChangeDetectorRef } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonButton, IonIcon, IonInput, IonSelect, IonSelectOption } from '@ionic/angular';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { addIcons } from 'ionicons';
import { ticketOutline, close, checkmarkDone, cashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, FormsModule, CommonModule, IonButton, IonIcon, IonInput, IonSelect, IonSelectOption]
})
export class Tab2Page {

  reserva: boolean = false;
  funciones: any = [];
  peliculas: any = [];
  salas: any = [];
  precio: any = {};
  reservaNueva: any = {};
  reservado: boolean = false;
  reservas: any = [];
  cliente = JSON.parse(localStorage.getItem("cliente") || "{}");

  private readonly http: HttpClient;

  constructor(http: HttpClient, private chd: ChangeDetectorRef) {
    this.http = http;
    this.buscarFunciones();
    this.buscarPeliculas();
    this.buscarSalas();
    this.buscarReservas();

    addIcons({ ticketOutline, close, checkmarkDone, cashOutline });
  }

  buscarFunciones() {
    this.http.get("http://localhost:8080/funcion/buscar").subscribe(
      data => {
        this.funciones = data
        this.chd.detectChanges();
      }
    )
  }

  reservacion() {
    this.reserva = true;
    this.chd.detectChanges();
  }

  cancelar() {
    this.reserva = false;
    this.chd.detectChanges();
  }

  buscarSalas() {
    this.http.get("http://localhost:8080/sala/buscar").subscribe(
      data => {
        this.salas = data;
        this.chd.detectChanges();
      }
    )
  }

  buscarPeliculas() {
    this.http.get("http://localhost:8080/pelicula/buscar").subscribe(
      data => {
        this.peliculas = data;
        this.chd.detectChanges();
      }
    )
  }

  guardarReserva() {
    if (this.reservaNueva && this.reservaNueva.idFuncion && this.reservaNueva.cantidadEntradas) {
      let temp = { ...this.reservaNueva };
      for (let funcion of this.funciones) {
        if (this.reservaNueva.idFuncion == funcion.idFuncion) {
          temp.fechaReserva = funcion.fecha;
          temp.totalAPagar = this.reservaNueva.cantidadEntradas * funcion.precioEntrada;
          temp.idCliente = this.cliente.idcliente;
        }
      }
      this.http.post("http://localhost:8080/reserva/guardar", temp).subscribe(
        user => this.mostrar(user)
      )
    } else {
      alert("Completar campos")
    }
  }

  mostrar(reserva: any) {
    if (reserva?.idReserva) {
      alert("Usuario creado exitosamente con ID: " + reserva.idReserva)
      this.reservado = true;
      this.chd.detectChanges();
    } else {
      alert("Error en el servidor")
    }
  }

  buscarReservas() {
    this.http.get("http://localhost:8080/reserva/buscar").subscribe(
      data => {
        this.reservas = data;
        this.chd.detectChanges();
      }
    )
  }

  verReserva() {
    this.reservado = true;
    this.chd.detectChanges();
  }

  volver() {
    this.reservado = false;
    this.chd.detectChanges();
  }
}
