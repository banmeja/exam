import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BandejaDependenciaComponent } from './bandeja-dependencia/bandeja-dependencia.component';
import { EditpoaComponent } from './bandeja-dependencia/edit-poa/edit-poa.component';
import { VerpoaComponent }  from './bandeja-dependencia/ver-poa/ver-poa.component';

const routes: Routes = [
  {
    path: '',
    component: BandejaDependenciaComponent
  },
   {
      path: 'editpoa',
      component: EditpoaComponent,  
    },
    {
      path: 'editpoa/:poaid',
      component: EditpoaComponent,  
    },
    {
       path: 'verpoa/:poaid',
       component: VerpoaComponent,  
     },
     {
        path: 'verpoa/:poaid/:idReporte',
        component: VerpoaComponent,  
      }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class poaRoutingModule { }
