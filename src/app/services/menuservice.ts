import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

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
    return this.http.post(this.drinksUrl, data, {});
  }
  postAppetizer(data: any) {
    return this.http.post(this.appetizersUrl, data, {});
  }
  postMainCourse(data: any) {
    return this.http.post(this.mainCoursesUrl, data, {});
  }
  postDessert(data: any) {
    return this.http.post(this.dessertsUrl, data, {});
  }
}
