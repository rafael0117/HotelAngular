import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';
  constructor(private router : Router, private authService: AuthService) {}

  login() {
  const credentials = {
    usuario: this.usuario, // <-- Cambiado de 'username' a 'usuario'
    password: this.password
  };

  this.authService.login(credentials).subscribe({
    next: (response) => {
      console.log('Respuesta del servidor:', response);

      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.username);
      localStorage.setItem('cargos', JSON.stringify(response.cargos));
      localStorage.setItem('expirateAt', response.expirateAt.toString());

      this.router.navigate(['/dashboard']);
    },
    error: (error) => {
      console.error('Error al iniciar sesión', error);
      alert('Credenciales incorrectas o error del servidor');
    }
  });
}


  

}