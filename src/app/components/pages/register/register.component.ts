import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  imports: [RouterLink, FormsModule, CommonModule],
  selector: 'app-register.component',
  styleUrl: './register.component.css',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage = signal<string | null>(null);

  private authService = inject(AuthService);
  private router = inject(Router);

  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage.set('The two passwords do not match!');
      return;
    }

    this.errorMessage.set(null);
    this.authService.register({ username: this.username, password: this.password }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.errorMessage.set('This username is already in use. Please choose another one.')
    });
  }
}
