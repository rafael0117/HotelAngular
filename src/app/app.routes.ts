import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdministradorListComponent } from './administrador/administrador-list/administrador-list.component';
import { CocineroListComponent } from './cocinero/cocinero-list/cocinero-list.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { MantenimientoListComponent } from './mantenimiento/mantenimiento-list/mantenimiento-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'listar-administradores', pathMatch: 'full' },
      { path: 'listar-administradores', component: AdministradorListComponent },
      { path: 'listar-cocineros', component: CocineroListComponent },
      { path: 'listar-mantenimiento', component: MantenimientoListComponent }

    ]
  },
  { path: '**', redirectTo: 'login' }
];
