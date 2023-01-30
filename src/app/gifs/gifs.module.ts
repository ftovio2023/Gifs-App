import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulo para peticiones HTTP
import { HttpClientModule } from "@angular/common/http";
import { GifsPageComponent } from './gifs-page/gifs-page.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ResultadoComponent } from './resultado/resultado.component';



@NgModule({
  declarations: [
    GifsPageComponent,
    BusquedaComponent,
    ResultadoComponent
  ],
  exports: [
    GifsPageComponent
  ],
  imports: [
    CommonModule,
    //Ofrece un montos de servicios inclusive algo que puedo
    //Inyectar dentro de mi servicio
    HttpClientModule
  ]
})
export class GifsModule { }
