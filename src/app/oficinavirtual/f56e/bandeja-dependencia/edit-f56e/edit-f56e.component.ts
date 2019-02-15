import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../../recursos/auth.service';
import {F56eService} from '../../f56e.service';
import { MatPaginator, MatTableDataSource, MatSort, MatFormFieldControl, MatFormFieldModule, MatInputModule} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AppconfigService } from '../../../../appconfig.service';
import { ConstantPool } from '@angular/compiler/src/constant_pool';


@Component({
  selector: 'app-edit-f56e',
  templateUrl: './edit-f56e.component.html',
  styleUrls: ['./edit-f56e.component.scss']
})
export class EditF56eComponent implements OnInit {
  //ngOnInit(){};

  selection = new SelectionModel<Element>(true, []);

  selectedFile: FileList;
  fileName: string;

  dataSedes : any=[];
  dataUnidades: any=[];
  dataAutorizadores : any=[];
  dataConformidades: any=[];


  dataF56e: any=[];

  dataProductos: any=[];  

  vBuscaPoducto= null;
  vCantidad= null;
  vExiste = null;
  vContadorDetalle = 0; 

  listadoPedido: MatTableDataSource<any>;
  listadoAdjuntos: MatTableDataSource<any>;

  dataAdicional = {
    Codigoempleado : null,     
    NombreEmpleado : null,
    UsuarioEmpleado : null,
    PuestoEmpleado : null,
    DependenciaSolicitante : null
  };

  vJsonArchivo = { 
    file:null,
    sistemaId:null,
    codigoEmpleado:null,
    descripcion : null,
    FILENAME: null
  };

  productoSeleccionado : any = {  };  

  dataPedidoDetalle: any = [ ];
  dataListadoArchivos: any = [ ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private datosSesion : AuthService,
    private apiF56e : F56eService,
    private appSettings:AppconfigService
  ) { 
    
  };

  ngOnInit() {

    this.dataAdicional.Codigoempleado=this.datosSesion.getsession().SESSION.ID_USUARIO;
    this.getDatosAdicionales(this.dataAdicional.Codigoempleado);  
    this.getSedes(0,0,'SEDE');  
    this.getUnidades(0,0,'UNIDAD');     
    this.getDeConformidad(this.dataAdicional.Codigoempleado);  
    this.getAutorizador(this.dataAdicional.Codigoempleado);  
    //this.getProductos('PAPEL', 'T');

  }
//declaración de funciones del componente
  public getSedes(vstatus, vcodigo, vcatalogo){
    this.apiF56e.getCatalogosF56e(vstatus, vcodigo, vcatalogo).subscribe(
      data => { 
        this.dataSedes = data;      
    });
 }

 public getUnidades(vstatus, vcodigo, vcatalogo){
  this.apiF56e.getCatalogosF56e(vstatus, vcodigo, vcatalogo).subscribe(
    data => { 
      this.dataUnidades = data;      
  });
}

public getDeConformidad(vempleado){
  this.apiF56e.getDeConformidad(vempleado).subscribe(
    data => { 
      this.dataConformidades = data.data;      
      //console.log('dataConformidad', this.dataConformidades);      
  });
}

public getAutorizador(vempleado){
  this.apiF56e.getAutorizador(vempleado).subscribe(
    data => { 
      this.dataAutorizadores = data.data;      
      //console.log('dataAutorizador', this.dataAutorizadores);      
  });
}


  public getDatosAdicionales(vempleado){
    this.apiF56e.getDatosAdicionales(vempleado).subscribe(
      dataEmpleado => { 
        this.dataAdicional.DependenciaSolicitante = dataEmpleado.data[0].dependenciaFuncionesDesc;
        this.dataAdicional.NombreEmpleado= dataEmpleado.data[0].empleadoDesc;
        this.dataAdicional.PuestoEmpleado= dataEmpleado.data[0].puestoDesc;
        this.dataAdicional.UsuarioEmpleado=this.datosSesion.getsession().SESSION.USUARIO;

    });
    }

