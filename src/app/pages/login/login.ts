/**
 * Denna fil hanterar inloggning av användaren samt felmeddelanden i UI.
 * Av: Josefine Backlund
 */

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ManageUser } from '../../services/manage-user';
import { Router } from '@angular/router';
import { signal } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  //Properties som kopplas till html med formsModule.
  username: string = '';
  password: string = '';
  //Injectar service samt router för omnavigering.
  private manageUserService = inject(ManageUser);
  private router = inject(Router);
  //Behållare för olika typer av felmeddelanden.
  inputMessage = signal<boolean>(false);
  errorMessage = signal<boolean>(false);
  serverErrorMessage = signal<boolean>(false);

  validateUser(e: SubmitEvent) {
    e.preventDefault();

    let user = {
      username: this.username,
      password: this.password,
    };

    if (user.username === '' || user.password === '') {
      this.inputMessage.set(true);
      this.errorMessage.set(false);
      this.serverErrorMessage.set(false);
    } else {
      this.loginUser(user);
    }
  } //Denna funktion validerar input och skickar vidare data om input finns.

  loginUser(user: any) {
    this.manageUserService.loginUser(user).subscribe({
      next: () => {
        this.router.navigate(['/home']); //Vid lyckat anrop skickas användaren till home.
      },
      error: (err: any) => {
        if (err.status >= 400 && err.status <= 499) {
          this.errorMessage.set(true);
          this.inputMessage.set(false);
          this.serverErrorMessage.set(false); //Vid felaktig input.
        }
        if (err.status >= 500) {
          this.serverErrorMessage.set(true);
          this.inputMessage.set(false);
          this.errorMessage.set(false); //Vid server-problem.
        }
      },
    });
  }
}
