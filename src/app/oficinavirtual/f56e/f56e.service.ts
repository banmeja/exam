import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppconfigService } from '../../appconfig.service';
import { HttpClient } from '@angular/common/http';
import { recursosVarios } from '../../recursos/recursosVarios';


@Injectable({
  providedIn: 'root'
})
export class F56eService {

  constructor(private http: HttpClient,private appSettings:AppconfigService) { }

  
  getF56eFiltro(vempleado, vfiltro ): Observable<any>{
    return this.http.get<any>(this.appSettings.restF56E+'f56e/getF56eFiltroRest/'+vempleado+'/'+vfiltro+'/getF56eFiltroRest')
    .pipe(
      catchError(this.handleError('f56e/getF56eFiltroRest/20372/A/getF56eFiltroRest', []))
    );
  }

  getF56ePendienteModificar(vempleado): Observable<any>{
    return this.http.get<any>(this.appSettings.restF56E+'f56e/getF56ePendienteModificarRest/'+vempleado+'/getF56ePendienteModificarRest')
    .pipe(
      catchError(this.handleError('f56e/getF56ePendienteModificarRest/'+vempleado+'/getF56ePendienteModificarRest', []))
    );
  }

  getF56ePendienteFirmar(vempleado): Observable<any>{
    return this.http.get<any>(this.appSettings.restF56E+'f56e/getF56ePendienteFirmarRest/'+vempleado+'/getF56ePendienteFirmarRest')
    .pipe(
      catchError(this.handleError('f56e/getF56ePendienteFirmarRest/'+vempleado+'/getF56ePendienteFirmarRest', []))
    );
  }

  getF56eEnTramite(vempleado): Observable<any>{
    return this.http.get<any>(this.appSettings.restF56E+'f56e/getF56eEnTramiteRest/'+vempleado+'/getF56eEnTramiteRest')
    .pipe(
      catchError(this.handleError('f56e/getF56eEnTramiteRest/'+vempleado+'/getF56eEnTramiteRest', []))
    );
  }

  getF56eProcesadas(vempleado): Observable<any>{
    return this.http.get<any>(this.appSettings.restF56E+'f56e/getF56eProcesadasRest/'+vempleado+'/getF56eProcesadasRest')
    .pipe(
      catchError(this.handleError('f56e/getF56eProcesadasRest/'+vempleado+'/getF56eProcesadasRest', []))
    );
  }
  
  getF56eAnuladas(vempleado): Observable<any>{
    return this.http.get<any>(this.appSettings.restF56E+'f56e/getF56eAnuladasRest/'+vempleado+'/getF56eAnuladasRest')
    .pipe(
      catchError(this.handleError('f56e/getF56eAnuladasRest/'+vempleado+'/getF56eAnuladasRest', []))
    );
  }

  getDatosAdicionales(vempleado): Observable<any>{
    return this.http.get<any>(this.appSettings.restRRHH+'catalogo/empleado/'+vempleado+'/sinfoto')
    .pipe(
      catchError(this.handleError('catalogo/empleado/'+vempleado+'/sinfoto', []))
    );
  }

  getCatalogosF56e(vstatus, vcodigo, vcatalogo): Observable<any>{
    return this.http.get<any>(this.appSettings.restF56E+'f56e/getCatalogosRest/'+vstatus+'/'+vcodigo+'/'+vcatalogo+'/getCatalogosRest')
    .pipe(
      catchError(this.handleError('f56e/getCatalogosRest/'+vstatus+'/'+vcodigo+'/'+vcatalogo+'/getCatalogosRest', []))
    );
  }

  getProductos(vcadena, varea): Observable<any>{
    return this.http.get<any>(this.appSettings.restCompras+'compras/getProductos/'+vcadena+'/'+varea+'/getProductos')
    .pipe(
      catchError(this.handleError('compras/getProductos/'+vcadena+'/'+varea+'/getProductos', []))
    );
  }  

  getDeConformidad(vempleado): Observable<any>{
    return this.http.get<any>(this.appSettings.restRRHH+'catalogo/firmantes/' + vempleado +'/27/firmantes')
    .pipe(
      catchError(this.handleError('catalogo/firmantes/' + vempleado +'/27/firmantes', []))
    );
  }  

  getAutorizador(vempleado): Observable<any>{
    return this.http.get<any>(this.appSettings.restRRHH+'catalogo/firmantes/' + vempleado +'/1/firmantes')
    .pipe(
      catchError(this.handleError('catalogo/firmantes/' + vempleado +'/1/firmantes', []))
    );
  }    

  /*getDependencias(): Observable<any>{
    return this.http.get<any>(this.appSettings.restApiServiceBaseUriv1+'Directorio/getDirectorio')
    .pipe(
      catchError(this.handleError('getDirectorio', []))
    );
  }*/

  obtieneArchivo(fileId): Observable<any>{
    return this.http.get<any>(this.appSettings.restApiFiles+'file/file/' + fileId)
    .pipe(
      catchError(this.handleError('file/file/' + fileId, []))
    );
  }    

  adjuntarArchivo(vJsonArchivo): Observable<any>{
    return this.http.post<any>(this.appSettings.restApiFiles+'file/upload',vJsonArchivo)
    .pipe(
      catchError(this.handleError('file/upload', []))
    );
  }
 


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      //new recursosVarios().showNotification('top','right',error.error.replace('</body>','<h3>Metodo '+operation.toString()+'</h3></body>'),4)
      new recursosVarios().showNotification('top','right','<h4>Error Metodo '+operation.toString()+'</h3>',4)
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
