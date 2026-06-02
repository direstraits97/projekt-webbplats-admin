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
  username: string = '';
  password: string = '';
  manageUserService = inject(ManageUser);
  private router = inject(Router);
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
  }

  loginUser(user: any) {
    this.manageUserService.loginUser(user).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        if (err.status >= 400 && err.status <= 499) {
          this.errorMessage.set(true);
          this.inputMessage.set(false);
          this.serverErrorMessage.set(false);
        }
        if (err.status >= 500) {
          this.serverErrorMessage.set(true);
          this.inputMessage.set(false);
          this.errorMessage.set(false);
        }
      },
    });
  }
}
