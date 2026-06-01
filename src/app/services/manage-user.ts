import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ManageUser {
  private http = inject(HttpClient);
  loginUrl: string = 'http://localhost:3000/api/login';
  authToken = signal(localStorage.getItem('admin_token') || '');
  router = inject(Router);
  authUrl: string = 'http://localhost:3000/api/protected';

  loginUser(data: any) {
    return this.http.post<LoginResponse>(this.loginUrl, data, {}).pipe(
      tap((response) => {
        this.authToken.set(response.response.token);
        localStorage.setItem('admin_token', response.response.token);
      }),
    );
  }
  logOutUser() {
    localStorage.removeItem('admin_token');
    this.router.navigate(['']);
  }
  async controlAuth() {
    return this.http
      .get<any>(this.authUrl, {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
      })
      .subscribe({
        next: () => {},
        error: () => {
          this.logOutUser();
        },
      });
  }
}
