import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sensori',
  templateUrl: './sensori.component.html',
  styleUrls: ['./sensori.component.css']
})
export class SensoriComponent {
  sensori: {'ID': number, 'Min' : number, 'Max' : number,'UnitaDiMisura': string,'Valore' : number,'Nome': string, 'IDVasca' : number , 'nascondi' : boolean}[] = [];
  constructor(private http:HttpClient) {
    http.get<any[]>('http://127.0.0.1:8080/V_Sensore').subscribe((responce) => {
      responce.forEach(x => {
        x['nascondi'] = true;
        this.sensori.push(x);
      });
    })
  }
  cancella (id : number) {
    console.log('cancella')
    let url : string = 'http://127.0.0.1:8080/' + id.toString() + '/V_Sensore'
    this.http.delete<{'esito': number}>(url).subscribe(
      (responce) =>{
        if (responce['esito'] == 1 ) { 
          alert('Update avvenuto con succeso')
        }
      }
    )
  }
  edita (id : number) {
    this.sensori.forEach(x => {
      if (x.ID == id) {
        x['nascondi'] = !x.nascondi;
      }
    });
  }
  mod(id : number) {
    let url : string = 'http://127.0.0.1:8080/V_Sensore'
    this.sensori.forEach(x => {
      if (x.ID == id) {
        x['nascondi'] = !x.nascondi;
        this.http.put<{'esito': number}>(url,{'Min' : x.Min, 'Max' : x.Max,'UnitaDiMisura': x.UnitaDiMisura,'Valore' : x.Valore,'Nome': x.Nome, 'IDVasca' : x.IDVasca, 'ID' : x.ID}).subscribe((x)=> { 
          if (x['esito'] == 1 ) { 
            alert('Update avvenuto con succeso')
          }
        })
        
      }
    });
  }
}
