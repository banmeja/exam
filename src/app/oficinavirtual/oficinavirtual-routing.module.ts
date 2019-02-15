import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RevisionComponent } from './revision/revision.component';
import { VerpoaComponent } from './poa/bandeja-dependencia/ver-poa/ver-poa.component';
import { ProductoComponent } from './producto/producto.component';
import { EditProductoComponent } from './producto/edit-producto/edit-producto.component';
import { AddProductoComponent } from './producto/add-producto/add-producto.component';

export const routes: Routes = [
  {
    path: 'f56e',
    loadChildren: './f56e/f56e.module#F56eModule',
             data: {paginas: [33]},
    //canActivate:[validarPermisos] 
  },
  {
    path: 'poa',
    loadChildren: './poa/poa.module#poaModule',
             data: {paginas: [33]},
    //canActivate:[validarPermisos] 
  },
  
  {
    path: 'revision',
    component:RevisionComponent
    //canActivate:[validarPermisos] 
  },
  {
    path: 'revision/verpoa/:poaid/:idReporte',
    component: VerpoaComponent,  
  },
  {
    path: 'producto',
    component:ProductoComponent        
  },
  {
    path: 'producto/add',
    component:AddProductoComponent,  
  },
  {
    path: 'producto/edit',
    component:EditProductoComponent,  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OficinavirtualRoutingModule { }
