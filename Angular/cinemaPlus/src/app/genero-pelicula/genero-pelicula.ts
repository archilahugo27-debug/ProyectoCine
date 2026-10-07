import { Component, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-genero-pelicula',
  styleUrl: './genero-pelicula.css',
  templateUrl: './genero-pelicula.html',
})
export class GeneroPelicula {
  private readonly http: HttpClient;
  formulario: FormGroup;
  generos: any = [];

  constructor(http: HttpClient, private fb: FormBuilder, private chd: ChangeDetectorRef) {

    this.http = http;
    this.formulario = this.fb.group(
      {
        nombre: ['', Validators.required]
      }
    );
    this.buscarGenero();
  }

  guardar() {
    if (this.formulario.valid) {
      this.http.post("http://localhost:8080/genero/guardar", this.formulario.value).subscribe(
        user => this.mostrar(user)
      )
    } else {
      alert("Completar campos")
    }

  }

  mostrar(genre: any) {
    if (genre?.idGenero) {
      alert("Genero creado exitosamente con ID: " + genre.idGenero);
    } else {
      alert("Error en el servidor")
    }
    this.buscarGenero();
  }

  buscarGenero() {
    this.http.get("http://localhost:8080/genero/buscar").subscribe(
      data => {
        this.generos = data
        this.chd.detectChanges();
      }
    );
  }
}

