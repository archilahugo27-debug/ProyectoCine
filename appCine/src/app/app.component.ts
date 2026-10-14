import { Component, ChangeDetectorRef } from '@angular/core';
import {
  IonApp, IonRouterOutlet, IonCard, IonCardContent, IonCardHeader,
  IonCardSubtitle, IonCardTitle, IonInput, IonItem, IonList, IonButton, IonIcon
} from '@ionic/angular';

import { addIcons } from 'ionicons';
import { checkmarkDone, personAdd, close } from 'ionicons/icons';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput, IonItem, IonList, IonButton, IonIcon, FormsModule, CommonModule],
})
export class AppComponent {
  cliente: any = null;
  clienteLogin: any = {};
  private readonly http: HttpClient;

  crearCuenta: boolean = false;
  clienteNuevo: any = {};

  constructor(http: HttpClient, private chd: ChangeDetectorRef) {
    this.http = http;
    addIcons({ checkmarkDone, personAdd, close });
  }

  login() {
    if (this.clienteLogin && this.clienteLogin.correo && this.clienteLogin.contrasena) {
      this.http.post("http://localhost:8080/cliente/ingresar", this.clienteLogin).subscribe(
        user => this.validar(user)
      )
    } else {
      alert("Ingrese correo y contraseña.");
    }
  }

  validar(cliente: any) {
    if (cliente?.idcliente) {
      localStorage.setItem("cliente", JSON.stringify(cliente));
      this.cliente = cliente;
    } else {
      alert("usuario o contraseña invalidos")
    }
  }

  crearCuentaBtn(){
    this.crearCuenta = true;
    this.clienteNuevo = {};
  }

  crearCliente(){
    if (this.clienteNuevo && this.clienteNuevo.nombres && this.clienteNuevo.apellidos && this.clienteNuevo.nit && this.clienteNuevo.correo && this.clienteNuevo.contrasena && this.clienteNuevo.telefono) {
      let temp = { ...this.clienteNuevo };
      this.http.post("http://localhost:8080/cliente/guardar", temp).subscribe(
        user => this.mostrar(user)
      )
    } else {
      alert("Completar campos")
    }
  }

    mostrar(client: any) {
    if (client?.idcliente) {
      alert("Usuario creado exitosamente con ID: " + client.idcliente)
      this.crearCuenta = false;
      this.chd.detectChanges();
    } else {
      alert("Error en el servidor")
    }
  }

  cancelar(){
    this.crearCuenta = false;
  }
}
