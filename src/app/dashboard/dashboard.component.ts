import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  departamento=[];
  dependencia=[];
  grupo=[];
  subGrupo=[];
  renglon=[];
  idDepartamento=-1;
  idDependencia=-1;
  idGrupo=-1;
  idSubGrupo=-1;
  idRenglon=-1;
  info:any={};
  bandera;


  constructor(private elementRef: ElementRef,
              private dashboardService:DashboardService) {
  }

  ngOnInit(){
    /*let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);
    this.info(htmlRef);*/
    this.dashboardService.getDepartamento().subscribe(
      data => {
          console.log('Depto ',data)
          this.departamento=data.data;
      });

      this.dashboardService.getGrupo().subscribe(
        data => {
            console.log('grupo',data.data)
            this.grupo=data.data;
        });
        this.getInfGraficas();
  }


  selDepartamento(){ 
    this.dashboardService.getDependencia(this.idDepartamento).subscribe(
      data => {
          console.log('depen ',data)
          this.dependencia=data.data;
      });
 }

  selGrupo(){
    console.log(this.idDependencia);
     this.dashboardService.getSubGrupo(this.idGrupo).subscribe(
      data => {
          console.log('sub ',data)
          this.subGrupo=data.data;
      });
  }

  selSubGrupo(){
    this.dashboardService.getRenglon(this.idGrupo,this.idSubGrupo).subscribe(
      data => {
        console.log('reng',data)
          this.renglon=data.data;
      });
  }

  getInfGraficas(){
    this.bandera=false;
    let parametros={
      p_id_grupo:this.idGrupo,
      p_id_subgrupo:this.idSubGrupo,
      p_id_renglon:this.idRenglon,
      p_dependencia_id:this.idDependencia,
      p_id_departamento:this.idDepartamento
    }
    this.getPlaniPresupuesto(parametros);
    this.getPlaniPorGrupo(parametros);
    this.getPresPorGrupo(parametros);
  }

  getPlaniPresupuesto(parametros){
    console.log('param',parametros)
    this.dashboardService.getPlaniPresupuesto(parametros).subscribe(
      data => {
          console.log(data)
          let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas2`);
          this.Grafica(htmlRef,data.data[0].PRESUPUESTADO,data.data[0].PLANIFICADO);
          this.info=data.data[0];
          this.bandera=true;
      });     
  }

a=1;

  getPlaniPorGrupo(parametros){
    this.dashboardService.getPlaniPorGrupo(parametros).subscribe(
      data => {
          let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);
          let labels:Array<any>=new Array();
          let valores:Array<any>=new Array();
          data.data.forEach(element => {
            labels.push('Grupo '+element.GRUPO+': '+element.PLANIFICADO)
            valores.push(element.PLANIFICADO)
          });
          if(this.chart1){
            this.chart1.destroy();
          }
          this.chart1=this.GraficaPastel(this.chart1,htmlRef,labels,valores);
      });     
  }

  getPresPorGrupo(parametros){
    this.dashboardService.getPresPorGrupo(parametros).subscribe(
      data => {
          console.log('pres ',data)
          let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas3`);
          let labels:Array<any>=new Array();
          let valores:Array<any>=new Array();
          data.data.forEach(element => {
            labels.push('Grupo '+element.GRUPO+': '+element.PRESUPUESTADO)
            valores.push(element.PRESUPUESTADO)
          });
          if(this.chart2){
            this.chart2.destroy();
          }
          this.chart2=this.GraficaPastel(this.chart2,htmlRef,labels,valores);
      });     
  }

  



  chart:any;
  chart1:any;
  chart2:any;


  
    Grafica(htmlRef,presupuestado,planificado){
      if(this.chart){
        this.chart.destroy();
      }
      
      this.chart = new Chart(htmlRef, {
        // type: 'bar',
        type: 'horizontalBar',
        data: {
            datasets: [{
                label: 'Presupuestado',
                data: [presupuestado],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },
            {
              label: 'planificado',
              data: [planificado],
              backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255,99,132,1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1,
    
              // Changes this dataset to become a line
              // type: 'horizontalBar'
            }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero:true
                    }
                }],
                xAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    
    }



    GraficaPastel(graficax,htmlRef,labels, valores){
      
      let label ='Diferencia de: '
      return  new Chart(htmlRef, {
        // type: 'bar',
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Presupuestado',
                data: valores,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
          ]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    
    }

    
}
