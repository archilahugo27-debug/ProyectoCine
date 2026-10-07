import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-asiento',
  styleUrl: './asiento.css',
  templateUrl: './asiento.html',
})
export class Asiento {
  private route = inject(ActivatedRoute);
  private readonly http: HttpClient;
  asientos: any = [];
  formulario: FormGroup;

  constructor(http: HttpClient, private chd: ChangeDetectorRef, private fb: FormBuilder) {

    this.http = http;
    this.buscarSala(this.route.snapshot.paramMap.get("idSala"));
    this.formulario = this.fb.group(
      {
        numero: ['', Validators.required],
        fila: ['', Validators.required],
      }
    );
  }

  buscarSala(idSala: any) {
    this.http.get("http://localhost:8080/asiento/buscar/" + idSala).subscribe(
      data => {
        this.asientos = data
        this.chd.detectChanges();
      }
    );
  }

  guardar() {
    if (this.formulario.valid) {
      let temp = { ...this.formulario.value };
      temp.idSala = this.route.snapshot.paramMap.get("idSala");
      this.http.post("http://localhost:8080/asiento/guardar", temp).subscribe(
        user => this.mostrar(user)
      )
    } else {
      alert("Completar campos")
    }
  }

  mostrar(asiento: any) {
    if (asiento?.idAsiento) {
      alert("Asiento creado exitosamente con ID: " + asiento.idAsiento);
    } else {
      alert("Error en el servidor")
    }
    this.buscarSala(this.route.snapshot.paramMap.get("idSala"));
  }
}
