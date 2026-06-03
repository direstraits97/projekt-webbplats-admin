/**
 * Denna fil hämtar bokningar och ger användaren möjlighet att radera eller ändra bokning genom att klicka sig vidare.
 * Av: Josefine Backlund
 */

import { Component, effect, inject, signal } from '@angular/core';
import { ManageUser } from '../../services/manage-user';
import { Bookingservice } from '../../services/bookingservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bookingsoverview',
  imports: [RouterLink],
  templateUrl: './bookingsoverview.html',
  styleUrl: './bookingsoverview.scss',
})
export class Bookingsoverview {
  //Injectar services.
  manageUserService = inject(ManageUser);
  bookingsService = inject(Bookingservice);
  bookings = this.bookingsService.getBookings();
  manipulatedBookings = signal<any>([]); //Skrivbar signal som kopierar den läsbara signalens innehåll som en effekt i konstruktorn.

  constructor() {
    this.manageUserService.controlAuth();
    effect(() => {
      this.manipulatedBookings.set(this.bookings());
    });
  }
  deleteBooking(id: string) {
    this.bookingsService.deleteBooking(id).subscribe({
      next: (response) => {
        this.manipulatedBookings.set(response); //API:ets svar på resterande innehåll skickas, och den skrivbara signalen uppdateras med dess innehåll.
      },
      error: () => {},
    });
  }
}