    public getProductos(vcadena, varea){
      if (vcadena!='') {
        this.apiF56e.getProductos(vcadena, varea).subscribe(
          cmbProducto => { 
            this.dataProductos = cmbProducto;
            //console.log('dataProductos',this.dataProductos);
        });
      }
      else{
        this.dataProductos = null;
      }
      }    

      public agregaProducto(){
        if(this.productoSeleccionado.CANTIDAD){
            var vCodigo = this.productoSeleccionado.CODIGO;
            var existe = this.dataPedidoDetalle.find(x=>x.CODIGO == vCodigo);
            let nuevaCantidad=this.productoSeleccionado.CANTIDAD;
            let guardar={          
                      CANTIDAD:this.productoSeleccionado.CANTIDAD,
                      CODIGO:this.productoSeleccionado.CODIGO,
                      COMDESCRIPCION_CORTA:this.productoSeleccionado.COMDESCRIPCION_CORTA,
                      COMDESCRIPCION_PRODUCTO:this.productoSeleccionado.COMDESCRIPCION_PRODUCTO,
                      COMGRUPO:this.productoSeleccionado.COMGRUPO,
                      COMNOMBRE_UNIDAD_MEDIDA:this.productoSeleccionado.COMNOMBRE_UNIDAD_MEDIDA,
                      COMPRODUCTO:this.productoSeleccionado.COMPRODUCTO,
                      COMRENGLON:this.productoSeleccionado.COMRENGLON,
                      COMSUB_GRUPO:this.productoSeleccionado.COMSUB_GRUPO,
                      COMUNIDAD_MEDIDA:this.productoSeleccionado.COMUNIDAD_MEDIDA
                  }
                  
            if(existe){

              existe.CANTIDAD=Number(existe.CANTIDAD)+Number(nuevaCantidad);
            }else{
              this.dataPedidoDetalle.push(guardar);
            }

            this.listadoPedido = new MatTableDataSource<any>(this.dataPedidoDetalle);
            this.listadoPedido.paginator = this.paginator;
            this.listadoPedido.sort = this.sort;
            this.productoSeleccionado.CANTIDAD=null;
            this.vContadorDetalle = this.listadoPedido.data.length;
//            this.productoSeleccionado=null;
          }
      }

      public quitaProducto($event){
        var vCodigo = this.listadoPedido.data.find(x=>x.CODIGO == vCodigo).CODIGO;
        //console.log('vCodigo',vCodigo);
        var vIndex = this.listadoPedido.data.findIndex(x=>x.CODIGO == vCodigo);
        //console.log('vIndex',vIndex);

      }


      detectFiles(event) {
       //console.log('event',event);
        this.selectedFile = event.target.files;
         this.fileName = this.selectedFile[0].name;

        this.vJsonArchivo.codigoEmpleado=this.dataAdicional.Codigoempleado;
        this.vJsonArchivo.sistemaId=this.appSettings.sistemaIdOAUTH;
        this.vJsonArchivo.descripcion = this.selectedFile[0].name;        
        this.vJsonArchivo.FILENAME = this.selectedFile[0].name;
        this.vJsonArchivo.file = this.selectedFile[0];

        //console.log('selectedFiles: ' + this.selectedFile);
         //console.log('event.target.files',event.target.files);
        //console.log('vJsonArchivo', this.vJsonArchivo);
      }      

      public adjuntarArchivo(){
      let guardar={          
        FILENAME:this.vJsonArchivo.FILENAME,
        codigoEmpleado:this.vJsonArchivo.codigoEmpleado,
        descripcion:this.vJsonArchivo.descripcion,        
        file:this.vJsonArchivo.file,        
        sistemaId:this.vJsonArchivo.sistemaId        
    }

    this.dataListadoArchivos.push(guardar);    

      this.listadoAdjuntos = new MatTableDataSource<any>(this.dataListadoArchivos);
      this.listadoAdjuntos.paginator = this.paginator;
      this.listadoAdjuntos.sort = this.sort;
        //console.log('this.listadoAdjuntos.data',this.listadoAdjuntos);
      //this.vJsonArchivo = null;
      }


}
