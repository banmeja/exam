import { Component, OnInit, ViewChild } from '@angular/core';
import { CompraService } from 'app/oficinavirtual/poa/compra.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AuthService } from 'app/recursos/auth.service';
import { Router } from '@angular/router';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.scss']
})
export class EditProductoComponent implements OnInit {
  public data;
  producto: any = [];
  infoAdicional: any = [];
  dataProductoAgregar: MatTableDataSource<any>;

  constructor(
    private compraService: CompraService,
    public dialog: MatDialog,
    private datosSesion: AuthService,
    private router: Router,
    public _ProductoService: ProductoService
  ) {  
    
    this.data = this._ProductoService.get();    
    if (this.data == null || this.data.length == 0) {
      this.router.navigate(['/oficinavirtual/producto']);      
    }else{
      this.producto = this.data.data;
      this.dataProductoAgregar = new MatTableDataSource<any>(this.data.data);
      this.dataProductoAgregar.paginator = this.paginator;
      this.dataProductoAgregar.sort = this.sort;
    } }

  ngOnInit() {
  }

  volver() {
    this.router.navigate(['/oficinavirtual/producto']);
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
}
