import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.css']
})
export class PoComponent {
  ed : boolean = false;
  id: number = 0 
  po: {'ID': number, 'Nome' : string, 'UnitaDiMisura' : string, 'DataOra' : string, 'IDVasca' : number, 'nascondi' : boolean}[] = [];
  constructor(private http:HttpClient) {
    http.get<any[]>('http://127.0.0.1:8080/V_ParametriOperativi').subscribe((responce) => {
      responce.forEach(x => {
        x['nascondi'] = true;
        this.po.push(x);
      });
      console.log(this.po)
    })
  }
  cancella (id : number) {
    console.log('cancella')
    let url : string = 'http://127.0.0.1:8080/' + id.toString() + '/V_ParametriOperativi'
    this.http.delete<{'esito': number}>(url).subscribe(
      (responce) =>{
        if (responce['esito'] == 1 ) { 
          alert('Delete avvenuto con succeso')
        }
      }
    )
  }
  edita(id : number) { 
    this.po.forEach(x => {
      if (x.ID == id) {
        x['nascondi'] = !x.nascondi;
      }
    });
  }

  mod (id : number) {
    let url : string = 'http://127.0.0.1:8080/V_ParametriOperativi'
    this.po.forEach(x => {
      if (x.ID == id) {
        x['nascondi'] = !x.nascondi;
        this.http.put<{'esito': number}>(url,{'Nome' : x.Nome, 'UnitaDiMisura' : x.UnitaDiMisura,'DataOra' : x.DataOra , 'IDVasca' : x.IDVasca , 'ID': x.ID}).subscribe((x)=> { 
          if (x['esito'] == 1 ) { 
            alert('Update avvenuto con succeso')
          }
          
        })
        
      }
    });
  }

}
