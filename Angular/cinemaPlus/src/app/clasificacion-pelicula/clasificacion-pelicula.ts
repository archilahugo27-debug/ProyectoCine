import { Component, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-clasificacion-pelicula',
  styleUrl: './clasificacion-pelicula.css',
  templateUrl: './clasificacion-pelicula.html',
})
export class ClasificacionPelicula {
  private readonly http: HttpClient;
  formulario: FormGroup;
  clasificaciones: any = [];

  constructor(http: HttpClient, private fb: FormBuilder, private chd: ChangeDetectorRef) {

    this.http = http;
    this.formulario = this.fb.group(
      {
        nombre: ['', Validators.required]
      }
    );
    this.buscarClasificacion();
  }

  guardar() {
    if (this.formulario.valid) {
      this.http.post("http://localhost:8080/clasificacion/guardar", this.formulario.value).subscribe(
        user => this.mostrar(user)
      )
    } else {
      alert("Completar campos")
    }

  }

  mostrar(clasificacion: any) {
    if (clasificacion?.idClasificacion) {
      alert("Clasificacion creada exitosamente con ID: " + clasificacion.idClasificacion);
    } else {
      alert("Error en el servidor")
    }
    this.buscarClasificacion();
  }

  buscarClasificacion() {
    this.http.get("http://localhost:8080/clasificacion/buscar").subscribe(
      data => {
        this.clasificaciones = data
        this.chd.detectChanges();
      }
    );
  }
}
