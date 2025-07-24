import { Component, OnInit } from '@angular/core';
import { Administrador } from '../../interface/administrador';
import { AdministradorService } from '../../service/administrador.service';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdministradorFormComponent } from '../administrador-form/administrador-form.component';

@Component({
  selector: 'app-administrador-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdministradorFormComponent],
  templateUrl: './administrador-list.component.html',
  styleUrl: './administrador-list.component.scss'
})
export class AdministradorListComponent implements OnInit{
  administrador: Administrador[] = [];
  administradorSeleccionado: Administrador | null = null;

  constructor(private adminService:AdministradorService){}
  ngOnInit(): void {
    this.readAdmin();
  }

  readAdmin(){
    this.adminService.findAllAdministrador().subscribe(
      (data: Administrador[]) =>{
        this.administrador = data;
      },
      (error) =>{
        console.error('Error al obtener los administradores');
      }
    )
  }

  openModal(){
    this.administradorSeleccionado = null;
    const modalElement = document.getElementById('nuevoAdminModal');
    if(modalElement){
    const modal = new Modal(modalElement);
    modal.show();  
    }
  }
  updateAdmin(administrador:Administrador){
    this.administradorSeleccionado = { ...administrador};
    const modalElement = document.getElementById('nuevoAdminModal');
    if(modalElement){
      const modal = new Modal(modalElement);
      modal.show();
    }
  }
  deleteAdmin(idAdministrador:number){
    Swal.fire({
      title:'¿Estas seguro?',
      text:'Esta accion eliminara el administrador permanentemente',
      icon:"warning",
      showCancelButton:true,
      confirmButtonText:'Si,eliminar',
      cancelButtonText:'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.adminService.deleteAdministrador(idAdministrador).subscribe(()=>{
          Swal.fire('Eliminador','El bus ha sido eliminador','success');
          this.readAdmin();
        });
      }
    })

  }

}
