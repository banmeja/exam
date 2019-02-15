import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../../../recursos/auth.service';
import {poaService} from '../../poa.service';
import { MatPaginator, MatTableDataSource, MatSort, MatFormFieldControl, MatFormFieldModule, MatInputModule} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AppconfigService } from '../../../../appconfig.service';
import { ConstantPool } from '@angular/compiler/src/constant_pool';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-edit-poa',
  templateUrl: './edit-poa.component.html',
  styleUrls: ['./edit-poa.component.scss']
})
export class EditpoaComponent implements OnInit {
  //ngOnInit(){};
 

 currentTime = new Date();
 vanio=this.currentTime.getFullYear();
// returns the month (from 0 to 11)

   JsonPoa = { 
    POAID:null,
    ANIO:null,
    DEPENDENCIA:null,
    SOLICITANTE:null,
    AUTORIZADOR : null,
    DETALLE_POA : null,
    ID_USUARIO_REGISTRO : null,
    PERSONAS_DEPENDENCIA : null
  };


  selection = new SelectionModel<Element>(true, []);

  selectedFile: FileList;
  fileName: string;

  dataSedes : any=[];
  dataUnidades: any=[];
  dataAutorizadores : any=[];
  dataConformidades: any=[];


  datapoa: any=[];

  dataProductos: any=[];  

  vBuscaPoducto= null;
  vCantidad= null;
  vExiste = null;
  vContadorDetalle = 0; 

  listadoPedido: MatTableDataSource<any>= new MatTableDataSource<any>([]);;
  listadoBusqueda: MatTableDataSource<any>;
  listadoAdjuntos: MatTableDataSource<any>;

  dataAdicional = {
    Codigoempleado : null,     
    NombreEmpleado : null,
    UsuarioEmpleado : null,
    PuestoEmpleado : null,
    DependenciaSolicitante : null,
    idDependenciaSolicitante : null
  };

  vCantidadPersonas =0;

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

  idPoa;

  @ViewChild('hBSort') hBSort: MatSort;
  @ViewChild('sBSort') sBSort: MatSort;
  @ViewChild('hBSort1') hBSort1: MatPaginator;
  @ViewChild('sBSort1') sBSort1: MatPaginator;

  @ViewChild('name') name: any;

  editName() {  
    this.name.nativeElement.focus();
    //console.log('this.name.nativeElement.focus()',this.name.nativeElement);
  }; 


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator1: MatPaginator;
  @ViewChild(MatSort) sort1: MatSort;

  constructor(
    private datosSesion : AuthService,
    private apipoa : poaService,
    private appSettings:AppconfigService,
    private router:Router,
    private route:ActivatedRoute
  ) { 
    console.log(this.listadoPedido)
    this.productoSeleccionado.TOTAL=0;
  };

  ngOnInit() {
    this.idPoa =this.route.snapshot.paramMap.get('poaid');
    this.dataAdicional.Codigoempleado=this.datosSesion.getsession().SESSION.ID_USUARIO;
    this.getDatosAdicionales(this.dataAdicional.Codigoempleado);  
    this.vanio = this.vanio;
    this.JsonPoa.ANIO = Number(this.vanio);
    this.JsonPoa.ID_USUARIO_REGISTRO = Number(this.dataAdicional.Codigoempleado);
    this.getAutorizador(this.dataAdicional.Codigoempleado);  
    if(this.idPoa!='-1'){
      this.obtieneDatosxid(this.idPoa);
    }

    


  }
//declaración de funciones del componente
  public getSedes(vstatus, vcodigo, vcatalogo){
    this.apipoa.getCatalogospoa(vstatus, vcodigo, vcatalogo).subscribe(
      data => { 
        this.dataSedes = data;      
    });
 }

