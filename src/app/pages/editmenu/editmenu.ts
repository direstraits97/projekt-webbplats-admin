/**Denna fil hanterar PUT-anrop för innehållet i menyn.
 * Av: Josefine Backlund
 */

import { Component, inject, signal } from '@angular/core';
import { ManageUser } from '../../services/manage-user';
import { MenuService } from '../../services/menuservice';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-editmenu',
  imports: [FormsModule, RouterLink],
  templateUrl: './editmenu.html',
  styleUrl: './editmenu.scss',
})
export class Editmenu {
  //Injectar services
  manageUserService = inject(ManageUser);
  menuService = inject(MenuService);
  //Properties för formulär och id
  id: string = '';
  type: string = '';
  putObjectName: string = '';
  putObjectCategory: string = '';
  putObjectDescription: string = '';
  putObjectPrice: string = '';
  router = inject(Router);
  //Behållare för felmeddelanden
  inputMessage = signal<boolean>(false);
  inputMessageDrink = signal<boolean>(false);

  constructor(private route: ActivatedRoute) {
    this.manageUserService.controlAuth();
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') || '';
      this.type = params.get('type') || '';
    });
  } //id efterfrågas som parameter.
  collectContentWithCategory(e: SubmitEvent): void {
    e.preventDefault();
    let collectedData = {
      name: this.putObjectName,
      category: this.putObjectCategory,
      description: this.putObjectDescription,
      price: this.putObjectPrice,
    };
    this.putDrink(collectedData);
  } //Precis som vid post-anropen i addtomenu finns det två olika funktioner som samlar data och sedan skickar vidare data till funktioner som använder service för put.
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
        if ((err.status = 400)) {
          this.inputMessageDrink.set(true);
        }
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
        if ((err.status = 400)) {
          this.inputMessage.set(true);
        }
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
        if ((err.status = 400)) {
          this.inputMessage.set(true);
        }
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
        if ((err.status = 400)) {
          this.inputMessage.set(true);
        }
      },
    });
  }
}
