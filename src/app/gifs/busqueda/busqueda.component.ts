import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {
  

  //Inicialmente el ElemetRef estaba sin tipo, porque era un generico
  //Pero sele paso el tipo que es HTLM
  //Con esto ya tenemos ayuda del inteligence de angular
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  //Para ocupar el servicio usamos inyectable en el contructor
  //Con esto se tiene acceso a todas las propiedades y metodos del servicio
  constructor( private gifsService: GifsService) {

  }


  buscar() {
    //Para ver de que tipo es el evento podemos pasarlo por el console.log
    //Al ejecutarlo vemos que es de tipo
    //KeyboardEvent
    //console.log(event);

    //La ayuda del inteligence salio aca
    const valor = this.txtBuscar.nativeElement.value;

    //No dejar q guarde espacios vacios
    //Esto se podia hacer del lado del servicio
    if ( valor.trim().length === 0) {
      return;
    }

    //Aca tambien podemos ver el tipo
    //console.log( valor );

    //Aca le mandamos el valor al metodo del servicio
    this.gifsService.buscarGifs( valor );

    //Asi colocamos la caja de texto vacia despues de presionar enter
    this.txtBuscar.nativeElement.value = '';

    //Con esto agarramos la caja de texto
    //Tenemos acceso a todo el html
    //Lo podemos manipular a nuestro antojo
    //Cosa que antes solo teniamos acceso al valor



    //Ahora debemos borrar la inforamcion de la caja de texto
  }

}
