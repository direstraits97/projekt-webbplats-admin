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
  manageUserService = inject(ManageUser);
  bookingsService = inject(Bookingservice);
  bookings = this.bookingsService.getBookings();
  manipulatedBookings = signal<any>([]);

  constructor() {
    this.manageUserService.controlAuth();
    effect(() => {
      this.manipulatedBookings.set(this.bookings());
    });
  }
  deleteBooking(id: string) {
    this.bookingsService.deleteBooking(id).subscribe({
      next: (response) => {
        this.manipulatedBookings.set(response);
      },
      error: () => {},
    });
  }
}
