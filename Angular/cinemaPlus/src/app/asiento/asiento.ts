import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [],
  selector: 'app-asiento',
  styleUrl: './asiento.css',
  templateUrl: './asiento.html',
})
export class Asiento {
  private route = inject(ActivatedRoute);
  private readonly http: HttpClient;
  asientos: any = [];
  
  constructor(http: HttpClient, private chd: ChangeDetectorRef){
    
    this.http = http;
    this.buscarSala(this.route.snapshot.paramMap.get("idSala"));
  }

   buscarSala(idSala:any) {
    this.http.get("http://localhost:8080/asiento/buscar/" + idSala).subscribe(
      data => {
        this.asientos = data
        this.chd.detectChanges();
      }
    );
  }

}
