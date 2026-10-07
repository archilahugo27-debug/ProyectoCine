import { Component, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-usuario',
  styleUrl: './usuario.css',
  templateUrl: './usuario.html',
})
export class Usuario {
  private readonly http: HttpClient;
  formulario: FormGroup;
  usuarios: any = [];
  imagenBase64: string | null = null;
  private apiUrl = 'localhost:8080/usuario';


  constructor(http: HttpClient, private fb: FormBuilder, private chd: ChangeDetectorRef) {

    this.http = http;
    this.formulario = this.fb.group(
      {
        nombres: ['', Validators.required],
        apellidos: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        telefono: ['', Validators.required],
        nombreUsuario: ['', Validators.required],
        contrasena: ['', Validators.required],
        fotografia: [''],
      }
    );
    this.buscarUsuarios()
  }
  guardar() {
    if (this.formulario.valid) {
      let temp = { ...this.formulario.value };
      temp.fotografia = this.imagenBase64;
      this.http.post("http://localhost:8080/usuario/guardar", temp).subscribe(
        user => this.mostrar(user)
      )
    } else {
      alert("Completar campos")
    }

  }

  mostrar(user: any) {
    if (user?.idUsuario) {
      alert("Usuario creado exitosamente con ID: " + user.idUsuario)
    } else {
      alert("Error en el servidor")
    }
    this.buscarUsuarios()
  }

  buscarUsuarios() {
    this.http.get("http://localhost:8080/usuario/buscar").subscribe(
      data => {
        this.usuarios = data
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
