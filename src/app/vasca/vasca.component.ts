import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vasca',
  templateUrl: './vasca.component.html',
  styleUrls: ['./vasca.component.css']
})
export class VascaComponent {
  //edita = true;
  //cancella = true;
  vasce: {'ID': number, 'IDSale' : number, 'IDAcquario' : number}[] = [];
  constructor(private http:HttpClient) {
    http.get<any[]>('http://127.0.0.1:8080/V_Vasca').subscribe((responce) => {
      responce.forEach(x => {
        this.vasce.push(x);
      });
    })
  }
  edita () {
    console.log('ciao')
  }
  cancella (id : number) {
    console.log('cancella')
    let url : string = 'http://127.0.0.1:8080/' + id.toString() + '/V_Vasca'
    this.http.delete(url).subscribe(
      (responce) =>{
        console.log(responce)
      }
    )
  }
}
