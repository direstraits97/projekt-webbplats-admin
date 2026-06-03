/**Denna fil hanterar CRUD för alla tabeller i menyn.
 * Av: Josefine Backlund
 */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private http = inject(HttpClient);
  drinksUrl: string = 'http://localhost:3000/api/drinks';
  appetizersUrl: string = 'http://localhost:3000/api/appetizers';
  mainCoursesUrl: string = 'http://localhost:3000/api/maincourses';
  dessertsUrl: string = 'http://localhost:3000/api/desserts';

  postDrink(data: any) {
    return this.http.post(this.drinksUrl, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    }); //Data skickas till URL:en med token för validering.
  }
  postAppetizer(data: any) {
    return this.http.post(this.appetizersUrl, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    });
  }
  postMainCourse(data: any) {
    return this.http.post(this.mainCoursesUrl, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    });
  }
  postDessert(data: any) {
    return this.http.post(this.dessertsUrl, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    });
  }
  getDrink() {
    const drinks$ = this.http.get(this.drinksUrl);
    return toSignal(drinks$, { initialValue: [] });
    //En läsbar signal kommer som svar med get-anropet som läser in alla drycker.
  }
  getAppetizer() {
    const appetizers$ = this.http.get(this.appetizersUrl);
    return toSignal(appetizers$, { initialValue: [] });
  }
  getMainCourse() {
    const mainCourses$ = this.http.get(this.mainCoursesUrl);
    return toSignal(mainCourses$, { initialValue: [] });
  }
  getDessert() {
    const desserts$ = this.http.get(this.dessertsUrl);
    return toSignal(desserts$, { initialValue: [] });
  }
  deleteDrink(id: string) {
    return this.http.delete(this.drinksUrl + '/' + id, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    });
  } //Ett delete-anrop med id som parameter i adressraden som valideras med token.
  deleteAppetizer(id: string) {
    return this.http.delete(this.appetizersUrl + '/' + id, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    });
  }
  deleteMainCourse(id: string) {
    return this.http.delete(this.mainCoursesUrl + '/' + id, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    });
  }
  deleteDessert(id: string) {
    return this.http.delete(this.dessertsUrl + '/' + id, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    });
  }
  putDrink(id: string, data: any) {
    return this.http.put(this.drinksUrl + '/' + id, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    });
  } //Ett put-anrop som använder id i adressraden och skickar med data från body. Även detta anrop valideras.
  putAppetizer(id: string, data: any) {
    return this.http.put(this.appetizersUrl + '/' + id, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    });
  }
  putMainCourse(id: string, data: any) {
    return this.http.put(this.mainCoursesUrl + '/' + id, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    });
  }
  putDessert(id: string, data: any) {
    return this.http.put(this.dessertsUrl + '/' + id, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    });
  }
}
