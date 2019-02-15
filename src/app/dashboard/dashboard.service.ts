import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { AppconfigService } from '../appconfig.service';
import { Observable, of } from '../../../node_modules/rxjs';
import { catchError } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  
  constructor(private http: HttpClient,private appSettings:AppconfigService) { }

  getPlaniPresupuesto(param): Observable<any>{
    return this.http.post<any>(this.appSettings.restpoa+'Dashboard/getPlaniPresupuesto',param)
    .pipe(
      catchError(this.handleError('getPlaniPresupuesto', []))
    );
  }

  getPlaniPorGrupo(param): Observable<any>{
    return this.http.post<any>(this.appSettings.restpoa+'Dashboard/getPlaniPorGrupo',param)
    .pipe(
      catchError(this.handleError('getPlaniPorGrupo', []))
    );
  }

  getPresPorGrupo(param): Observable<any>{
    return this.http.post<any>(this.appSettings.restpoa+'Dashboard/getPresPorGrupo',param)
    .pipe(
      catchError(this.handleError('getPresPorGrupo', []))
    );
  }

  getDepartamento(): Observable<any>{
    return this.http.get<any>(this.appSettings.restpoa+'Dashboard/getDepartamento')
    .pipe(
      catchError(this.handleError('getPlaniPresupuesto', []))
    );
  }

  getDependencia(p_id_departamento): Observable<any>{
    return this.http.get<any>(this.appSettings.restpoa+'Dashboard/Departamento/'+p_id_departamento+'/getDependencia')
    .pipe(
      catchError(this.handleError('getPlaniPresupuesto', []))
    );
  }

  getGrupo(): Observable<any>{
    return this.http.get<any>(this.appSettings.restpoa+'Dashboard/getGrupo')
    .pipe(
      catchError(this.handleError('getPlaniPresupuesto', []))
    );
  }

  getSubGrupo(p_id_grupo): Observable<any>{
    return this.http.get<any>(this.appSettings.restpoa+'Dashboard/Grupo/'+p_id_grupo+'/getSubGrupo')
    .pipe(
      catchError(this.handleError('getPlaniPresupuesto', []))
    );
  }

  getRenglon(p_id_grupo,p_id_subgrupo): Observable<any>{
    return this.http.get<any>(this.appSettings.restpoa+'Dashboard/Grupo/'+p_id_grupo+'/SubGrupo/'+p_id_subgrupo+'/getRenglon')
    .pipe(
      catchError(this.handleError('getPlaniPresupuesto', []))
    );
  }


  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('xx error xx', error.message)
      
      return of(result as T);
    };
  }

}
