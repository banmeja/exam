import { Component, OnInit, ViewChild } from '@angular/core';
import {F56eService} from '../f56e.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { AuthService } from '../../../recursos/auth.service';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bandeja-dependencia',
  templateUrl: './bandeja-dependencia.component.html',
  styleUrls: ['./bandeja-dependencia.component.scss']
})
export class BandejaDependenciaComponent implements OnInit {

  dataF56eFiltrado: MatTableDataSource<any>;
  dataF56ePendienteModificar: MatTableDataSource<any>;  
  dataF56ePendienteFirmar: MatTableDataSource<any>;  
  dataF56eEnTramite: MatTableDataSource<any>;  
  dataF56eProcesadas: MatTableDataSource<any>;    
  dataF56eAnuladas: MatTableDataSource<any>;    

  anio = new Date().getFullYear();
  
  Codigoempleado = null;
  vFiltro = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private apiF56e : F56eService,
    private datosSesion : AuthService,
    private router:Router,
    private route:ActivatedRoute
    ) { 
      this.Codigoempleado=this.datosSesion.getsession().SESSION.ID_USUARIO;
      console.log('getsession',this.datosSesion.getsession());

  }
  

  ngOnInit() { 
    this.vFiltro = this.anio;
    this.getF56eFiltro(this.Codigoempleado, this.vFiltro);    
   }
  
  public getF56eFiltro(vempleado, vfiltro){
    console.log('vfiltro', vfiltro);
    if (vfiltro!='') {
    this.apiF56e.getF56eFiltro(vempleado,vfiltro).subscribe(
      data => { 
        console.log('getF56eFiltro', data);
        this.dataF56eFiltrado = new MatTableDataSource<any>(data);
        this.dataF56eFiltrado.paginator = this.paginator;
        this.dataF56eFiltrado.sort = this.sort;
    });
    }
    else{
      this.dataF56eFiltrado = null;
    }
  }

  editar(){
    this.router.navigate(['editF56e'],{ relativeTo:this.route })
  }

  public getF56ePendienteModificar(vempleado){
    this.apiF56e.getF56ePendienteModificar(vempleado).subscribe(
      data => { 
        console.log('getF56ePendienteModificar', data);
        this.dataF56ePendienteModificar = new MatTableDataSource<any>(data);
        this.dataF56ePendienteModificar.paginator = this.paginator;
        this.dataF56ePendienteModificar.sort = this.sort;        
    });
  }

  public getF56ePendienteFirmar(vempleado){
    this.apiF56e.getF56ePendienteFirmar(vempleado).subscribe(
      data => { 
        console.log('getF56ePendienteFirmar',data);
        this.dataF56ePendienteFirmar = new MatTableDataSource<any>(data);
        this.dataF56ePendienteFirmar.paginator = this.paginator;
        this.dataF56ePendienteFirmar.sort = this.sort;               
    });
  }  

  public getF56eEnTramite(vempleado){
    this.apiF56e.getF56eEnTramite(vempleado).subscribe(
      data => { 
        console.log('getF56eEnTramite',data);
        this.dataF56eEnTramite = new MatTableDataSource<any>(data);
        this.dataF56eEnTramite.paginator = this.paginator;
        this.dataF56eEnTramite.sort = this.sort;                       
    });
  }  

  public getF56eProcesadas(vempleado){
    this.apiF56e.getF56eProcesadas(vempleado).subscribe(
      data => { 
        console.log('getF56eProcesadas',data);
        this.dataF56eProcesadas = new MatTableDataSource<any>(data);
        this.dataF56eProcesadas.paginator = this.paginator;
        this.dataF56eProcesadas.sort = this.sort;                    
    });
  }    
  public getF56eAnuladas(vempleado){
    this.apiF56e.getF56eAnuladas(vempleado).subscribe(
      data => { 
        console.log('getF56eAnuladas',data);
        this.dataF56eAnuladas = new MatTableDataSource<any>(data);
        this.dataF56eAnuladas.paginator = this.paginator;
        this.dataF56eAnuladas.sort = this.sort;                     
    });
  }    
  


  applyFilter(filterValue: string) {
    this.dataF56eFiltrado.filter = filterValue.trim().toLowerCase();

    if (this.dataF56eFiltrado.paginator) {
      this.dataF56eFiltrado.paginator.firstPage();
    }
  }


}
