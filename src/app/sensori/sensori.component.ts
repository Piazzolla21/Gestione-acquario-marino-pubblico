import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sensori',
  templateUrl: './sensori.component.html',
  styleUrls: ['./sensori.component.css']
})
export class SensoriComponent {
  sensori: {'ID': number, 'Min' : number, 'Max' : number,'UnitaDiMisura': string,'Valore' : number,'Nome': string, 'IDVasca' : number}[] = [];
  constructor(private http:HttpClient) {
    http.get<any[]>('http://127.0.0.1:8080/V_Sensore').subscribe((responce) => {
      responce.forEach(x => {
        this.sensori.push(x);
      });
    })
  }
  cancella (id : number) {
    console.log('cancella')
    let url : string = 'http://127.0.0.1:8080/' + id.toString() + '/V_Sensore'
    this.http.delete(url).subscribe(
      (responce) =>{
        console.log(responce)
      }
    )
  }
}
