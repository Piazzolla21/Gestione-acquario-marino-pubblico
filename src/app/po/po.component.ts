import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.css']
})
export class PoComponent {
  po: {'ID': number, 'Nome' : string, 'UnitaDiMisura' : string, 'DataOra' : string, 'IDVasca' : number}[] = [];
  constructor(private http:HttpClient) {
    http.get<any[]>('http://127.0.0.1:8080/V_ParametriOperativi').subscribe((responce) => {
      responce.forEach(x => {
        this.po.push(x);
      });
    })
  }

}