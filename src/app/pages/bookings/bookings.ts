import { Component, inject } from '@angular/core';
import { ManageUser } from '../../services/manage-user';

@Component({
  selector: 'app-bookings',
  imports: [],
  templateUrl: './bookings.html',
  styleUrl: './bookings.scss',
})
export class Bookings {
  manageUserService = inject(ManageUser);

  constructor() {
    this.manageUserService.controlAuth();
  }
}
