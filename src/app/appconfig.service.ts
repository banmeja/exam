import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppconfigService {

  constructor() { }
  // //Desa
  // restApiServiceBaseUri= 'http://wsdesacit.oj.gob.gt:8080/oficinaVirtual/webapi/' // REST Api
  // pdfVierwer = 'http://frontendappcit.oj.gob.gt/viewer/viewer.html?file=' //Visor Pdf pruebas
  // restOAUTH = 'http://wsdesacit.oj.gob.gt:8080/OAUTH2/webapi/' //oauth
  // //restOAUTH = 'http://10.101.109.132:8080/OAUTH/webapi/' //oauth
  // restRRHH = 'http://servicioscit.oj.gob.gt:8080/rrhh/' //rrhh prod

  // //restRRHH = 'http://wsdesacit.oj.gob.gt:8080/rrhh/' //rrhh prod
  // restF56E = 'http://wsdesacit.oj.gob.gt:8080/rstF56e/webapi/' //F56-E local
  // restCompras = 'http://wsdesacit.oj.gob.gt:8080/rstCompras/webapi/' //F56-E prod
  // restApiFiles ='http://wsdesacit.oj.gob.gt:8080/files/'
  // //restpoa ='http://localhost:8080/rstPOA/webapi/'
  // restpoa='http://wsdesacit.oj.gob.gt:8080/rstPOA/webapi/'

//pruebas
//PROD-15/01/2019
  restApiServiceBaseUri= 'http://wsdesacit.oj.gob.gt:8080/oficinaVirtual/webapi/' // REST Api
  pdfVierwer = 'http://frontendappcit.oj.gob.gt/viewer/viewer.html?file=' //Visor Pdf pruebas
  restOAUTH = 'http://wsdesacit.oj.gob.gt:8080/OAUTH2/webapi/' //oauth
  restRRHH = 'http://servicioscit.oj.gob.gt:8080/rrhh/' //rrhh prod
  //restRRHH = 'http://wsdesacit.oj.gob.gt:8080/rrhh/' //rrhh prod
  restF56E = 'http://wsdesacit.oj.gob.gt:8080/rstF56e/webapi/' //F56-E local
  restCompras = 'http://localhost:8080/rstCompras/webapi/' //F56-E prod
  restApiFiles ='http://wsdesacit.oj.gob.gt:8080/files/'
  restpoa='http://localhost:8080/rstPOA/webapi/'
  




  sistemaId = 10  //id sistema  oauth  CITBASE2 16
  sistemaIdOAUTH = 2  //id sistema  oauth y de sistema files
  sistemaIdRRHH = 1


  Sistema: 'OFICINAVIRTUAL'
}
