import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../services/menuservice';
import { ManageUser } from '../../services/manage-user';

@Component({
  selector: 'app-addtomenu',
  imports: [FormsModule],
  templateUrl: './addtomenu.html',
  styleUrl: './addtomenu.scss',
})
export class Addtomenu {
  newObjectName: string = '';
  newObjectCategory: string = '';
  newObjectDescription: string = '';
  newObjectPrice: string = '';
  type: string = '';
  private menuService = inject(MenuService);
  manageUserService = inject(ManageUser);

  constructor() {
    this.manageUserService.controlAuth();
  }

  collectContentWithCategory(e: SubmitEvent): void {
    e.preventDefault();
    let collectedData = {
      name: this.newObjectName,
      category: this.newObjectCategory,
      description: this.newObjectDescription,
      price: this.newObjectPrice,
    };
    this.addDrink(collectedData);
  }
  collectContent(e: SubmitEvent): void {
    e.preventDefault();
    let collectedData = {
      name: this.newObjectName,
      description: this.newObjectDescription,
      price: this.newObjectPrice,
    };
    if (this.type === 'appetizers') {
      this.addAppetizer(collectedData);
    }
    if (this.type === 'main_courses') {
      this.addMainCourse(collectedData);
    }
    if (this.type === 'desserts') {
      this.addDessert(collectedData);
    }
    if (this.type === 'drinks') {
      this.collectContentWithCategory(e);
    }
  }

  async addDrink(data: object) {
    this.menuService.postDrink(data).subscribe({
      next: () => {},
      error: (err: any) => {
        if (err.status > 400 && err.status <= 499) {
          this.manageUserService.logOutUser();
        }
        console.log(err);
      },
    });
  }
  async addAppetizer(data: object) {
    this.menuService.postAppetizer(data).subscribe({
      next: () => {},
      error: (err: any) => {
        if (err.status > 400 && err.status <= 499) {
          this.manageUserService.logOutUser();
        }
        console.log(err);
      },
    });
  }
  async addMainCourse(data: object) {
    this.menuService.postMainCourse(data).subscribe({
      next: () => {},
      error: (err: any) => {
        if (err.status > 400 && err.status <= 499) {
          this.manageUserService.logOutUser();
        }
        console.log(err);
      },
    });
  }
  async addDessert(data: object) {
    this.menuService.postDessert(data).subscribe({
      next: () => {},
      error: (err: any) => {
        if (err.status > 400 && err.status <= 499) {
          this.manageUserService.logOutUser();
        }
        console.log(err);
      },
    });
  }
}
