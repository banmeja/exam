import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppconfigService } from '../../appconfig.service';
import { HttpClient } from '@angular/common/http';
import { recursosVarios } from '../../recursos/recursosVarios';


@Injectable({
  providedIn: 'root'
})
export class poaService {

  constructor(private http: HttpClient,private appSettings:AppconfigService) { }

  
  getSolicitudCantidad(vempleado): Observable<any>{
    return this.http.get<any>(this.appSettings.restpoa+'poa/getSolicitudesCantidadEstado/'+vempleado+'/getSolicitudesCantidadEstado')
    .pipe(
      catchError(this.handleError('poa/getSolicitudesCantidadEstado/'+vempleado+'/getSolicitudesCantidadEstado', []))
    );
  }

  getSolicitudId(vpoaid): Observable<any>{
    return this.http.get<any>(this.appSettings.restpoa+'poa/getSolicitudId/'+vpoaid+'/getSolicitudId')
    .pipe(
      catchError(this.handleError('poa/getSolicitudId/'+vpoaid+'/getSolicitudId', []))
    );
  }

  getSolicitudIdDetalle(vpoaid): Observable<any>{
    return this.http.get<any>(this.appSettings.restpoa+'poa/getSolicitudIdDetalle/'+vpoaid+'/getSolicitudIdDetalle')
    .pipe(
      catchError(this.handleError('poa/getSolicitudIdDetalle/'+vpoaid+'/getSolicitudIdDetalle', []))
    );
  }

  getpoaFiltro(vempleado, vfiltro ): Observable<any>{
    return this.http.get<any>(this.appSettings.restpoa+'poa/getSolicitudes/'+vempleado+'/'+vfiltro+'/getSolicitudes')
    .pipe(
      catchError(this.handleError('poa/getSolicitudes/'+vempleado+'/'+vfiltro+'/getSolicitudes', []))
    );
  }

  getpoaPendienteModificar(vempleado): Observable<any>{
    return this.http.get<any>(this.appSettings.restpoa+'poa/getpoaPendienteModificarRest/'+vempleado+'/getpoaPendienteModificarRest')
    .pipe(
      catchError(this.handleError('poa/getpoaPendienteModificarRest/'+vempleado+'/getpoaPendienteModificarRest', []))
    );
  }

  getpoaPendienteFirmar(vempleado): Observable<any>{
    return this.http.get<any>(this.appSettings.restpoa+'poa/getpoaPendienteFirmarRest/'+vempleado+'/getpoaPendienteFirmarRest')
    .pipe(
      catchError(this.handleError('poa/getpoaPendienteFirmarRest/'+vempleado+'/getpoaPendienteFirmarRest', []))
    );
  }

  getpoaEnTramite(vempleado): Observable<any>{
    return this.http.get<any>(this.appSettings.restpoa+'poa/getpoaEnTramiteRest/'+vempleado+'/getpoaEnTramiteRest')
    .pipe(
      catchError(this.handleError('poa/getpoaEnTramiteRest/'+vempleado+'/getpoaEnTramiteRest', []))
    );
  }

  getpoaProcesadas(vempleado): Observable<any>{
    return this.http.get<any>(this.appSettings.restpoa+'poa/getpoaProcesadasRest/'+vempleado+'/getpoaProcesadasRest')
    .pipe(
      catchError(this.handleError('poa/getpoaProcesadasRest/'+vempleado+'/getpoaProcesadasRest', []))
    );
  }
  
  getpoaAnuladas(vempleado): Observable<any>{
    return this.http.get<any>(this.appSettings.restpoa+'poa/getpoaAnuladasRest/'+vempleado+'/getpoaAnuladasRest')
    .pipe(
      catchError(this.handleError('poa/getpoaAnuladasRest/'+vempleado+'/getpoaAnuladasRest', []))
    );
  }

  getDatosAdicionales(vempleado): Observable<any>{
    return this.http.get<any>(this.appSettings.restRRHH+'catalogo/empleado/'+vempleado+'/sinfoto')
    .pipe(
      catchError(this.handleError('catalogo/empleado/'+vempleado+'/sinfoto', []))
    );
  }

  getCatalogospoa(vstatus, vcodigo, vcatalogo): Observable<any>{
    return this.http.get<any>(this.appSettings.restpoa+'poa/getCatalogosRest/'+vstatus+'/'+vcodigo+'/'+vcatalogo+'/getCatalogosRest')
    .pipe(
      catchError(this.handleError('poa/getCatalogosRest/'+vstatus+'/'+vcodigo+'/'+vcatalogo+'/getCatalogosRest', []))
    );
  }

  getProductos(vcadena, varea,idDependencia): Observable<any>{
    return this.http.get<any>(this.appSettings.restCompras+'compras/getProductos/'+vcadena+'/'+varea+'/'+idDependencia+'/getProductos')
    .pipe(
      catchError(this.handleError('compras/getProductos/'+vcadena+'/'+varea+'/'+idDependencia+'/getProductos', []))
    );
  }  

  getDeConformidad(vempleado): Observable<any>{
    return this.http.get<any>(this.appSettings.restRRHH+'catalogo/empleado/' + vempleado +'/autorizadorUnidad')
    .pipe(
      catchError(this.handleError('catalogo/empleado/' + vempleado +'/autorizadorUnidad', []))
    );
  }  
  
  getAutorizador(vempleado): Observable<any>{
    return this.http.get<any>(this.appSettings.restRRHH+'catalogo/empleado/' + vempleado +'/autorizadorUnidad')
    .pipe(
      catchError(this.handleError('catalogo/empleado/' + vempleado +'/autorizadorUnidad', []))
    );
  }    

  getCantidadPersonas(vdependencia): Observable<any>{
    return this.http.get<any>(this.appSettings.restRRHH+'catalogo/personasxDependencia/' + vdependencia +'/personasxDependencia')
    .pipe(
      catchError(this.handleError('catalogo/personasxDependencia/' + vdependencia +'/personasxDependencia', []))
    );
  }      

  enviarPoa(vJson): Observable<any>{
    return this.http.post<any>(this.appSettings.restpoa+'poa/InsPoa',vJson)
    .pipe(
      catchError(this.handleError('poa/InsPoa', []))
    );
  }

  editarPoa(vJson): Observable<any>{
    return this.http.post<any>(this.appSettings.restpoa+'poa/editarPoa',vJson)
    .pipe(
      catchError(this.handleError('poa/editarPoa', []))
    );
  }  

  upEstadoPOA(vJson): Observable<any>{
    return this.http.put<any>(this.appSettings.restpoa+'poa/upEstadoPOA',vJson)
    .pipe(
      catchError(this.handleError('poa/upEstadoPOA', []))
    );
  }  
  
  insFirmaPoa(firma): Observable<any>{
    return this.http.post<any>(this.appSettings.restpoa+'poa/insFirmaPoa',firma)
    .pipe(
      catchError(this.handleError('poa/insFirmaPoa', []))
    );
  }  

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
 
  insReporteSolicitud(objetoReporte): Observable<any>{
    return this.http.post<any>(this.appSettings.restOAUTH+'Reportes/insReporteSolicitud',objetoReporte)
    .pipe(
      catchError(this.handleError('insReporteSolicitud', []))
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
