import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-examen',
  styleUrl: './examen.css',
  templateUrl: './examen.html',
})
export class Examen {
  private readonly http: HttpClient;
  formulario: FormGroup;
  examenes: any = [];

  constructor(http: HttpClient, private fb: FormBuilder) {
    this.http = http;
    this.formulario = this.fb.group(
      {
        nota: ['', Validators.required],
        carnet: ['', Validators.required]
      }
    );
    this.buscarExamenes();
  }

  guardar(){
    if(this.formulario.valid){
      this.http.post("http://localhost:8080/examen/guardar", this.formulario.value).subscribe(
      user => this.mostrar(user)
    )
    } else {
      alert("Completar campos")
    }
    
  }

  mostrar(exam:any){
    if(exam?.idexamen){
      alert("Examen creado exitosamente con ID: " + exam.idexamen)
    }
    this.buscarExamenes();
  }

  buscarExamenes(){
    this.http.get("http://localhost:8080/examen/buscar").subscribe(
      data => this.examenes = data
    )
  }
}
