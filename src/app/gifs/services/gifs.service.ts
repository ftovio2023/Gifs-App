import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShearchGifsResponse, Gif } from '../gifs-page/interface/gifs.interface';

//El bloque de codigo dentro de este decorador
//Permite que los servicios puedan estar definidos en el momento que se construye el bundle de la aplicacion
//Esto lo hace unico y de manera global en el root 
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '4h9L0TdKX79hqvuo3cYeaNhETii5qyMl';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  //Proiedad donde se guardaran los resultados de la consulara a la API
  //TODO cambiar any por su tipo
  public resultados: Gif[] = [];

  //Vamos a inyectar dentro del contructor el modulo http que importamos
  constructor( private http: HttpClient) {
    //Este constructor solo se ejecuta una sola vez
    //Por lo tanto es el lugar ideal para colocar el local stogague que nos muestre las busquedas anteriores
    if ( localStorage.getItem('historial') ) {
      //Aca pasams el string al objeto que era inicialmente
      //Aca daba un error porque puede que la respuesta sea nula, pero como nosotros estamos seguros que si hay respuesta
      //Osea que si hay historial le decimos a TS que confie en nosotros con !
      this._historial = JSON.parse( localStorage.getItem('historial')!) || [];



      //Hacemos lo mismp para las imagenes
      this.resultados = JSON.parse( localStorage.getItem('resultados')!) || [];
    }
  }

  //Todas la entradas que se colocan en el texbox deben ser guardda en alguna parte

  //Creamos la varible para almacenar los string
  

  get historial() {
    //Los ... es para romper la relacion al arreglo original privado
    return [...this._historial];

    //Para que corte y solo le muestre una parte del arreglo principal se hace lo siguiente
    //Si se deja aqui cada vez angular renderice se ejecutara este codigo
    // this._historial = this.historial.splice(0, 10);
  }

  //Para insertar valores a historial hacemos
  //Esto hay que llamarlo en el componente de busqueda
  //Porque hay es donde se tiene el valor que se ingresa
  //Esto hay que llamarlo dentro del componente de busqueda
  //Le dejamos un valor para obigar que tenga un valor para asegurarnos que funcione correctamente
  buscarGifs(query: string = '') {

    //Pasando todo a minusculas para que no tengamos problemas de repeticios
    //Como esto no se observa bien en minusculas se hizo uso de un pie para capitalizar el string
    //Esto se hizo en el propio html
    query = query.trim().toLocaleLowerCase();
    

    //Para que no tengamos valores repeditos se hace
    if ( !this._historial.includes( query )) {
      //Se inserta la propiedad al inicio con unshift
      //Luego de verficar que no exista con el operador ! de negacion
      this._historial.unshift( query );
    }

    //Despues de insertar se corta
    this._historial = this.historial.splice(0, 10);
    //console.log( this._historial );

    //Usamos el objeto locar storage que es propio de JS
    //Ademas usamos otro objeto llamado JSOn.stringi... que convierte cualquier objeto a string
    //Con esto estamos grabando la informacion en el local storague 
    //Ahora cuando recarguemos el navegador la informacion no se pierde
    //A esto se le llama serializar
    localStorage.setItem('historial', JSON.stringify( this.historial ));

    const params = new HttpParams()
          //Aqui lo hacemos mas legible como postman
          //Se lo pasamos a la peticion get del http
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);


    //Aqui dentro del get() se coloca el url que probamos que sirve con postman
    //Estas peticiones http retornan observable
    //Aqui usamos `` para poder mandar la interpolacion de estring y mandar el query entre ${}
    //El get como es de tipo generico se recomienda especificar el tipo hay
    //Usamos el http params
    this.http.get<ShearchGifsResponse>(`${ this.servicioUrl }/search`, { params: params})
    
    //Como TS esta infiriendo que respuesta es de tipo objec, esto no nos deja acceder a la data
    //Una forma facil es decriq que es de tipo any 
    //Esto es cuando sabemos que en la respuesta esta la data
      .subscribe( (resp ) => {
        console.log( resp.data )
        this.resultados = resp.data;
        //Aca vemos que ya podemos acceder a las propiedades con ayuda de inteligence
        //resp.data[0].images.downsized_medium.url;

        //Hagamos lo mismo pero ahora con las imagenes
        //Pero es despues de obtener la respuesta
        localStorage.setItem('resultados', JSON.stringify( this.resultados ));
      })
  }

  

}
