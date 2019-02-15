import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { AppconfigService } from '../../appconfig.service';
import { Observable, of } from '../../../../node_modules/rxjs';
import { catchError } from '../../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient,private appSettings:AppconfigService) { }

  getParametros(idReporte): Observable<any>{
    return this.http.get<any>(this.appSettings.restOAUTH+'Reportes/Reporte/'+idReporte+'/getParametrosReporte')
    .pipe(
      catchError(this.handleError('getParametros', []))
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
      console.log('xx error xx', error.message)
      
      return of(result as T);
    };
  }
  private getURL(urlServer,Servicio){
    return urlServer+Servicio;
  }
}
