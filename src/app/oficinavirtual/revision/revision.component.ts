import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '../../../../node_modules/@angular/material';
import { poaService } from '../poa/poa.service';
import { AuthService } from '../../recursos/auth.service';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import swal from 'sweetalert2';
import { asTextData } from '../../../../node_modules/@angular/core/src/view';
import { AppconfigService } from '../../appconfig.service';
import { OficinavirtualService } from '../oficinavirtual.service';
import { recursosVarios } from '../../recursos/recursosVarios';
import { ReportesService } from '../../reportes/listado/reportes.service';
import { IfStmt } from '../../../../node_modules/@angular/compiler';



@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.scss']
})
export class RevisionComponent implements OnInit {
  datapoaFiltrado: MatTableDataSource<any>;
  
  
  constructor( 
    public dialog: MatDialog,
    private apipoa : poaService,
    private ofivirtualService:OficinavirtualService,
    private datosSesion : AuthService,
    private appSettings:AppconfigService,
    private route:ActivatedRoute,
    private router:Router,
    private reporteService:ReportesService
    ) { 
      
      
  }

  ngOnInit() {
    this.getpoaFiltro(this.datosSesion.getsession().SESSION.ID_USUARIO, 0);
  }


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    this.datapoaFiltrado.filter = filterValue.trim().toLowerCase();

    if (this.datapoaFiltrado.paginator) {
      this.datapoaFiltrado.paginator.firstPage();
    }
  }

  verFirma(poaid){//reporte sin firma  idReporte2
    this.router.navigate(['/oficinavirtual/revision/verpoa/'+poaid+'/2'])
  }
  
  public getpoaFiltro(vempleado, vfiltro){
    if (vfiltro>=0) {
    this.apipoa.getpoaFiltro(vempleado,vfiltro).subscribe(
      data => { 

        this.datapoaFiltrado = new MatTableDataSource<any>(data);
        this.datapoaFiltrado.paginator = this.paginator;
        this.datapoaFiltrado.sort = this.sort;
    });
    }
    else{
      this.datapoaFiltrado = null;
    }
    console.log('datapoaFiltrado',this.datapoaFiltrado);

  }

  @ViewChild('input2') input2:ElementRef;
prbx;
  avatar;
  firmar(poa){
    this.avatar='data:image/png;base64,'+this.datosSesion.getsession().SESSION.FOTO; 
      swal({
        title: "Firma electrónica",
        html: 
        '<div class="col-md-12 ml-auto mr-auto text-center" >'+
            '<div class="fileinput text-center">'+
                '<div class="fileinput-new thumbnail img-circle">'+
                    '<img src='+this.avatar+' alt="...">'+
                '</div>'+
                '<div class="fileinput-preview fileinput-exists thumbnail img-circle"></div>'+
            '</div>'+
        '</div>'+
        '<div>'+
            '<h5>'+"Usuario: "+this.datosSesion.getsession().SESSION.USUARIO+'</h5>'+
        '</div>'+        
        ' <textarea class="swal2-input" placeholder="Justificación" id="input2"></textarea>'+
        '<input class="swal2-input" placeholder="PIN" value="" id="input1" type="password">',
        showCancelButton: true,
        confirmButtonClass: "btn btn-success",
        confirmButtonText: "Confirmar",
        cancelButtonClass: "btn btn-danger",
        cancelButtonText: "Cancelar",
        preConfirm: function() {
          return new Promise((resolve, reject) => {
             
              // get your inputs using their placeholder or maybe add IDs to them
              resolve({
                  justificacion: document.getElementById('input2'),
                  pin: document.getElementById('input1'),
              });

              // maybe also reject() on some condition
          });
      }
        
      }    
    ).then((result) => {
      console.log('prb ',result.value.pin.value);
      console.log('prb ',result.value.justificacion.value);
      
      // $scope.confirmacion.cadena = 'CAPE=>Enviar solicitud a Homonimos:'
      //   + $scope.informacionSolicitud.CORRELATIVO
      //   + '=>Fecha:' + moment(new Date()).format('DD/MM/YYYY HH:mm:ss')
      //   + '=>Usuario:' + $scope.informacionSolicitud.USUARIO;
      var pindata = {
        usuario : this.datosSesion.getsession().SESSION.USUARIO,
        sistema : this.appSettings.sistemaIdRRHH,
        contrasenia : btoa(result.value),
        cadena : 'Autorización PEM ' + new Date().toLocaleString()+ ', Número de POA '+ poa.POAID        
      }
      /*pindata = {
        usuario : 'JAJCAN',
        sistema : 38,
        contrasenia : btoa(result.value),
        cadena : 'Autorización Prueba PEM ' + new Date().toLocaleString()+ ', Número de POA '+ poa.POAID        
      }*/
      if (result.value) {
        console.log(pindata)
        this.ofivirtualService.validarPin(pindata).subscribe(
          data => { 
            console.log(data)
            if (data.status == "OK") {
              let info={
                POAID:poa.POAID,
                ESTADOID:40,
                AUTORIZADOR:poa.AUTORIZADOR        
              }
              this.apipoa.upEstadoPOA(info).subscribe(
                data2 => { 
                  console.log(data2)
              });

              let objFirma={
                FIRMA:data.Hash,
                POAID:poa.POAID,              
              }

              this.apipoa.upEstadoPOA(objFirma).subscribe(
                data2 => { 
                  console.log(data2)
              });

              
              
            } else {
              new recursosVarios().showNotification('top','right','<h4>Error Metodo '+data.message+'</h3>',4)
            }

        });
        swal("Confirmado", "Validación correcta", "success");
        //swal("Cancelled", "Your imaginary file is safe :)", "error");
        }
      })
  }

  
