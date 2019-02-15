import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BandejaDependenciaComponent } from './bandeja-dependencia/bandeja-dependencia.component';
import { EditF56eComponent } from './bandeja-dependencia/edit-f56e/edit-f56e.component';

const routes: Routes = [
  {
    path: '',
    component: BandejaDependenciaComponent
  },
   {
      path: 'editF56e',
      component: EditF56eComponent,  
    } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class F56eRoutingModule { }
