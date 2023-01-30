import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    //Aqui van todos los componentes del modulo
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    //Aqui los componentes que queremos visualizar fuera del modulo
    SidebarComponent
  ]
})
export class SharedModule { }
