import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { AuthService } from '../../../recursos/auth.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { poaService } from '../poa.service';
import {MatBadgeModule} from '@angular/material/badge';
import { importType } from '../../../../../node_modules/@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-bandeja-dependencia',
  templateUrl: './bandeja-dependencia.component.html',
  styleUrls: ['./bandeja-dependencia.component.scss']
})
export class BandejaDependenciaComponent implements OnInit {
  c1=1;
  datapoaFiltrado: MatTableDataSource<any>= new MatTableDataSource<any>([]);;;
  datapoaPendienteModificar: MatTableDataSource<any>;  
  datapoaPendienteFirmar: MatTableDataSource<any>;  
  datapoaEnTramite: MatTableDataSource<any>;  
  datapoaProcesadas: MatTableDataSource<any>;    
  datapoaAnuladas: MatTableDataSource<any>;    

  anio = new Date().getFullYear();
  
  JsonPoa : any;

  cantidad : any;
  
  cantidades = {
    cantidad01 : 0, visible01:null,     
    cantidad02 : 0, visible02:null,     
    cantidad03 : 0, visible03:null,     
    cantidad04 : 0, visible04:null,     
    cantidad05 : 0, visible05:null,     
    cantidad06 : 0, visible06:null
  };


  Codigoempleado = null;
  vFiltro = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private apipoa : poaService,
    private datosSesion : AuthService,
    private router:Router,
    private route:ActivatedRoute
    ) { 
      this.Codigoempleado=this.datosSesion.getsession().SESSION.ID_USUARIO;

  }
  

  ngOnInit() { 
  //  this.vFiltro = this.anio;
  //  this.getpoaFiltro(this.Codigoempleado, this.vFiltro);    
    this.getSolicitudCantidad(this.Codigoempleado);
    this.getpoaFiltro(this.Codigoempleado, 0);
   }


  public getpoaFiltro(vempleado, vfiltro){

    if (vfiltro>=0) {
    this.apipoa.getpoaFiltro(vempleado,vfiltro).subscribe(
      data => { 
        
        this.datapoaFiltrado = new MatTableDataSource<any>(data);
        this.datapoaFiltrado.paginator = this.paginator;
        this.datapoaFiltrado.sort = this.sort;
        this.c1 = this.datapoaFiltrado.data.length;
    });
    }
    else{
      this.datapoaFiltrado = null;
    }
    console.log('datapoaFiltrado',this.datapoaFiltrado);

  }



  public getSolicitudCantidad(vempleado){
    this.carga=true;
    this.start();
    this.apipoa.getSolicitudCantidad(vempleado).subscribe(
      dataSolCantidad => { 
        let var1 = 'primary';
        let var2 = 'warn';
        this.carga=false;
        this.cantidad = dataSolCantidad;
        this.cantidades.cantidad01 = Number(this.cantidad[0].CANTIDAD) +Number(this.cantidad[1].CANTIDAD)
                         +Number(this.cantidad[2].CANTIDAD) +Number(this.cantidad[3].CANTIDAD)                         
                         +Number(this.cantidad[4].CANTIDAD) +Number(this.cantidad[5].CANTIDAD);

        this.cantidades.cantidad02 = Number(this.cantidad[0].CANTIDAD);
        this.cantidades.cantidad03 = Number(this.cantidad[1].CANTIDAD) +Number(this.cantidad[2].CANTIDAD);
        this.cantidades.cantidad04 = Number(this.cantidad[3].CANTIDAD);           
        this.cantidades.cantidad05 = Number(this.cantidad[4].CANTIDAD);                   
        this.cantidades.cantidad06 = Number(this.cantidad[5].CANTIDAD);                 

        if (this.cantidades.cantidad02 == 0) {this.cantidades.visible02 = var1;} else {this.cantidades.visible02 = var2;}
        if (this.cantidades.cantidad03 == 0) {this.cantidades.visible03 = var1;} else {this.cantidades.visible03 = var2;}
        if (this.cantidades.cantidad04 == 0) {this.cantidades.visible04 = var1;} else {this.cantidades.visible04 = var2;}
        if (this.cantidades.cantidad05 == 0) {this.cantidades.visible05 = var1;} else {this.cantidades.visible05 = var2;}
        if (this.cantidades.cantidad02 == 0) {this.cantidades.visible06 = var1;} else {this.cantidades.visible06 = var2;}                                

    });
    }


  editar(id){
    
    this.router.navigate(['editpoa/'+id],{ relativeTo:this.route })
  }

  verSinFirma(poaid){//reporte sin firma  idReporte2
    this.router.navigate(['verpoa/'+poaid+'/1'],{ relativeTo:this.route })
  }

  verFirma(poaid){//reporte sin firma  idReporte2
    this.router.navigate(['verpoa/'+poaid+'/2'],{ relativeTo:this.route })
  }

  public getpoaPendienteModificar(vempleado){
    this.apipoa.getpoaPendienteModificar(vempleado).subscribe(
      data => { 
        console.log('getpoaPendienteModificar', data);
        this.datapoaPendienteModificar = new MatTableDataSource<any>(data);
        this.datapoaPendienteModificar.paginator = this.paginator;
        this.datapoaPendienteModificar.sort = this.sort;        
    });
  }

  public getpoaPendienteFirmar(vempleado){
    this.apipoa.getpoaPendienteFirmar(vempleado).subscribe(
      data => { 
        console.log('getpoaPendienteFirmar',data);
        this.datapoaPendienteFirmar = new MatTableDataSource<any>(data);
        this.datapoaPendienteFirmar.paginator = this.paginator;
        this.datapoaPendienteFirmar.sort = this.sort;               
    });
  }  

  public getpoaEnTramite(vempleado){
    this.apipoa.getpoaEnTramite(vempleado).subscribe(
      data => { 
        console.log('getpoaEnTramite',data);
        this.datapoaEnTramite = new MatTableDataSource<any>(data);
        this.datapoaEnTramite.paginator = this.paginator;
        this.datapoaEnTramite.sort = this.sort;                       
    });
  }  

  public getpoaProcesadas(vempleado){
    this.apipoa.getpoaProcesadas(vempleado).subscribe(
      data => { 
        console.log('getpoaProcesadas',data);
        this.datapoaProcesadas = new MatTableDataSource<any>(data);
        this.datapoaProcesadas.paginator = this.paginator;
        this.datapoaProcesadas.sort = this.sort;                    
    });
  }    

  public getpoaAnuladas(vempleado){
    this.apipoa.getpoaAnuladas(vempleado).subscribe(
      data => { 
        console.log('getpoaAnuladas',data);
        this.datapoaAnuladas = new MatTableDataSource<any>(data);
        this.datapoaAnuladas.paginator = this.paginator;
        this.datapoaAnuladas.sort = this.sort;                     
    });
  }  



  applyFilter(filterValue: string) {
    this.datapoaFiltrado.filter = filterValue.trim().toLowerCase();

    if (this.datapoaFiltrado.paginator) {
      this.datapoaFiltrado.paginator.firstPage();
    }
  }

  
  /*Inicio Funcion para el efecto de carga*/
  carga=false;
  private color='accent';
  valcolor=0;
  private intervalUpdate: any = null;
  start(){
    const type = ['primary','warn', 'accent'];
    this.intervalUpdate = setInterval(function(){
        this.color=type[this.valcolor];
        this.valcolor++;
        if(this.valcolor==3){
            this.valcolor=0;
        }
        if(!this.carga){
            clearInterval(this.intervalUpdate)
        }
    }.bind(this), 1000);
  
  }
/*Fin Funcion para el efecto de carga*/


/*   public enviarPoa(vJson){
    this.apipoa.enviarPoa(vJson).subscribe(
      data => { 
        console.log('getpoaAnuladas',data);
        this.datapoaAnuladas = new MatTableDataSource<any>(data);
        this.datapoaAnuladas.paginator = this.paginator;
        this.datapoaAnuladas.sort = this.sort;                     
    });
  }     */
  
    


}

