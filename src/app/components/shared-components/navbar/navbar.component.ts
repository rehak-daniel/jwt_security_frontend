import { Component, inject, computed } from '@angular/core';
import {Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';


@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.component.css',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  public router = inject(Router);
  private authService = inject(AuthService);

  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  isRegisterPage = computed(() => this.currentUrl() === '/register');
  isSignInPage = computed(() => this.currentUrl() === '/login');

  isLoggedIn = computed(() => this.authService.isLoggedIn());

  onLogout() {
    this.authService.logout();
  }
}
