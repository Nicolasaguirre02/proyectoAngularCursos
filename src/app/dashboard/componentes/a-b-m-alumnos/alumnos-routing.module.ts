import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListadoAlumnosComponent } from './listado-alumnos/listado-alumnos.component';


const routes: Routes = [
  {
    path: '',
    component: ListadoAlumnosComponent
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AlumnosRoutingModule { }
