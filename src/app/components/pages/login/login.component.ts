import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { inject, signal } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpErrorService } from '../../../core/services/http-error.service';
import { VALIDATION_MESSAGES } from '../../../core/constants/error-messages';

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
  isLoading = signal<boolean>(false);

  private authService = inject(AuthService);
  private errorService = inject(HttpErrorService);
  private router = inject(Router);

  isFormInvalid(): boolean {
    return !this.username.trim() || !this.password;
  }

  onLogin(): void {

    if (this.isFormInvalid()) {
      this.errorMessage.set(VALIDATION_MESSAGES.LOGIN_FIELDS_REQUIRED);
      return;
    }

    if (this.isLoading()) return;
    
    this.errorMessage.set(null);
    this.isLoading.set(true);

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        if (this.authService.hasRole('ROLE_ADMIN')) {
        this.router.navigate(['/admindashboard']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.errorMessage.set(this.errorService.parseError(err));
      }
    });
  }
}
