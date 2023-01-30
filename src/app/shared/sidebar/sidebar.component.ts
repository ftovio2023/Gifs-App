import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  //Con eso buscamos el historial en el servicio
  //historial() Es una clase del sidebarcomponent 
  //this.gifsService.historial es una propiedad del servicio
  get historial() {
    return this.gifsService.historial;
  }

  //Inyectamos el servicio en el contructor
  constructor(private gifsService: GifsService) {}

  buscar( termino: string) {
    this.gifsService.buscarGifs ( termino );
  }



}
