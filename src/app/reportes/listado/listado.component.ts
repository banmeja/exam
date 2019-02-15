import { Component, OnInit, Input, AfterViewInit, Inject, LOCALE_ID, ViewChild } from '@angular/core'; 
import { AuthService } from '../../recursos/auth.service';
import { ReportesService } from './reportes.service';
import { AppconfigService } from '../../appconfig.service';
import {  FormControl, FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { Observable, BehaviorSubject } from '../../../../node_modules/rxjs';
import { startWith, map } from '../../../../node_modules/rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatMenuTrigger } from '../../../../node_modules/@angular/material';
import {MomentDateAdapter, MAT_MOMENT_DATE_FORMATS} from '@angular/material-moment-adapter';
import { DatePipe } from '../../../../node_modules/@angular/common';

declare const $: any;

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
  providers: [
    DatePipe,
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class ListadoComponent implements OnInit, AfterViewInit {
  private reportes;
  parmas:any=null;
  carga=false;
  dt;
  private intervalUpdate: any = null;
  myControl = new FormControl();
  filteredOptions: Observable<any[]>;
  constantes;
  constructor(private authService:AuthService,
              private appSettings:AppconfigService,
              private datePipe : DatePipe,
              private formBuilder: FormBuilder,
              private reporteService:ReportesService) {
                this.constantes=this.authService.getsession().CONSTANTES
                console.log(this.constantes)
                this.reportes=this.authService.getsession().SESSION.MENU_REPORTES
   }

  ngAfterViewInit(){
    
  }

  getRerpotes(): Observable<any>{
    return this.reportes;
  }
  
  borrar(){
    this.myControl.setValue('');
    this.parmas=null;
  }


  ngOnInit() {
    this.filtro();
  }

  filtro(){
    this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    if(value==''){
        this.parmas=null;
    }
    return this.reportes.filter(option => option.ABREVIACION.toLowerCase().indexOf(filterValue) === 0);
  }


  private idReporte=-1;
  prb:any;
  reporteSeleccionado(evt: any,x){
    if(evt!=undefined){
      if (evt.source.selected) {
        //console.log('id ',x)
        this.parmas=undefined
        this.idReporte=x;
        this.carga=true;
        this.start();//inicia progress bar
        this.reporteService.getParametros(x).subscribe(
          data => {
              this.parmas=data;
              this.carga=false;
          });
     }
    }        
  }

  
  @ViewChild('triggerCart') trigger: MatMenuTrigger;
  cerraMenu(){
    this.trigger.closeMenu();
  }

  private color='accent';
  valcolor=0;
  start(){
        const type = ['primary','warn', 'accent'];
        this.intervalUpdate = setInterval(function(){
            this.color=type[this.valcolor];
            this.valcolor++;
            if(this.valcolor==3){
                this.valcolor=0;
            }
            if(!this.carga){
                clearInterval(this.intervalUpdate)
            }
        }.bind(this), 1000);
      
  }


  parseDate(dateString: any): any {
    if (dateString) {
        return this.datePipe.transform(dateString._d, 'dd/MM/yyyy')
    } else {
        return null;
    }
  }


  grabarParametrosPDF(){
    console.log(this.parmas)
      let objetoReporte:any ={};
      objetoReporte.PARAMETROS =this.parmas;
      objetoReporte.ID_REPORTE = this.idReporte;
      objetoReporte.ID_USUARIO_REGISTRO = this.authService.getsession().SESSION.ID_USUARIO;
      //console.log(objetoReporte)
      this.reporteService.insReporteSolicitud(objetoReporte).subscribe(
        data => {
            //console.log(data.id)
            window.open(this.appSettings.restOAUTH + 'Reportes/solicitudReporte/' + data.id + '/generarReportePDF', '_blank');
       });
  }

  grabarParametrosExcel(){
    let objetoReporte:any ={};
    objetoReporte.PARAMETROS =this.parmas;
    objetoReporte.ID_REPORTE = this.idReporte;
    objetoReporte.ID_USUARIO_REGISTRO = this.authService.getsession().SESSION.ID_USUARIO;
    //console.log(objetoReporte)
    this.reporteService.insReporteSolicitud(objetoReporte).subscribe(
      data => {
          //console.log(data.id)
          window.open(this.appSettings.restOAUTH + 'Reportes/solicitudReporte/' + data.id + '/generarReporteExcel', '_blank');
     });
  }

  grabarParametrosWord(){
    let objetoReporte:any ={};
    objetoReporte.PARAMETROS =this.parmas;
    objetoReporte.ID_REPORTE = this.idReporte;
    objetoReporte.ID_USUARIO_REGISTRO = this.authService.getsession().SESSION.ID_USUARIO;
    //console.log(objetoReporte)
    this.reporteService.insReporteSolicitud(objetoReporte).subscribe(
      data => {
          //console.log(data.id)
          window.open(this.appSettings.restOAUTH + 'Reportes/solicitudReporte/' + data.id + '/generarReporteWord', '_blank');
     });
  }

  /*ng2 select */
  private items:Array<any> = [];
  public value:any = {};
  public _disabledV:string = '0';
  public disabled:boolean = false;

  public get disabledV():string {
    return this._disabledV;
  }

  public set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(x,value:any):void {
    x.VALOR=value.id;
    console.log('Selected value is: ', x);
  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }

  public typed(value:any):void {
    console.log('New search input: ', value);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }
  /* Fin ng2 select */
}



/*
export class ListadoComponent implements OnInit, AfterViewInit {
  private gridApi;
  private gridColumnApi;
  banderaOcultar=true;
  private context;  
  private frameworkComponents;
  private reportes;
  constructor(private authService:AuthService) {
    this.reportes=this.authService.getsession().SESSION.MENU_REPORTES
    console.log(this.reportes)
   }

  ngAfterViewInit(){
    
  }

  ngOnInit() {
    
  }

  columnDefs = [
    {headerName: '#', field: 'id',suppressMenu:true, width: 500,suppressSizeToFit: false},
    {headerName: 'Nombre Reporte', field: 'nombre', suppressMenu:false,width: 500,suppressSizeToFit: false},
    {headerName: 'Descripción del Reporte', field: 'descripcion', suppressMenu:true,width: 500,suppressSizeToFit: false},
    //{headerName: "Child/Parent0", field: 'value',colId: "params",cellRenderer: "childMessageRenderer",autoHeight: true,width: 100,suppressFilter: true,suppressSizeToFit: false},
    /*{
      headerName: "Child/Parent",
      field: "value",
      cellRenderer: "childMessageRenderer",
      colId: "params",
      width: 180,
      autoHeight: true
    },
    {
        headerName: "Child/Parent2",
        field: "value",
        cellRenderer: "childMessageRenderer",
        colId: "params",
        width: 180,
        autoHeight: true,
        suppressFilter: true,
        suppressSizeToFit: false
      }
    ];
  
    onGridReady(params) { 
  
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      
      
      this.authService.getsession().SESSION.MENU_REPORTES.forEach(element => {
        this.gridApi.updateRowData({ add: [{ id: element.ORDEN, nombre: element.ABREVIACION, descripcion: element.TOOLTIP}] });  
      });
      params.api.sizeColumnsToFit();
      this.autoSizeAll()
      this.sizeToFit()
  
      params.api.sizeColumnsToFit();
      window.addEventListener("resize", function() {
        setTimeout(function() {
          params.api.sizeColumnsToFit();
        });
      });
      
      
    }
  
    methodFromParent(cell) {
      alert("Parent Component Method from " + cell + "!");
    }
  
    autoSizeAll() {
      var allColumnIds = [];
      this.gridColumnApi.getAllColumns().forEach(function(column) {
        allColumnIds.push(column.colId);
      });
      this.gridColumnApi.autoSizeColumns(allColumnIds);
    }
  
    
  
    sizeToFit() {
      this.gridApi.sizeColumnsToFit();
    }
  
    private rowData: any[]=new Array();
  
  getPersonFilter() {
    function PersonFilter() {
    }
  
    PersonFilter.prototype.init = function (params) {
        this.valueGetter = params.valueGetter;
        this.filterText = null;
        this.setupGui(params);
    };
  
    // not called by ag-Grid, just for us to help setup
    PersonFilter.prototype.setupGui = function (params) {
        this.gui = document.createElement('div');
        this.gui.innerHTML =
            '<div style="padding: 4px;">' +
            '<div style="font-weight: bold;">Custom Athlete Filter</div>' +
            '<div><input style="margin: 4px 0px 4px 0px;" type="text" id="filterText" placeholder="Full name search..."/></div>' +
            '<div style="margin-top: 20px; width: 200px;">This filter does partial word search on multiple words, eg "mich phel" still brings back Michael Phelps.</div>' +
            '</div>';
  
        this.eFilterText = this.gui.querySelector('#filterText');
        this.eFilterText.addEventListener("changed", listener);
        this.eFilterText.addEventListener("paste", listener);
        this.eFilterText.addEventListener("input", listener);
        // IE doesn't fire changed for special keys (eg delete, backspace), so need to
        // listen for this further ones
        this.eFilterText.addEventListener("keydown", listener);
        this.eFilterText.addEventListener("keyup", listener);
  
        var that = this;
  
        function listener(event) {
            that.filterText = event.target.value;
            params.filterChangedCallback();
        }
    };
  
    PersonFilter.prototype.getGui = function () {
        return this.gui;
    };
  
    PersonFilter.prototype.doesFilterPass = function (params) {
        // make sure each word passes separately, ie search for firstname, lastname
        var passed = true;
        var valueGetter = this.valueGetter;
        this.filterText.toLowerCase().split(" ").forEach(function (filterWord) {
            var value = valueGetter(params);
            if (value.toString().toLowerCase().indexOf(filterWord) < 0) {
                passed = false;
            }
        });
  
        return passed;
    };
  
    PersonFilter.prototype.isFilterActive = function () {
        var isActive = this.filterText !== null && this.filterText !== undefined && this.filterText !== '';
        return isActive;
    };
  
    PersonFilter.prototype.getApi = function () {
        var that = this;
        return {
            getModel: function () {
                var model = {value: that.filterText.value};
                return model;
            },
            setModel: function (model) {
                that.eFilterText.value = model.value;
            }
        }
    };
  
    PersonFilter.prototype.getModelAsString = function (model){
        return model ? model : '';
    };
  
    PersonFilter.prototype.getModel = function () {
        return this.filterText;
    };
    // lazy, the example doesn't use setModel()
    PersonFilter.prototype.setModel = function () {};
  
    return PersonFilter;
  }
  
  }
  

*/