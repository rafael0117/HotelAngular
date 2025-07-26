import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Mantenimiento } from '../../interface/mantenimiento';
import { MantenimientoService } from '../../service/mantenimiento.service';
import { Cargo } from '../../enums/cargo';
import { NivelAcceso } from '../../enums/nivel-acceso';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mantenimiento-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './mantenimiento-form.component.html',
  styleUrl: './mantenimiento-form.component.scss'
})
export class MantenimientoFormComponent implements OnChanges {

  formMantenimiento: FormGroup;
  cargos: string[] = Object.values(Cargo);
  nivelesAcceso: string[] = Object.values(NivelAcceso);

  @Input() mantenimientoUpdate: Mantenimiento | null = null;
  @Output() mantenimientoCreate = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private mantenimientoService: MantenimientoService
  ) {
    this.formMantenimiento = this.fb.group({
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
    if (changes['mantenimientoUpdate'] && this.mantenimientoUpdate) {
      this.formMantenimiento.patchValue(this.mantenimientoUpdate);
    } else {
      this.formMantenimiento.reset();
    }
  }

  addMantenimiento(): void {
    if (this.formMantenimiento.invalid) return;

    if (this.mantenimientoUpdate) {
      // Modo edición
      this.mantenimientoService.updateMantenimiento(this.mantenimientoUpdate.id, this.formMantenimiento.value).subscribe(() => {
        Swal.fire('¡Actualizado!', 'El mantenimiento fue editado correctamente', 'success');
        this.mantenimientoCreate.emit();
        this.closeModal();
      });
    } else {
      // Modo creación
      this.mantenimientoService.createMantenimiento(this.formMantenimiento.value).subscribe(() => {
        Swal.fire('¡Registrado!', 'El nuevo mantenimiento ha sido registrado', 'success');
        this.mantenimientoCreate.emit();
        this.closeModal();
      });
    }
  }


  closeModal(): void {
    const modalElement = document.getElementById('nuevoMantenimientoModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      modal?.hide();
    }
    this.mantenimientoUpdate = null;
    this.formMantenimiento.reset();
  }
}
