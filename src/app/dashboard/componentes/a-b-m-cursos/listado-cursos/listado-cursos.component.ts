import { Component } from '@angular/core';
import { cursosI } from '../../../../compartido/interfaces/cursos/curso';
import { MatDialog } from '@angular/material/dialog';
import { AgergarCursoComponent } from '../agergar-curso/agergar-curso.component';
import { CargarCursosService } from '../../../../core/servicios/cargar-cursos.service';
import { ServicioAlertaService } from '../../../../core/servicios/servicio-alerta.service';
import { HttpClient } from '@angular/common/http';


const listaCursos: cursosI[] = [

];


@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrl: './listado-cursos.component.scss'
})
export class ListadoCursosComponent {
  displayedColumns: string[] = ['idCurso', 'nombreCurso', 'inicio', 'finaliza', 'acciones'];
  dataSource = listaCursos;

  constructor(public dialog: MatDialog, private cursosServicio: CargarCursosService, private cursoServicio:CargarCursosService,
              private alertaMensaje:ServicioAlertaService)
  {
    this.consumirListaCursos()
  }

  consumirListaCursos(){
    this.cursosServicio.mostrarCursos().subscribe({
      next: (respuesta) => {this.dataSource = respuesta},
      error: (error) => {
        this.alertaMensaje.error("Error al cargar cursos")
      }
    })
  }

  crearDiaologNuevocurso(){
    this.dialog.open(AgergarCursoComponent)
    .afterClosed()
    .subscribe({
      next: (cursos) => { 
        if(cursos == undefined){return}
        this.cursoServicio.guardarNuevocurso(cursos).subscribe((resp) => this.consumirListaCursos());
        /* this.consumirListaCursos() */
      }
    });
  }

  editarCurso(curso:any){
    this.dialog.open(AgergarCursoComponent,  {
      data: curso,
    })
    .afterClosed().subscribe({
      next: (resultado) => {
        if(resultado){
          const cursoModificar = {...resultado, id:curso.id, idCurso:curso.idCurso};
          this.cursoServicio.editarCursiID(cursoModificar).subscribe({
            next: () => {
              this.consumirListaCursos();
            },
            error: (mensajeError) => {
              this.alertaMensaje.error("Error al modificar el curso")
            } 
          });
        }
      }
    })

  }


  eliminarCurso(curso:any){
  const id = curso.id;

  this.alertaMensaje.mostrarAlertaEliminar("Desas eliminar este curso?")
    .then( (confirm) => {
        if(confirm){
          this.cursoServicio.eliminarCurso(id).subscribe({
            next: () =>{this.consumirListaCursos()},
            error: (error) => {
              this.alertaMensaje.error("Error al eliminar el curso")
            }
          });
          
      }
    }
    )
  } 
}
