import { Component, OnInit,ViewChild, ElementRef, Inject } from '@angular/core';
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
import {CompraService} from '../poa/compra.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  dataProductoFiltrado: MatTableDataSource<any>;
  Codigoempleado = null;
  constructor(
    private compraService : CompraService,
    public dialog: MatDialog,    
    private datosSesion : AuthService,
    private appSettings:AppconfigService          
    ) { this.Codigoempleado=this.datosSesion.getsession().SESSION.ID_USUARIO;
      console.log('getsession',this.datosSesion.getsession());}

  filtroBusqueda: null;
  ngOnInit() {
  }

  
 


}