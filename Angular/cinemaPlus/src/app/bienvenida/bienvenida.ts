import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-bienvenida',
  styleUrl: './bienvenida.css',
  templateUrl: './bienvenida.html',
})
export class Bienvenida {
  private readonly http: HttpClient;
  formulario: FormGroup;
  usuarios: any = [];

  constructor(http: HttpClient, private fb: FormBuilder) {

    this.http = http;
    this.formulario = this.fb.group(
      {
        nombres: ['', Validators.required],
        apellidos: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        telefono: ['', Validators.required],
        nombreUsuario: ['', Validators.required],
        contrasena: ['', Validators.required],
      }
    );
    this.buscarUsuarios()
  }
  guardar(){
    if(this.formulario.valid){
      this.http.post("http://localhost:8080/usuario/guardar", this.formulario.value).subscribe(
      user => this.mostrar(user)
    )
    } else {
      alert("Completar campos")
    }
    
  }

  mostrar(user:any){
    if(user?.idUsuario){
      alert("Usuario creado exitosamente con ID: " + user.idUsuario)
    } else {
      alert("Error en el servidor")
    }
    this.buscarUsuarios()
  }

  buscarUsuarios(){
    this.http.get("http://localhost:8080/usuario/buscar").subscribe(
      data => this.usuarios = data
    )
  }

}
