import { Component, inject } from '@angular/core';
import {Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.component.css',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  public router = inject(Router);

  isRegisterPage(): boolean {
    return this.router.url === '/register';
  }

  isSignInPage(): boolean {
    return this.router.url === '/login';
  }
}