 public getUnidades(vstatus, vcodigo, vcatalogo){
  this.apipoa.getCatalogospoa(vstatus, vcodigo, vcatalogo).subscribe(
    data => { 
      this.dataUnidades = data;      
  });
}
 
public getDeConformidad(vempleado){
  this.apipoa.getDeConformidad(vempleado).subscribe(
    data => { 
      this.dataConformidades = data.data;      
      console.log('dataConformidad', this.dataConformidades);      
  });
}

public getAutorizador(vempleado){
  this.apipoa.getAutorizador(vempleado).subscribe(
    data => { 
      this.dataAutorizadores = data.data;      
      this.datapoa.AUTORIZADOR=data.data[0].EMPLEADO
  });
}


  public getDatosAdicionales(vempleado){
    this.apipoa.getDatosAdicionales(vempleado).subscribe(
      dataEmpleado => { 
        //console.log('dataEmpleado',dataEmpleado);
        this.dataAdicional.DependenciaSolicitante = dataEmpleado.data[0].dependenciaFuncionesDesc;
        this.dataAdicional.idDependenciaSolicitante = dataEmpleado.data[0].dependenciaFuncionesId;
        this.dataAdicional.NombreEmpleado= dataEmpleado.data[0].empleadoDesc;
        this.dataAdicional.PuestoEmpleado= dataEmpleado.data[0].puestoDesc;
        this.dataAdicional.UsuarioEmpleado=this.datosSesion.getsession().SESSION.USUARIO;
        this.getCantidadPersonas(this.dataAdicional.idDependenciaSolicitante );
        
        //console.log('this.dataAdicional',this.dataAdicional);
       // console.log('vCantidadPersonas', this.vCantidadPersonas);
    });
    }

    public getCantidadPersonas(vdependencia){
      this.apipoa.getCantidadPersonas(vdependencia).subscribe(
        dataCantidad => { 
          this.vCantidadPersonas = dataCantidad.data[0].PERSONAS;
          this.JsonPoa.PERSONAS_DEPENDENCIA = this.vCantidadPersonas;
//          console.log('dataCantidad.data[0].PERSONAS;', dataCantidad.data[0].PERSONAS);
//          console.log('dataCantidad', dataCantidad);
//          console.log('vCantidadPersonas', this.vCantidadPersonas);

      });
      }

      onEnter(event: any,vcadena, varea){
        this.getProductos(vcadena, varea);
      }


    public getProductos(vcadena, varea){
      if (vcadena!='') {
        this.apipoa.getProductos(vcadena, varea,this.dataAdicional.idDependenciaSolicitante).subscribe(
          cmbProducto => { 
            this.dataProductos = cmbProducto;
            this.listadoBusqueda = new MatTableDataSource<any>(this.dataProductos);
            this.listadoBusqueda.paginator = this.hBSort1;
            this.listadoBusqueda.sort = this.hBSort;             
//            console.log('dataProductos',this.dataProductos);
        });
/*         this.listadoBusqueda = new MatTableDataSource<any>(this.dataProductos);
         console.log('listadoBusqueda',this.listadoBusqueda);         
        this.listadoBusqueda.paginator = this.paginator;
        this.listadoBusqueda.sort = this.sort;         */
      }
      else{
        this.dataProductos = null;
        this.listadoBusqueda = null;
      }
      }    

public solicitaCantidad(row) {
  //console.log('antes de invocar el focusMethod');
  //this.focusMethod();
  //this.editName();
  this.productoSeleccionado =JSON.parse(JSON.stringify(row)); 
  //console.log('row', row);
}     

/* public verProductoSeleccionado(){
  this.sumar();
  console.log('productoSeleccionado', this.productoSeleccionado);
} */


/* Sumar dos números. */
public sumar()  {
  let valores = this.productoSeleccionado;

  var total = 0;
  //console.log(valores);
  var cantidad = Number(valores.CANTIDAD_I);	
  var cantidadII = Number(valores.CANTIDAD_II);	
  var cantidadlIII = Number(valores.CANTIDAD_III);	

  cantidad = (cantidad == null || cantidad == undefined || cantidad == 0) ? 0 : cantidad;
  cantidadII = (cantidadII == null || cantidadII == undefined || cantidadII == 0) ? 0 : cantidadII;
  cantidadlIII = (cantidadlIII == null || cantidadlIII == undefined || cantidadlIII == 0) ? 0 : cantidadlIII;

  
  
  if (cantidad>0 || cantidadII>0 || cantidadlIII>0) {
    total = cantidad + cantidadII + cantidadlIII;
  } else {
    total =0;
  }

  // Colocar el resultado de la suma en el control "span".
  this.productoSeleccionado.TOTAL = total;
  console.log('this.productoSeleccionado ya sumado el total', this.productoSeleccionado);
}


