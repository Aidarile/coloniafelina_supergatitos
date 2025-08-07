import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.auth.estaAutenticado()) {
      this.router.navigate(['/admin']);
    }
  }

  onSubmit() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        this.auth.guardarToken(res.access_token);
        this.mostrarToast('Sesión iniciada correctamente');
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.error = true;
      }
    });
  }

  mostrarToast(mensaje: string) {
    const toastEl = document.getElementById('globalToast');
    const body = document.getElementById('toastBody');
    if (toastEl && body) {
      body.textContent = mensaje;
      const toast = new bootstrap.Toast(toastEl, {
        autohide: true,
        delay: 3000, // <-- 3 segundos de duración
      });
  
      toast.show();
    }
  }
  
}
