import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  data : any= [];

  constructor() { }

  get(){
    return this.data;
  }

  set(info){
    this.data=info
  }

}
