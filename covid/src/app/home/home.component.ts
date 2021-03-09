import { Component, OnInit } from '@angular/core';
import { globalDataSummary } from '../Models/global-data';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  datatable = [];
  globalData : globalDataSummary[];
  chart = {
    PieChart: "PieChart",
    ColumnChart : "ColumnChart",
    height : 500,
    options: {
      animation:{
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }
  }
  
  
  
  constructor(private dataservice: DataServiceService) { }
  initChart(caseType: string){
    this.datatable=[];
    //this.datatable.push(["Country","Cases"]);
    this.globalData.forEach(cs=>{
      let value: number;
      if(caseType =='c'){
        if (cs.confirmed>20000){
          value = cs.confirmed;
          this.datatable.push([
            cs.country, value
          ])}
      }
      else if(caseType =='a'){
        if (cs.active > 2000){
          value = cs.active;
          this.datatable.push([
            cs.country, value
          ])}
      }
      else if(caseType =='r'){
        if(cs.recovered>2000){
          value = cs.recovered;
          this.datatable.push([
            cs.country, value
          ])}
      }
      else if(caseType == 'd'){
        if (cs.deaths>2000){
          value = cs.deaths;
          this.datatable.push([
            cs.country, value
          ])}
      }
        
    })  
    }
    
  ngOnInit(): void {
    this.dataservice.getGlobalData().subscribe(
      {
        next : (result)=>{
          console.log(result);
          this.globalData = result;
          result.forEach(cs=>{
            if(!Number.isNaN(cs.confirmed)){
              this.totalActive+=cs.active;
              this.totalConfirmed+=cs.confirmed;
              this.totalDeaths+=cs.deaths;
              this.totalRecovered+=cs.recovered;
          }
          })
          this.initChart('c');
        }
      }
    )
  }
  updateChart(input : HTMLInputElement){
    console.log(input.value);
    this.initChart(input.value);
  }

}