openDialog(poa): void {
  const dialogRef = this.dialog.open(FirmaPIN, {
    width: '350px',
    data: {avatar:'data:image/png;base64,'+this.datosSesion.getsession().SESSION.FOTO , USUARIO:this.datosSesion.getsession().SESSION.USUARIO}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed',result);
    this.procesoPIN(result,poa)
  });
}


  procesoPIN(result,poa){

    let semilla_envia='Autorización Prueba PEM ' + new Date().toLocaleString()+ ', Número de POA '+ poa.POAID+', justificacion: '+result.justificacion;        
    var pindata = {
      usuario : this.datosSesion.getsession().SESSION.USUARIO,
      sistema : this.appSettings.sistemaIdRRHH,
      contrasenia : btoa(result.pass),
      cadena : semilla_envia        
    }
     pindata = {
      usuario : 'MCARCAMO',
      sistema : 1,
      contrasenia : btoa(result.pass),
      cadena : semilla_envia        
    }
    this.ofivirtualService.validarPin(pindata).subscribe(
      data => { 
        // console.log('pin',pindata);
        // console.log('valida',data.data[0].contrasenia)
        if (data.status == "OK") {
          console.log('pin ',data);
          
          let info={
            POAID:poa.POAID,
            ESTADOID:40,
            AUTORIZADOR:this.datosSesion.getsession().SESSION.ID_USUARIO
          }

          let objFirma={
            FIRMA:data.data[0].contrasenia,
            POAID:poa.POAID,
            JUSTIFICACION:result.justificacion,
            SEMILLA:semilla_envia,             
            ID_USUARIO_REGISTRO:this.datosSesion.getsession().SESSION.ID_USUARIO
          }
          this.apipoa.insFirmaPoa(objFirma).subscribe(
            data3 => { 
              if(data3.result=='OK'){
                console.log(data3)                
                this.apipoa.upEstadoPOA(info).subscribe(
                  data2 => { 
                    if(data3.result=='OK'){
                    this.getpoaFiltro(this.datosSesion.getsession().SESSION.ID_USUARIO, 0);
                    swal("Confirmado", "Validación correcta", "success");
                    }else{
                      swal("Error", data.msj, "error");      
                    }
                });
              }else{
                swal("Error", data.msj, "error");
              }
          });
          
        } else {
          console.log(data);
          swal("Error", data.message, "error");
          //new recursosVarios().showNotification('top','right','<h4>Error Metodo '+data.message+'</h3>',4)
        }
    });
    //swal("Cancelled", "Your imaginary file is safe :)", "error");   
  }


  grabarParametros(idFuncionario,Tipo){
    let objetoReporte:any ={};
    objetoReporte.PARAMETROS=
    [
      {
        ID_REPORTE_PARAMETRO:"80",
        ID_TIPO_DATO:"1",
        REPORTE_PARAMETRO:"P_DEPENDENCIA",
        TEXTO:"DEPENDENCIA",
        VALOR:"1019"
      },
      {
        ID_REPORTE_PARAMETRO:"82",
        ID_TIPO_DATO:"1",
        REPORTE_PARAMETRO:"P_GRUPO",
        TEXTO:"GRUPO DE GASTO",
        VALOR:"0"
      },
      {
        ID_REPORTE_PARAMETRO:"81",
        ID_TIPO_DATO:"1",
        REPORTE_PARAMETRO:"P_DEPARTAMENTO",
        TEXTO:"DEPARTAMENTO",
        VALOR:"0"
      }
    ] ;
    objetoReporte.ID_REPORTE = 22;//id=3 reporte de ficha
    objetoReporte.ID_USUARIO_REGISTRO = this.datosSesion.getsession().SESSION.ID_USUARIO;
    //console.log(objetoReporte)
    this.reporteService.insReporteSolicitud(objetoReporte).subscribe(
      data => {
          //console.log(data.id)
          window.open(this.appSettings.restOAUTH + 'Reportes/solicitudReporte/' + data.id + 'generarReporteExcel', '_blank');
     });
  }


}








@Component({
  selector: 'Firma',
  templateUrl: 'plantillaFirma.html',
})
export class FirmaPIN {
  hide=true;
  constructor(
    public dialogRef: MatDialogRef<FirmaPIN>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      data.pass='';
      data.justificacion='';
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

