import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AdministradorService } from '../../service/administrador.service';
import { CocineroService } from '../../service/cocinero.service';
import { Administrador } from '../../interface/administrador';
import { Cocinero } from '../../interface/cocinero';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  username: string | null = '';
  expiresAt: string | null = '';

  administradores: Administrador[] = [];
  cocineros: Cocinero[] = [];

  constructor(
    private adminService: AdministradorService,
    private cocineroService: CocineroService
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username');
    const expiresAtStorage = localStorage.getItem('expiresAt');
    if (expiresAtStorage) {
      const expiresDate = new Date(Number(expiresAtStorage));
      this.expiresAt = expiresDate.toLocaleString();
    }

    this.cargarAdministradores();
    this.cargarCocineros();
  }

  cargarAdministradores() {
    this.adminService.findAllAdministrador().subscribe({
      next: (data: Administrador[]) => this.administradores = data,
      error: (err) => this.handleError('administradores', err)
    });
  }

  cargarCocineros() {
    this.cocineroService.findAllCocinero().subscribe({
      next: (data: Cocinero[]) => this.cocineros = data,
      error: (err) => this.handleError('cocineros', err)
    });
  }

  private handleError(tipo: string, error: any) {
    console.error(`[Dashboard] Error al obtener ${tipo}`, error);
    if (error.status === 403) {
      alert(`Acceso denegado al obtener ${tipo}. Verifica tu token o permisos.`);
    }
  }
}
