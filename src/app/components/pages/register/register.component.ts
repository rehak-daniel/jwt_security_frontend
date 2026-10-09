import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../core/auth/services/auth.service';
import { VALIDATION_MESSAGES } from '../../../core/constants/error-messages';
import { HttpErrorService } from '../../../core/services/http-error.service';

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
  isLoading = signal<boolean>(false);

  private authService = inject(AuthService);
  private errorService = inject(HttpErrorService)
  private router = inject(Router);

  isFormInvalid(): boolean {
    return !this.username.trim() || !this.password.trim() || !this.confirmPassword;
  }

  onRegister(): void {

    if (this.isFormInvalid()) {
      this.errorMessage.set(VALIDATION_MESSAGES.FILL_ALL_FIELDS);
      return;
    }

    if (this.isLoading()) return;

    const cleanUsername = this.username.trim();

    if (!cleanUsername || cleanUsername.length < 3 || cleanUsername.length > 20) {
      this.errorMessage.set(VALIDATION_MESSAGES.USERNAME_SIZE);
      return;
    }

    if (!this.password || this.password.length < 6) {
      this.errorMessage.set(VALIDATION_MESSAGES.PASSWORD_SIZE);
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage.set(VALIDATION_MESSAGES.PASSWORDS_DONT_MATCH);
      return;
    }

    this.errorMessage.set(null);
    this.isLoading.set(true);

    this.authService.register({ username: cleanUsername, password: this.password }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.errorMessage.set(this.errorService.parseError(err));
      }
    });
  }
}
