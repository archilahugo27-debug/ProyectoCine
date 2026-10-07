import { Component, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-anuncio',
  styleUrl: './anuncio.css',
  templateUrl: './anuncio.html',
})
export class Anuncio {

  private readonly http: HttpClient;
  formulario: FormGroup;
  anuncios: any = [];
  imagenBase64: string | null = null;
  private apiUrl = 'localhost:8080/anuncio';

  constructor(http: HttpClient, private fb: FormBuilder, private chd: ChangeDetectorRef) {
    this.http = http;
    this.formulario = this.fb.group(
      {
        descripcion: ['', Validators.required],
        imagen: [''],
        titulo: ['', Validators.required]
      }
    );
    this.buscarUsuarios();

  }

  guardar() {
    if (this.formulario.valid) {
      let temp = { ...this.formulario.value };
      temp.fechaPublicacion = new Date();
      temp.imagen = this.imagenBase64;
      this.http.post("http://localhost:8080/anuncio/guardar", temp).subscribe(
        anuncio => this.mostrar(anuncio)
      )

    } else {
      alert("Completar campos")
    }
  }

  mostrar(anuncio: any) {
    if (anuncio?.idAnuncio) {
      alert("Anuncio creado con ID: " + anuncio.idAnuncio)
    } else {
      alert("Error en el servidor")
    }
    this.buscarUsuarios();
  }

  buscarUsuarios() {
    this.http.get("http://localhost:8080/anuncio/buscar").subscribe(
      data => {
        this.anuncios = data
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
