import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MantenimientoFormComponent } from '../mantenimiento-form/mantenimiento-form.component';
import { Mantenimiento } from '../../interface/mantenimiento';
import { MantenimientoService } from '../../service/mantenimiento.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-mantenimiento-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MantenimientoFormComponent],
  templateUrl: './mantenimiento-list.component.html',
  styleUrl: './mantenimiento-list.component.scss'
})
export class MantenimientoListComponent implements OnInit {
  mantenimiento: Mantenimiento[] = [];
  mantenimientoSeleccionado: Mantenimiento | null = null;

  constructor(private mantenimientoService: MantenimientoService) {}

  ngOnInit(): void {
    this.readMantenimiento();
  }

  readMantenimiento(): void {
    this.mantenimientoService.findAllMantenimiento().subscribe(
      (data: Mantenimiento[]) => {
        this.mantenimiento = data;
      },
      (error) => {
        console.error('Error al obtener los mantenimientos', error);
      }
    );
  }

  openModal(): void {
    this.mantenimientoSeleccionado = null;
    const modalElement = document.getElementById('nuevoMantenimientoModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  updateMantenimiento(mantenimiento: Mantenimiento) {
  this.mantenimientoSeleccionado = { ...mantenimiento };
  const modalElement = document.getElementById('nuevoMantenimientoModal');
  if (modalElement) {
    const modal = new Modal(modalElement);
    modal.show();
  }
}

deleteMantenimiento(idMantenimiento: number) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará el registro de mantenimiento permanentemente',
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.mantenimientoService.deleteMantenimiento(idMantenimiento).subscribe(() => {
        Swal.fire('Eliminado', 'El registro de mantenimiento ha sido eliminado', 'success');
        this.readMantenimiento();
      });
    }
  });
}
}