import { Component, inject } from '@angular/core';
import { ManageUser } from '../../services/manage-user';

@Component({
  selector: 'app-editmenu',
  imports: [],
  templateUrl: './editmenu.html',
  styleUrl: './editmenu.scss',
})
export class Editmenu {
  manageUserService = inject(ManageUser);

  constructor() {
    this.manageUserService.controlAuth();
  }
}
