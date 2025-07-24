import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cocinero } from '../../interface/cocinero';
import { Cargo } from '../../enums/cargo';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';
import { CocineroService } from '../../service/cocinero.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cocinero-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './cocinero-form.component.html',
  styleUrl: './cocinero-form.component.scss'
})
export class CocineroFormComponent implements OnChanges {

  formCocinero: FormGroup;

  @Input() cocineroUpdate: Cocinero | null = null;
  @Output() cocineroCreate = new EventEmitter<void>();

  cargos: string[] = Object.values(Cargo);

  constructor(private fb: FormBuilder, private cocineroService: CocineroService) {
    this.formCocinero = this.fb.group({
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: ['', Validators.required],
      salario: ['', Validators.required],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      cargos: [[], Validators.required],
      fechaIngreso: ['', Validators.required],
      especialidad: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cocineroUpdate'] && this.cocineroUpdate) {
      this.formCocinero.patchValue(this.cocineroUpdate);
    } else {
      this.formCocinero.reset();
    }
  }

  addCocinero() {
    if (this.formCocinero.invalid) return;

    if (this.cocineroUpdate) {
      this.cocineroService.updateCocinero(this.cocineroUpdate.id, this.formCocinero.value).subscribe(() => {
        Swal.fire('¡Actualizado!', 'El cocinero fue editado correctamente', 'success');
        this.cocineroCreate.emit();
        this.closeModal();
      });
    } else {
      this.cocineroService.createCocinero(this.formCocinero.value).subscribe(() => {
        Swal.fire('¡Registrado!', 'El nuevo Cocinero ha sido registrado', 'success');
        this.cocineroCreate.emit();
        this.closeModal();
      });
    }
  }

  closeModal() {
    const modalElement = document.getElementById('nuevoCocineroModal');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement);
      modal?.hide();
    }
    this.cocineroUpdate = null;
    this.formCocinero.reset();
  }
}
