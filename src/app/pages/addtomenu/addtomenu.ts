/**
 * Denna fil kör POST-anrop till tabellerna i menyn.
 * Av: Josefine Backlund.
 */

import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../services/menuservice';
import { ManageUser } from '../../services/manage-user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-addtomenu',
  imports: [FormsModule, RouterLink],
  templateUrl: './addtomenu.html',
  styleUrl: './addtomenu.scss',
})
export class Addtomenu {
  newObjectName: string = '';
  newObjectCategory: string = '';
  newObjectDescription: string = '';
  newObjectPrice: string = '';
  type: string = '';
  //Properties ovan är kopplad till html-filen med formsModule.
  private menuService = inject(MenuService);
  private manageUserService = inject(ManageUser);
  //Injectar services för att nyttja dess metoder.
  inputMessage = signal<boolean>(false);
  inputMessageDrink = signal<boolean>(false);
  typeMessage = signal<boolean>(false);
  //Behållare som dyker upp i html vid olika fel.

  constructor() {
    this.manageUserService.controlAuth(); //Validerar användare.
  }

  collectContentWithCategory(e: SubmitEvent): void {
    e.preventDefault();
    let collectedData = {
      name: this.newObjectName,
      category: this.newObjectCategory,
      description: this.newObjectDescription,
      price: this.newObjectPrice,
    }; //Samlat objekt med inputvärden.
    this.addDrink(collectedData);
  }
  collectContent(e: SubmitEvent): void {
    e.preventDefault();
    let collectedData = {
      name: this.newObjectName,
      description: this.newObjectDescription,
      price: this.newObjectPrice,
    }; //Samlat objekt med inputvärden.
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
      this.collectContentWithCategory(e); //Datat skickas vidare till en annan funktion då dryck-formuläret avviker.
    }
    if (this.type === '') {
      //För att göra ett post-anrop måste en typ först väljas.
      this.typeMessage.set(true);
      this.inputMessageDrink.set(false);
      this.inputMessage.set(false);
    }
  }
  //Nedan funktioner fungerar likadant men till olika tabeller.
  async addDrink(data: object) {
    this.menuService.postDrink(data).subscribe({
      next: () => {},
      error: (err: any) => {
        if (err.status > 400 && err.status <= 499) {
          this.manageUserService.logOutUser(); //Från 401 till 499 loggas användaren ut då token gått ut eller är ogitlig.
        }
        if ((err.status = 400)) {
          this.inputMessageDrink.set(true); //Vid 400 finns ett felmeddelande om inkorrekt input.
          this.inputMessage.set(false);
          this.typeMessage.set(false);
        }
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
        if ((err.status = 400)) {
          this.inputMessage.set(true);
          this.inputMessageDrink.set(false);
          this.typeMessage.set(false);
        }
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
        if ((err.status = 400)) {
          this.inputMessage.set(true);
          this.inputMessageDrink.set(false);
          this.typeMessage.set(false);
        }
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
        if ((err.status = 400)) {
          this.inputMessage.set(true);
          this.inputMessageDrink.set(false);
          this.typeMessage.set(false);
        }
      },
    });
  }
}