      public agregaProducto(){

        if(this.productoSeleccionado.CANTIDAD_I||this.productoSeleccionado.CANTIDAD_II||this.productoSeleccionado.CANTIDAD_III){
            var vCodigo = this.productoSeleccionado.CODIGO;
            var existe = this.dataPedidoDetalle.find(x=>x.CODIGO == vCodigo);
            let nuevaCantidad=0;
            let nuevaCantidad_II=0;            
            let nuevaCantidad_III=0;                  

            if(this.productoSeleccionado.CANTIDAD_I){
              nuevaCantidad=this.productoSeleccionado.CANTIDAD_I;
            }
            if (this.productoSeleccionado.CANTIDAD_II){
               nuevaCantidad_II =this.productoSeleccionado.CANTIDAD_II  
            }
            if (this.productoSeleccionado.CANTIDAD_III){
              nuevaCantidad_III =this.productoSeleccionado.CANTIDAD_III  
           }

            //console.log('nuevaCantidad', nuevaCantidad, 'nuevaCantidad_II', nuevaCantidad_II, 'nuevaCantidad_III', nuevaCantidad_III);
            let guardar={          
                      POAID:this.idPoa,
                      CANTIDAD_I:nuevaCantidad,
                      CANTIDAD_II:nuevaCantidad_II,
                      CANTIDAD_III:nuevaCantidad_III,                            
                      TOTAL:Number(nuevaCantidad)+Number(nuevaCantidad_II)+Number(nuevaCantidad_III),                
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
              existe.CANTIDAD_I=Number(existe.CANTIDAD_I)+Number(nuevaCantidad);
              existe.CANTIDAD_II=Number(existe.CANTIDAD_II)+Number(nuevaCantidad_II);
              existe.CANTIDAD_III=Number(existe.CANTIDAD_III)+Number(nuevaCantidad_III);  
              existe.TOTAL= Number(existe.CANTIDAD_I) +  Number(existe.CANTIDAD_II) + Number(existe.CANTIDAD_III);                                     
            }else{
              this.dataPedidoDetalle.push(guardar);
            }
            console.log('this.dataPedidoDetalle', this.dataPedidoDetalle);

            this.listadoPedido = new MatTableDataSource<any>(this.dataPedidoDetalle);
            this.listadoPedido.paginator = this.sBSort1;
            this.listadoPedido.sort = this.sBSort;

            this.productoSeleccionado.CANTIDAD_I=null;
            this.productoSeleccionado.CANTIDAD_II=null;
            this.productoSeleccionado.CANTIDAD_III=null;           
            this.productoSeleccionado.TOTAL=null;

            this.productoSeleccionado= {};  
            
            this.vContadorDetalle = this.listadoPedido.data.length;
//            this.productoSeleccionado=null;
            console.log('this.listadoPedido', this.listadoPedido);
          }
      }

      public quitaProducto(row){
          for(var i in this.dataPedidoDetalle){
            if(this.dataPedidoDetalle[i].CODIGO == row.CODIGO ){
                this.dataPedidoDetalle.splice(i,1);
            }
          }
          this.listadoPedido = new MatTableDataSource<any>(this.dataPedidoDetalle);

      }

