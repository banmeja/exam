import { Injectable } from '@angular/core';
import { catchError } from '../../../node_modules/rxjs/operators';
import { Observable, of } from '../../../node_modules/rxjs';
import { AppconfigService } from '../appconfig.service';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { recursosVarios } from '../recursos/recursosVarios';

@Injectable({
  providedIn: 'root'
})
export class OficinavirtualService {

  constructor(private http: HttpClient,private appSettings:AppconfigService) { }

  
  validarPin (data): Observable<any>{
    return this.http.post<any>(this.appSettings.restRRHH+ 'catalogo/validapin', data )
    .pipe(
      catchError(this.handleError('validapin', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      new recursosVarios().showNotification('top','right','<h4>Error Metodo '+operation.toString()+'</h3>',4)
      return of(result as T);
    };
  }

}
