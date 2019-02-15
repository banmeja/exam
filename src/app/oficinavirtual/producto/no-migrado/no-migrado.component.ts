import { Component, OnInit, ViewChild } from '@angular/core';
import { CompraService } from 'app/oficinavirtual/poa/compra.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AuthService } from 'app/recursos/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AddProductoComponent } from '../add-producto/add-producto.component';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-no-migrado',
  templateUrl: './no-migrado.component.html',
  styleUrls: ['./no-migrado.component.scss']
})
export class NoMigradoComponent implements OnInit {
  dataProductoFiltrado: MatTableDataSource<any>;
  filtroBusqueda: string;
  public size : number;
  constructor(
    private compraService : CompraService,
    public dialog: MatDialog,    
    private datosSesion : AuthService,
    private router:Router,
    private _ProductoService: ProductoService

    
  ) {
   }

  
  ngOnInit() {
  }
  getSigesNoMigrados(){
    if (this.filtroBusqueda.length > 4){
      this.carga=true;
      this.start();
      
      this.compraService.getSigesNoMigrados(this.filtroBusqueda).subscribe(
        data => {
  
          this.dataProductoFiltrado = new MatTableDataSource<any>(data);
          this.dataProductoFiltrado.paginator = this.paginator;
          this.dataProductoFiltrado.sort = this.sort;
          this.carga=false;
        }      
      )
    }else{
      console.log('advertencia')
    }
 
  }

  seleccion(Codigoempleado,row){
 
    this._ProductoService.set({      
      data :[row]
    });
    this.router.navigate(['/oficinavirtual/producto/add']);
    //   swal({
    //     title: "Asignación de precios",
    //     html: 
    //     '<div style="max-width:768px;" >'+
            
    //     '</div>'+
    //     '<div>'+
    //         '<h5>'+"Usuario: "+this.datosSesion.getsession().SESSION.NOMBRE+'</h5>'+
    //     '</div>'+
    //     '<div>'+
    //         '<table class="table table-bordered">' +
    //           '<tr><th> Renglón </th><th> Articulo </th><th> Combinación </th><th> Presentación </th></tr>'+
    //           '<tr><td>' + row.RENGLON + ' </td>' +'<td>'+ row.ARTICULO + '</td>'+'<td>'+ row.COMBINACION + '</td>'+'<td>'+ row.PRESENTACION + '</td></tr><br>'+                            
    //           '</table>'+
    //     '</div>'+     
    //     '<div>'+
    //     '<table class="table">' +          
    //     '<tr><th> Presentación </th><th colspan ="3"> Caracteristicas </th></tr>'+
    //       '<tr><td>' + row.PRESENTACION_NOMBRE + '</td><td colspan = "2">'+ row.DESCRIPCION_LARGA +'</td></tr>'+
    //       '</table>'+
    // '</div>'+
    // '<div align="left">' +    
    // '<table class="table table-bordered">' +
    // '<tr><th> Precio </th><td> <input type="number" class="swal2-input" placeholder="Precio" id="precioProducto"> </td><th> Tipo </th><td> <select name="tipoProducto" class="swal2-input" placeholder="Tipo" id="tipoProducto">  <option value="T">Generico</option>'+
    // '<option value="U">Especializado</option></select> </td></tr>'+    
    // '</table>'+                
    //     '<input class="swal2-input" placeholder="PIN" value="" id="input1" type="password">'+
    //     '</div>',
    //     showCancelButton: true,
    //     confirmButtonClass: "btn btn-success",
    //     confirmButtonText: "Confirmar",
    //     cancelButtonClass: "btn btn-danger",
    //     cancelButtonText: "Cancelar",
    //     customClass: 'swal-width',
    //     preConfirm: function() {
    //       return new Promise((resolve, reject) => {                         
    //           // get your inputs using their placeholder or maybe add IDs to them
    //           resolve (
    //                      {
    //                        justificacion: document.getElementById('input2'),
    //                        pin: document.getElementById('input1'),
    //                      }
    //                   );
    //           // maybe also reject() on some condition
    //       });
    //   }
        
    //   }    
    // )
}

public doFilter = (value: string) => {
  if (this.dataProductoFiltrado == undefined){
    console.log(1)
  }else{
    this.dataProductoFiltrado.filter = value.trim().toLocaleLowerCase();
  }
  
}
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;



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

}