      public obtieneDatos(){
        console.log(this.datapoa.AUTORIZADOR)
        console.log(this.dataAutorizadores.find(x=>x.EMPLEADO==this.datapoa.AUTORIZADOR))
        this.JsonPoa.ANIO = Number(this.JsonPoa.ANIO);
        this.JsonPoa.AUTORIZADOR = Number(this.datapoa.AUTORIZADOR);
        this.JsonPoa.DEPENDENCIA = Number(this.dataAdicional.idDependenciaSolicitante);
        this.JsonPoa.SOLICITANTE = Number(this.dataAdicional.Codigoempleado);
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

      applyFilter(filterValue: string) {
        if(this.listadoBusqueda){
          this.listadoBusqueda.filter = filterValue.trim().toLowerCase();
    
        if (this.listadoBusqueda.paginator) {
          this.listadoBusqueda.paginator.firstPage();
        }
        }
        
      }      

      filtroDetalle(filterValue: string) {
        if(this.listadoPedido){
          this.listadoPedido.filter = filterValue.trim().toLowerCase();
    
        if (this.listadoPedido.paginator) {
          this.listadoPedido.paginator.firstPage();
        }
        }
        
      }     

      focusMethod = function getFocus() {           
/*         var a = document.getElementById("myTextField").focus();
        console.log('getElementById',a); */
        document.getElementById("cantidad").focus();
/*         console.log('adentro',document.getElementById("myTextField").focus()); */
      }      

/* ÁREA DE INSERTS */
public grabarNuevoPoa(){
  this.obtieneDatos();
  //this.JsonPoa.anio = this.anio;
  this.JsonPoa.DETALLE_POA = this.dataPedidoDetalle;
  if (this.JsonPoa.DETALLE_POA.length>0){
    //aca debo enviar el Json
    console.log('this.JsonPoa',this.JsonPoa); 
    this.apipoa.enviarPoa(this.JsonPoa).subscribe(
      cmbgraba => { 
            console.log('cmbgraba',cmbgraba);
            this.router.navigate(['/oficinavirtual/poa']);
    });
    console.log('this.JsonPoa',this.JsonPoa);    
  } else {
    console.log('this.dataAdicional',this.dataAdicional);
    console.log('this.dataPedidoDetalle',this.dataPedidoDetalle); 
  }
}


grabarEdicionPoa(){
  this.obtieneDatos();
  this.JsonPoa.DETALLE_POA = this.dataPedidoDetalle;
  this.JsonPoa.POAID=this.idPoa;
  console.log(this.JsonPoa)
  this.apipoa.editarPoa(this.JsonPoa).subscribe(
  cmbgraba => { 
    console.log('edicion',cmbgraba);
    this.router.navigate(['/oficinavirtual/poa']);
  });
}

CANTIDAD_IChange(newValue){
  this.productoSeleccionado.CANTIDAD_I=newValue;
  console.log('1',this.productoSeleccionado.CANTIDAD_I)
  if(!this.productoSeleccionado.TOTAL){
    this.productoSeleccionado.TOTAL=0;
  }
  this.productoSeleccionado.TOTAL+=newValue;
}

CANTIDAD_IIChange(newValue){
  this.productoSeleccionado.CANTIDAD_II=newValue;
}

CANTIDAD_IIIChange(newValue){
  this.productoSeleccionado.CANTIDAD_III=newValue;
}





/*****************************EDITAR PRB **************************************** */

public obtieneDatosxid(vpoaid){
  this.apipoa.getSolicitudId(vpoaid).subscribe(
    dataEncabezado => { 
      console.log('Encabezado',dataEncabezado)
  });  

  this.apipoa.getSolicitudIdDetalle(vpoaid).subscribe(
    dataDetalle => { 
      console.log('deta',dataDetalle);
      this.dataPedidoDetalle=dataDetalle;
      this.listadoPedido= new MatTableDataSource<any>(dataDetalle);
      console.log(this.listadoPedido)
  });  
}



/*****************************FIN EDITAR PRB **************************************/



}
