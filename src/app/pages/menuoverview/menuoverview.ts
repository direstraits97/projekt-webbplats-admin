import { Component, effect, inject, signal } from '@angular/core';
import { MenuService } from '../../services/menuservice';
import { Router, RouterLink } from '@angular/router';
import { ManageUser } from '../../services/manage-user';

@Component({
  selector: 'app-menuoverview',
  imports: [RouterLink],
  templateUrl: './menuoverview.html',
  styleUrl: './menuoverview.scss',
})
export class Menuoverview {
  menuService = inject(MenuService);
  manageUserService = inject(ManageUser);
  router = inject(Router);
  drinks = this.menuService.getDrink();
  appetizers = this.menuService.getAppetizer();
  mainCourses = this.menuService.getMainCourse();
  desserts = this.menuService.getDessert();
  manipulatedDrinks = signal<any>([]);
  manipulatedAppetizers = signal<any>([]);
  manipulatedMainCourses = signal<any>([]);
  manipulatedDesserts = signal<any>([]);

  constructor() {
    this.manageUserService.controlAuth();
    effect(() => {
      this.manipulatedDrinks.set(this.drinks());
      this.manipulatedAppetizers.set(this.appetizers());
      this.manipulatedMainCourses.set(this.mainCourses());
      this.manipulatedDesserts.set(this.desserts());
    });
  }
  deleteDrink(id: string) {
    this.menuService.deleteDrink(id).subscribe({
      next: (response) => {
        this.manipulatedDrinks.set(response);
      },
      error: () => {},
    });
  }
  deleteAppetizer(id: string) {
    this.menuService.deleteAppetizer(id).subscribe({
      next: (response) => {
        this.manipulatedAppetizers.set(response);
      },
      error: () => {},
    });
  }
  deleteMainCourse(id: string) {
    this.menuService.deleteMainCourse(id).subscribe({
      next: (response) => {
        this.manipulatedMainCourses.set(response);
      },
      error: () => {},
    });
  }
  deleteDessert(id: string) {
    this.menuService.deleteDessert(id).subscribe({
      next: (response) => {
        this.manipulatedDesserts.set(response);
      },
      error: () => {},
    });
  }
}
