import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { inject, signal } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterLink, FormsModule, CommonModule],
  selector: 'app-login.component',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = signal<string | null>(null);

  private authService = inject(AuthService);
  private router = inject(Router);

  onLogin(): void {
    this.errorMessage.set(null);
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        if (this.authService.hasRole('ROLE_ADMIN')) {
        this.router.navigate(['/admindashboard']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    },
      error: () => this.errorMessage.set('Invalid username or password!')
    });
  }
}
