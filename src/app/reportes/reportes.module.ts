import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ListadoComponent } from './listado/listado.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';
import { SelectModule } from '../../../node_modules/ng2-select';


@NgModule({
  imports: [
    CommonModule,
    ReportesRoutingModule,
    FormsModule,
    MaterialModule,
    SelectModule,
    ReactiveFormsModule
  ],
  declarations: [ListadoComponent]
})
export class ReportesModule { }
