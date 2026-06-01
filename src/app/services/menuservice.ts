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
    });
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
  }
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
}
