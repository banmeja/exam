import { Component, OnInit, ViewChild } from '@angular/core';
import { CompraService } from 'app/oficinavirtual/poa/compra.service';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AuthService } from 'app/recursos/auth.service';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.scss']
})
export class ListaProductoComponent implements OnInit {
  dataProductoFiltrado: MatTableDataSource<any>;
  filtroBusqueda: null;
  constructor(
    private compraService : CompraService,
    public dialog: MatDialog,    
    private datosSesion : AuthService,
    private router: Router,
    private _ProductoService : ProductoService
  ) { }

  ngOnInit() {
    this.getSigesMigrados();
  }
  getSigesMigrados(){
    this.carga=true;
    this.start();
    
    this.compraService.getSigesMigrados(this.filtroBusqueda).subscribe(
      data => {        
        this.dataProductoFiltrado = new MatTableDataSource<any>(data);
        this.dataProductoFiltrado.paginator = this.paginator;
        this.dataProductoFiltrado.sort = this.sort;
        this.carga=false;
      }      
    )
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
 public doFilter = (value: string) => {
  this.dataProductoFiltrado.filter = value.trim().toLocaleLowerCase();
}
 editProducto(Codigoempleado,row){
 
  this._ProductoService.set({      
    data :[row]
  });
  this.router.navigate(['/oficinavirtual/producto/edit']);

}

 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;
}
