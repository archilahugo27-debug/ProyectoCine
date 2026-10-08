import { Component, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-pelicula',
  styleUrl: './pelicula.css',
  templateUrl: './pelicula.html',
})
export class Pelicula {
  private readonly http: HttpClient;
  formulario: FormGroup;
  peliculas: any = [];
  imagenBase64: string | null = null;
  generos: any = [];
  clasificaciones: any =[];

  constructor(http: HttpClient, private fb: FormBuilder, private chd: ChangeDetectorRef){
    this.http = http;
    this.formulario = this.fb.group(
      {
        titulo: ['', Validators.required],
        sinopsis: [''],
        duracionMinutos: ['', Validators.required],
        imagenPromocional: [''],
        idGenero: ['', Validators.required],
        idClasificacion: ['', Validators.required]
      }
    );
    this.buscarPeliculas();
    this.buscarGeneros();
    this.buscarClasificacion();
  }

   guardar() {
    if (this.formulario.valid) {
      let temp = { ...this.formulario.value };
      temp.imagenPromocional = this.imagenBase64;
      this.http.post("http://localhost:8080/pelicula/guardar", temp).subscribe(
        movie => this.mostrar(movie)
      )

    } else {
      alert("Completar campos")
    }
  }

  mostrar(pelicula: any) {
    if (pelicula?.idPelicula) {
      alert("Pelicula creada con ID: " + pelicula.idPelicula)
    } else {
      alert("Error en el servidor")
    }
    this.buscarPeliculas();
  }

  buscarPeliculas() {
    this.http.get("http://localhost:8080/pelicula/buscar").subscribe(
      data => {
        this.peliculas = data;
        this.chd.detectChanges();
      }
    )
  }

  buscarGeneros() {
    this.http.get("http://localhost:8080/genero/buscar").subscribe(
      data => {
        this.generos = data;
        this.chd.detectChanges();
      }
    )
  }

  buscarClasificacion() {
    this.http.get("http://localhost:8080/clasificacion/buscar").subscribe(
      data => {
        this.clasificaciones = data;
        this.chd.detectChanges();
      }
    )
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64String = result.split(',')[1];
        this.imagenBase64 = base64String;
      };
      reader.readAsDataURL(file);
    }
  }
}
