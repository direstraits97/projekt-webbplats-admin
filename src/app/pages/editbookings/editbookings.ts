import { Component, inject } from '@angular/core';
import { ManageUser } from '../../services/manage-user';

@Component({
  selector: 'app-editbookings',
  imports: [],
  templateUrl: './editbookings.html',
  styleUrl: './editbookings.scss',
})
export class Editbookings {
  manageUserService = inject(ManageUser);

  constructor() {
    this.manageUserService.controlAuth();
  }
}
