import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Administrador } from '../../interface/administrador';
import { AdministradorService } from '../../service/administrador.service';
import { Cargo } from '../../enums/cargo';
import { NivelAcceso } from '../../enums/nivel-acceso';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administrador-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './administrador-form.component.html',
  styleUrl: './administrador-form.component.scss'
})
export class AdministradorFormComponent implements OnChanges {

  formAdministrador: FormGroup;
  cargos: string[] = Object.values(Cargo);
  nivelesAcceso: string[] = Object.values(NivelAcceso);

  @Input() administradorUpdate: Administrador | null = null;
  @Output() administradorCreate = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private administradorService: AdministradorService
  ) {
    this.formAdministrador = this.fb.group({
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: ['', Validators.required],
      salario: ['', Validators.required],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      cargos: [[], Validators.required],
      fechaIngreso: ['', Validators.required],
      nivelAcceso: ['', Validators.required]
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['administradorUpdate'] && this.administradorUpdate) {
      this.formAdministrador.patchValue(this.administradorUpdate);
    } else {
      this.formAdministrador.reset();
    }
  }

  addAdmin(): void {
    if (this.formAdministrador.invalid) return;

    if (this.administradorUpdate) {
      // Modo edición
      this.administradorService.updateAdministrador(this.administradorUpdate.id, this.formAdministrador.value).subscribe(() => {
        Swal.fire('¡Actualizado!', 'El administrador fue editado correctamente', 'success');
        this.administradorCreate.emit();
        this.closeModal();
      });
    } else {
      // Modo creación
      this.administradorService.createAdministrador(this.formAdministrador.value).subscribe(() => {
        Swal.fire('¡Registrado!', 'El nuevo Administrador ha sido registrado', 'success');
        this.administradorCreate.emit(); // ← faltaba ejecutar la función
        this.closeModal();
      });
    }
  }

  closeModal(): void {
    const modalElement = document.getElementById('nuevoAdminModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      modal?.hide();
    }
    this.administradorUpdate = null;
    this.formAdministrador.reset();
  }
}
