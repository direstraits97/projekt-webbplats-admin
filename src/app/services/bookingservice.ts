import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Bookingservice {
  private http = inject(HttpClient);
  bookingUrl: string = 'http://localhost:3000/api/bookings';
  router = inject(Router);

  getBookings() {
    const bookings$ = this.http.get(this.bookingUrl, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    });
    return toSignal(bookings$, { initialValue: [] });
  }
  putBooking(id: string, data: any) {
    return this.http.put(this.bookingUrl + '/' + id, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    });
  }
  deleteBooking(id: string) {
    return this.http.delete(this.bookingUrl + '/' + id, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    });
  }
}
