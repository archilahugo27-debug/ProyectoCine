import { Component, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-funcion',
  styleUrl: './funcion.css',
  templateUrl: './funcion.html',
})
export class Funcion {
  private readonly http: HttpClient;
  formulario: FormGroup;
  peliculas: any = [];
  salas: any = [];
  funciones: any = [];

  constructor(http: HttpClient, private fb: FormBuilder, private chd: ChangeDetectorRef) {
    this.http = http;
    this.formulario = this.fb.group(
      {
        fecha: ['', Validators.required],
        precioEntrada: ['', Validators.required],
        hora: ['', Validators.required],
        idPelicula: ['', Validators.required],
        idSala: ['', Validators.required]
      }
    );

    this.buscarFunciones();
    this.buscarPeliculas();
    this.buscarSalas();
  }

  guardar() {
    if (this.formulario.valid) {
      this.http.post("http://localhost:8080/funcion/guardar", this.formulario.value).subscribe(
        fun => this.mostrar(fun)
      )

    } else {
      alert("Completar campos")
    }
  }

  mostrar(funcion: any) {
    if (funcion?.idFuncion) {
      alert("Funcion creada con ID: " + funcion.idFuncion)
    } else {
      alert("Error en el servidor")
    }
    this.buscarFunciones();
  }

   buscarFunciones() {
    this.http.get("http://localhost:8080/funcion/buscar").subscribe(
      data => {
        this.funciones = data;
        this.chd.detectChanges();
      }
    )
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
}
