/**
 * Denna fil hanterar in- och utloggning samt validerar autentisering med get-anrop på skyddade undersidor.
 * Av: Josefine Backlund
 */

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
  router = inject(Router);
  authUrl: string = 'http://localhost:3000/api/protected';

  loginUser(data: any) {
    return this.http.post<LoginResponse>(this.loginUrl, data, {}).pipe(
      tap((response) => {
        localStorage.setItem('admin_token', response.response.token);
      }),
    );
  } //Post-anrop som tar emot token och lagrar den genom att uppdatera en signal med värdet. Ett interface är nödvändigt för att komma åt token.
  logOutUser() {
    localStorage.removeItem('admin_token');
    this.router.navigate(['']); //Token förstörs och användaren omdirigeras till startsidan.
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
  } //Ett get-anrop till en skyddad route som validerar token. Vid ej lyckat anrop loggas användaren ut.
}
