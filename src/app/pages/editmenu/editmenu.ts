import { Component, inject } from '@angular/core';
import { ManageUser } from '../../services/manage-user';
import { MenuService } from '../../services/menuservice';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-editmenu',
  imports: [FormsModule],
  templateUrl: './editmenu.html',
  styleUrl: './editmenu.scss',
})
export class Editmenu {
  manageUserService = inject(ManageUser);
  menuService = inject(MenuService);
  id: string = '';
  type: string = '';
  putObjectName: string = '';
  putObjectCategory: string = '';
  putObjectDescription: string = '';
  putObjectPrice: string = '';
  router = inject(Router);

  constructor(private route: ActivatedRoute) {
    this.manageUserService.controlAuth();
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') || '';
      this.type = params.get('type') || '';
      console.log(this.id);
    });
  }
  collectContentWithCategory(e: SubmitEvent): void {
    e.preventDefault();
    let collectedData = {
      name: this.putObjectName,
      category: this.putObjectCategory,
      description: this.putObjectDescription,
      price: this.putObjectPrice,
    };
    this.putDrink(collectedData);
  }
  collectContent(e: SubmitEvent): void {
    e.preventDefault();
    let collectedData = {
      name: this.putObjectName,
      description: this.putObjectDescription,
      price: this.putObjectPrice,
    };
    if (this.type === 'appetizer') {
      this.putAppetizer(collectedData);
    }
    if (this.type === 'main_course') {
      this.putMainCourse(collectedData);
    }
    if (this.type === 'dessert') {
      this.putDessert(collectedData);
    }
    if (this.type === 'drink') {
      this.collectContentWithCategory(e);
    }
  }

  async putDrink(data: object) {
    this.menuService.putDrink(this.id, data).subscribe({
      next: () => {
        this.router.navigate(['/menuoverview']);
      },
      error: (err: any) => {
        if (err.status > 400 && err.status <= 499) {
          this.manageUserService.logOutUser();
        }
        console.log(err);
      },
    });
  }
  async putAppetizer(data: object) {
    this.menuService.putAppetizer(this.id, data).subscribe({
      next: () => {
        this.router.navigate(['/menuoverview']);
      },
      error: (err: any) => {
        if (err.status > 400 && err.status <= 499) {
          this.manageUserService.logOutUser();
        }
        console.log(err);
      },
    });
  }
  async putMainCourse(data: object) {
    this.menuService.putMainCourse(this.id, data).subscribe({
      next: () => {
        this.router.navigate(['/menuoverview']);
      },
      error: (err: any) => {
        if (err.status > 400 && err.status <= 499) {
          this.manageUserService.logOutUser();
        }
        console.log(err);
      },
    });
  }
  async putDessert(data: object) {
    this.menuService.putDessert(this.id, data).subscribe({
      next: () => {
        this.router.navigate(['/menuoverview']);
      },
      error: (err: any) => {
        if (err.status > 400 && err.status <= 499) {
          this.manageUserService.logOutUser();
        }
        console.log(err);
      },
    });
  }
}
