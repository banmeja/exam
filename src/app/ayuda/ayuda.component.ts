import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.scss']
})
export class AyudaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  abrir(){
    window.open('./assets/multimedia/GUIA_PME.pdf', '_blank');
  }

}
