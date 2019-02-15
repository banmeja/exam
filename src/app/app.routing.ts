import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthGuardService, validarPermisos } from './guardAccesos/auth-guard.service';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AyudaComponent } from './ayuda/ayuda.component';

export const AppRoutes: Routes = [
    {
      path: '',
      component: AdminLayoutComponent,
      data: {paginas: [33]},
      canActivate: [AuthGuardService],
      children: [
        {
            path: '',
            loadChildren: './home/home.module#HomeModule',
            canActivate: [AuthGuardService],
            //component:HomeComponent
        },
        {
            path: 'padre',
            loadChildren: './genericopadre/genericopadre.module#Genericopadre',
            data: {paginas: [33]},
            canActivate:[validarPermisos]
        },
        {
            path: 'oficinavirtual',
            loadChildren: './oficinavirtual/oficinavirtual.module#OficinavirtualModule',
/*             data: {paginas: [33]},
            canActivate:[validarPermisos] */
        },
        {
            path: 'reportes',
            loadChildren: './reportes/reportes.module#ReportesModule',
        },
        {
            path: 'ayuda',
            component: AyudaComponent,
        },
        {
            path: 'dashboard',
            component:DashboardComponent
        }
        ]
    }, 
    {
      path: 'login',
      component: LoginComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(AppRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
