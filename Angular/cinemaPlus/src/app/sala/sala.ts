import { Component, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-sala',
  styleUrl: './sala.css',
  templateUrl: './sala.html',
})
export class Sala {
  private readonly http: HttpClient;
  formulario: FormGroup;
  salas: any = [];

  constructor(http: HttpClient, private fb: FormBuilder, private chd: ChangeDetectorRef) {

    this.http = http;
    this.formulario = this.fb.group(
      {
        nombre: ['', Validators.required],
        filas: ['', Validators.required],
        asientosPorFila: ['', Validators.required]

      }
    );
    this.buscarClasificacion();
  }

  guardar() {
    if (this.formulario.valid) {
      this.http.post("http://localhost:8080/sala/guardar", this.formulario.value).subscribe(
        user => this.mostrar(user)
      )
    } else {
      alert("Completar campos")
    }

  }

  mostrar(sala: any) {
    if (sala?.idSala) {
      alert("Sala creada exitosamente con ID: " + sala.idSala);
    } else {
      alert("Error en el servidor")
    }
    this.buscarClasificacion();
  }

  buscarClasificacion() {
    this.http.get("http://localhost:8080/sala/buscar").subscribe(
      data => {
        this.salas = data
        this.chd.detectChanges();
      }
    );
  }

  consultaAsientos(sala:any){
    location.href = "asiento/"+sala.idSala;
  }
}
