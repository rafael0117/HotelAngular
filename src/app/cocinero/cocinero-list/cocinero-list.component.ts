import { Component, OnInit } from '@angular/core';
import { Cocinero } from '../../interface/cocinero';
import { CocineroService } from '../../service/cocinero.service';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import { AdministradorFormComponent } from '../../administrador/administrador-form/administrador-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CocineroFormComponent } from "../cocinero-form/cocinero-form.component";

@Component({
  selector: 'app-cocinero-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,CocineroFormComponent],
  templateUrl: './cocinero-list.component.html',
  styleUrl: './cocinero-list.component.scss'
})

export class CocineroListComponent implements OnInit {
  cocineros: Cocinero[] = [];
  cocineroSeleccionado: Cocinero | null = null;

  constructor(private cocineroService: CocineroService) {}

  ngOnInit(): void {
    this.cargarCocineros();
  }

  cargarCocineros(): void {
    this.cocineroService.findAllCocinero().subscribe(
      (data: Cocinero[]) => {
        this.cocineros = data;
      },
      (error) => {
        console.error('Error al obtener los cocineros:', error);
      }
    );
  }

  abrirModal(): void {
    this.cocineroSeleccionado = null;
    const modalElement = document.getElementById('nuevoCocineroModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  editarCocinero(cocinero: Cocinero): void {
    this.cocineroSeleccionado = { ...cocinero };
    const modalElement = document.getElementById('nuevoCocineroModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  eliminarCocinero(idCocinero: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el cocinero permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cocineroService.deleteCocinero(idCocinero).subscribe(() => {
          Swal.fire('Eliminado', 'El cocinero ha sido eliminado.', 'success');
          this.cargarCocineros();
        });
      }
    });
  }
}