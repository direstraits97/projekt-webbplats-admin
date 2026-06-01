import { Component, inject } from '@angular/core';
import { ManageUser } from '../../services/manage-user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  manageUserService = inject(ManageUser);

  constructor() {
    this.manageUserService.controlAuth();
  }

  logOutUser() {
    this.manageUserService.logOutUser();
  }
}
