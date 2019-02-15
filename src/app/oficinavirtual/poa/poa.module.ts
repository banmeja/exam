import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { poaRoutingModule } from './poa-routing.module';
import { BandejaDependenciaComponent } from './bandeja-dependencia/bandeja-dependencia.component';
import { MaterialModule } from '../../app.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditpoaComponent } from './bandeja-dependencia/edit-poa/edit-poa.component';
import { OficinavirtualModule } from '../oficinavirtual.module';

@NgModule({
  imports: [
    CommonModule,
    poaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    OficinavirtualModule
  ],
  declarations: [BandejaDependenciaComponent,EditpoaComponent]
})
export class poaModule { }
