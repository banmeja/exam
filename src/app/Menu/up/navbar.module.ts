import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { MatButtonModule } from '@angular/material';
import { MaterialModule } from '../../app.module';
@NgModule({
    imports: [ RouterModule, CommonModule, MatButtonModule,MaterialModule ],
    declarations: [],
    exports: []
})

export class NavbarModule {}
