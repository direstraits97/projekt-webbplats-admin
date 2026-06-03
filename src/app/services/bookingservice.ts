/**
 * Denna service hanterar PUT, GET och DELETE för bokningar så att admin ska kunna justera bokningar som besökare på restaurangens webbplats gör.
 */

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class Bookingservice {
  private http = inject(HttpClient);
  bookingUrl: string = 'http://localhost:3000/api/bookings';
  router = inject(Router); //För att kunna omdirigera användare med Angular och fortfarande nyttja fördelen med SPA.

  getBookings() {
    const bookings$ = this.http.get(this.bookingUrl, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    });
    return toSignal(bookings$, { initialValue: [] }); //Get-anrop som skickar med sparad token i localStorage vid inloggat läge. En läsbar signal kommer som svar.
  }
  putBooking(id: string, data: any) {
    return this.http.put(this.bookingUrl + '/' + id, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    }); //Put-anrop med id som parameter, det data som ska skickas till servern samt autentisering.
  }
  deleteBooking(id: string) {
    return this.http.delete(this.bookingUrl + '/' + id, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    }); //Delete-anrop med id som parameter samt autentisering.
  }
}
