import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OficinavirtualRoutingModule } from './oficinavirtual-routing.module';
import { MaterialModule } from '../app.module';
import { ReactiveFormsModule, FormsModule } from '../../../node_modules/@angular/forms';
import { RevisionComponent, FirmaPIN } from './revision/revision.component';
import { VerpoaComponent } from './poa/bandeja-dependencia/ver-poa/ver-poa.component';
import { ProductoComponent } from './producto/producto.component';
import { ListaProductoComponent } from './producto/lista-producto/lista-producto.component';
import { AddProductoComponent } from './producto/add-producto/add-producto.component';
import { EditProductoComponent } from './producto/edit-producto/edit-producto.component';
import { NoMigradoComponent } from './producto/no-migrado/no-migrado.component';

@NgModule({
  imports: [
    CommonModule,
    OficinavirtualRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [RevisionComponent,VerpoaComponent,FirmaPIN, ProductoComponent, ListaProductoComponent, AddProductoComponent, EditProductoComponent, NoMigradoComponent],
  entryComponents: [FirmaPIN,AddProductoComponent],
})
export class OficinavirtualModule { } 
