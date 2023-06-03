import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  sens  :boolean = false;
  vasce : boolean = false;
  par : boolean = false;
  idPar : number = 0;
  nomePar : string = '';
  unitaDiMisuraPar : string = '';
  dataOraPar : string = '';
  idVascaPar : number = 0;
  idVasca : number = 0;
  idSaleVasca : number = 0;
  idAcquarioVasca : number = 0;
  idSens : number = 0;
  minSensor : number = 0;
  maxSensor : number = 0;
  unitaDiMisuraSensor : string = '';
  valoreSensor : number = 0;
  nomeSensor : string = '';
  idVascaSensor : number = 0;


  tabelle : string[] = ['V_Sensore','V_ParametriOperativi','V_Vasca']
  tabella : string = ''
  constructor (private http:HttpClient) {}
  cambia(tabella : string)  { 
    if (tabella == 'V_Sensore') { 
      this.sens = true;
      this.vasce = false;
      this.par = false;
    }
    else if (tabella == 'V_ParametriOperativi') { 
      this.sens = false;
      this.vasce = false;
      this.par = true;
    }
    else if (tabella == 'V_Vasca') { 
      this.sens = false;
      this.vasce = true;
      this.par = false;
    }
  }
  insert () { 
    let url : string = 'http://127.0.0.1:8080/' + this.tabella + '/'
    if (this.tabella == 'V_Sensore') { 
      let sensoreee : {'Min' : number, 'Max' : number,'UnitaDiMisura': string,'Valore' : number,'Nome': string, 'IDVasca' : number} = {'Min' : this.minSensor , 'Max' : this.maxSensor , 'UnitaDiMisura' : this.unitaDiMisuraSensor , 'Valore' : this.valoreSensor, 'Nome' : this.nomeSensor , 'IDVasca' : this.idVascaSensor}
      this.http.post(url, sensoreee).subscribe(data => {
        console.log(data)
      })
    }
    else if (this.tabella == 'V_ParametriOperativi') { 
      let param:{'Nome' : string, 'UnitaDiMisura' : string, 'DataOra' : string, 'IDVasca' : number} = {'Nome' : this.nomePar, 'UnitaDiMisura' : this.unitaDiMisuraPar, 'DataOra' :this.dataOraPar, 'IDVasca' : this.idVascaPar}
      this.http.post(url, param).subscribe(data => {
        console.log(data)
      })
    }
    else if (this.tabella == 'V_Vasca') { 
      let vascaa: {'IDSale' : number, 'IDAcquario' : number} = {'IDSale' : this.idSaleVasca,'IDAcquario' : this.idAcquarioVasca}
      this.http.post(url, vascaa).subscribe(data => {
        console.log(data)
      })
    }
  }
}
