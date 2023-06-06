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
  vasce: {'ID': number, 'IDSale' : number, 'IDAcquario' : number, 'nascondi' : boolean}[] = [];
  constructor(private http:HttpClient) {
    http.get<any[]>('http://127.0.0.1:8080/V_Vasca').subscribe((responce) => {
      responce.forEach(x => {
        x['nascondi'] = true;
        this.vasce.push(x);
      });
    })
  }
  edita (id : number) {
    this.vasce.forEach(x => {
      if (x.ID == id) {
        x['nascondi'] = !x.nascondi;
      }
    });
  }
  cancella (id : number) {
    console.log('cancella')
    let url : string = 'http://127.0.0.1:8080/' + id.toString() + '/V_Vasca'
    this.http.delete<{'esito': number}>(url).subscribe(
      (responce) =>{
        if (responce['esito'] == 1 ) { 
          alert('Delete avvenuto con succeso')
        }
      }
    )
  }
  mod (id : number) {
    let url : string = 'http://127.0.0.1:8080/V_Vasca'
    this.vasce.forEach(x => {
      if (x.ID == id) {
        x['nascondi'] = !x.nascondi;
        this.http.put<{'esito': number}>(url,{'IDSale' : x.IDSale, 'IDAcquario' : x.IDAcquario, "ID" : x.ID}).subscribe((x)=> { 
          if (x['esito'] == 1 ) { 
            alert('Update avvenuto con succeso')
          }
        })
        
      }
    });
  }
}
