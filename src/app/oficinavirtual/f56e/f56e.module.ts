import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { F56eRoutingModule } from './f56e-routing.module';
import { BandejaDependenciaComponent } from './bandeja-dependencia/bandeja-dependencia.component';
import { MaterialModule } from '../../app.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditF56eComponent } from './bandeja-dependencia/edit-f56e/edit-f56e.component';

@NgModule({
  imports: [
    CommonModule,
    F56eRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [BandejaDependenciaComponent,EditF56eComponent]
})
export class F56eModule { }
