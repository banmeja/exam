import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort, MatSelectChange, MatOption, MatInputModule } from '@angular/material';
import { CompraService } from 'app/oficinavirtual/poa/compra.service';
import { AuthService } from 'app/recursos/auth.service';
import { Router } from '@angular/router';
import { ProductoService } from '../producto.service';
import { SelectionModel } from '@angular/cdk/collections';

export interface Tipo {
  value: string;
  viewValue: string;
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.scss']
})

export class AddProductoComponent implements OnInit {
  public data;
  public dependencias;

  producto: any = [];
  infoAdicional: any = [];
  dataProductoAgregar: MatTableDataSource<any>;
  dataDependencia: MatTableDataSource<any>;
  selectedValue: string;
  confirmarProducto: any = [];
  unidades: any = [];
  selectRows: any = [];
  InfoRows = [];
  tipos: Tipo[] = [
    { value: 'T', viewValue: 'GENERICO' },
    { value: 'U', viewValue: 'ESPECIALIZADO' }

  ];
  displayedColumns: string[] = ['select', 'DEPENDENCIA', 'NOMBRE_DEPENDENCIA'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  oculta: boolean;
  comproducto: string;
  comgrupo: string;
  comsubgrupo: string;
  comrenglon: string;
  constructor(private compraService: CompraService,
    public dialog: MatDialog,
    private datosSesion: AuthService,
    private router: Router,
    public _ProductoService: ProductoService
  ) {
    this.data = this._ProductoService.get()
    if (this.data == null || this.data.length == 0) {
      this.router.navigate(['/oficinavirtual/producto']);
    } else {
      this.producto = this.data.data;
      this.dataProductoAgregar = new MatTableDataSource<any>(this.data.data);
      this.dataProductoAgregar.paginator = this.paginator;
      this.dataProductoAgregar.sort = this.sort;
      this.comproducto = this.data.data[0].NOMBRE;
      //let comgrupo1,comsubgrupo1,comrenglon1;

      /*comgrupo1 = this.data.data[0].RENGLON.toString().substr(0,1);
      comsubgrupo1 = this.data.data[0].RENGLON.toString().substr(1,1);
      comrenglon1 = this.data.data[0].RENGLON.toString().substr(2,1);
      this.comgrupo = comgrupo1;
      this.comsubgrupo = comsubgrupo1;
      this.comrenglon = comrenglon1;*/


    }
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataDependencia.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataDependencia.data.forEach(row => this.selection.select(row));
  }

  public doFilter = (value: string) => {
    if (this.dataDependencia == undefined) { console.log("fxcaddp") } else {
      this.dataDependencia.filter = value.trim().toLocaleLowerCase();
    }

  }

  ngOnInit() {
    this.oculta = true;
  };

  selected(value) {

    if (value == 'U') {
      this.dependencias = this.compraService.getListaDependencias().subscribe(
        data => {
          if (data.length > 0) {
            this.unidades = [];
            this.dataDependencia = new MatTableDataSource<any>(data);
            this.dataDependencia.paginator = this.paginator;
            this.dataDependencia.sort = this.sort;
          } else {
            this.dependencias = [];
            this.unidades = [];
          }
        }

      );
      this.oculta = false;


    } else {
      this.selection.clear();
      this.dependencias = [];
      this.oculta = true;
    }


  }
  SelectedRows() {
    this.InfoRows = [];
    this.selection.selected.forEach(item => {
      this.InfoRows.push({
        DEPENDENCIA: item.DEPENDENCIA,
        NOMBRE_DEPENDENCIA: item.NOMBRE_DEPENDENCIA,
      });
    });
    this.unidades.push(this.InfoRows);
    //console.log(this.InfoRows);
  }
  limpiarRegistro() {
    this.producto = [];
  }
  save() {
    if (this.infoAdicional.precioEstimado == null && this.infoAdicional.anioVigencia != null && this.selectedValue != undefined) {
      console.log('agregar precio');
    } else if (this.infoAdicional.precioEstimado != null && this.infoAdicional.anioVigencia == null && this.selectedValue != undefined) {
      console.log('agregar vigencia');
    }
    else if (this.infoAdicional.precioEstimado != null && this.infoAdicional.anioVigencia != null && this.selectedValue == undefined) {
      console.log('seleccionar tipo', this.selectedValue);
    } else if (this.infoAdicional.precioEstimado == null || this.infoAdicional.anioVigencia == null || this.selectedValue == undefined) {
      console.log('incompleto')
    } else {
      this.SelectedRows();
      if (this.unidades[0].length > 0) {
        this.producto[0].DEPENDENCIAS = this.unidades[0];
        this.producto[0].PRECIO = this.infoAdicional.precioEstimado;
        this.producto[0].ANIO = this.infoAdicional.anioVigencia;
        this.producto[0].TIPO = this.selectedValue;
        this.producto[0].USUARIO = this.datosSesion.getsession().SESSION.USUARIO;
        this.producto[0].ID_USUARIO_REGISTRO = this.datosSesion.getsession().SESSION.ID_USUARIO;
        this.producto[0].NOMBRE = this.comproducto;
        console.log('es mayor en la posicion 0BBBBBBBBBBB', this.unidades)
        console.log('-----------------------------------')
        console.log('es mayor en la posicion CC0', this.unidades[0])
      } else {
        this.producto[0].PRECIO = this.infoAdicional.precioEstimado;
        this.producto[0].ANIO = this.infoAdicional.anioVigencia;
        this.producto[0].TIPO = this.selectedValue;
        this.producto[0].USUARIO = this.datosSesion.getsession().SESSION.USUARIO;
        this.producto[0].ID_USUARIO_REGISTRO = this.datosSesion.getsession().SESSION.ID_USUARIO;
        this.producto[0].NOMBRE = this.comproducto;
        this.unidades = [];
        console.log('sin datos en la posicion 0', this.unidades[0])
      }
      console.log('resultado final', this.unidades)
      /*if (this.unidades[0].length > 0) {
        
      } else {
        
      }*/


      console.log(this.producto[0]);
      console.log('servicio post');
      //limpiar arreglo ***
      this.compraService.addProducto(this.producto[0]).subscribe(
        data => {
          console.log('AGREGADO ', data);
           
        });
        
        console.log(this.producto[0]);  
      //this.router.navigate(['/oficinavirtual/producto']);
    }


  }
  volver() {
    this.router.navigate(['/oficinavirtual/producto']);
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

}
