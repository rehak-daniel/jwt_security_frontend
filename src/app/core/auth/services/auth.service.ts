import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { jwtDecode } from "jwt-decode";

export interface AuthRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface JwtPayload {
  sub: string;
  roles?: string[];
  authorities?: string[];
  iat?: number;
  exp?: number;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/user';

    public isLoggedIn = signal(this.hasToken());

    constructor(private http: HttpClient) {}

    login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('jwt_token', response.token);
          this.isLoggedIn.set(true);
        }
      })
    );
  }

  register(credentials: AuthRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, credentials);
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    this.isLoggedIn.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }


  getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log('Decoded token:', decoded);
      return decoded.roles || decoded.authorities || [];
    } catch (e) {
      console.error('Token decoding error:', e);
      return [];
    }
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }
}
