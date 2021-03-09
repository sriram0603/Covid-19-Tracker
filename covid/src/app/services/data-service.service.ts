import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {globalDataSummary} from '../Models/global-data';
import { AttrAst } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private globalDataUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/12-31-2020.csv";

  constructor(private http: HttpClient) { }

  getGlobalData(){
    return this.http.get(this.globalDataUrl,{responseType: 'text'}).pipe(
      map(result =>{
        let data: globalDataSummary[] = [];
        let raw = {};
        let rows = result.split('\n');
        rows.splice(0,1);
        rows.forEach(row=>{
          let cols = row.split(/,(?=\S)/);
          let cs = {
            country : cols[3],
            confirmed : +cols[7],
            deaths : +cols[8],
            recovered : +cols[9],
            active : +cols[10]
          };
          let temp : globalDataSummary = raw[cs.country];
          if (temp){
            temp.active = cs.active + temp.active;
            temp.recovered = cs.recovered + temp.recovered;
            temp.deaths = cs.deaths + temp.deaths;
            temp.confirmed = cs.confirmed + temp.confirmed;
            raw[cs.country] = temp;
          }else{
            raw[cs.country] = cs;
          }
        })
        
        return <globalDataSummary[]>Object.values(raw);
        
      })
    )
  }
}
