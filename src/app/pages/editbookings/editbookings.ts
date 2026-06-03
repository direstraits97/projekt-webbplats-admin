/**
 * Denna fil sköter PUT-anrop för bokningar.
 * Av: Josefine Backlund
 */

import { Component, inject, signal } from '@angular/core';
import { ManageUser } from '../../services/manage-user';
import { Bookingservice } from '../../services/bookingservice';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-editbookings',
  imports: [FormsModule, RouterLink],
  templateUrl: './editbookings.html',
  styleUrl: './editbookings.scss',
})
export class Editbookings {
  manageUserService = inject(ManageUser);
  bookingsService = inject(Bookingservice);
  router = inject(Router);
  numberOfGuests: string = '';
  dateAndTime: string = '';
  name: string = '';
  phone: string = '';
  description: string = '';
  id: string = '';
  inputMessage = signal<boolean>(false);

  constructor(private route: ActivatedRoute) {
    this.manageUserService.controlAuth();
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') || '';
    }); //Med denna funktion kan parametern id hämtas för att användas i adressraden.
  }

  //Denna funktion samlar datat som ska skickas för uppdatering.
  collectBooking(e: SubmitEvent) {
    e.preventDefault();
    console.log(this.name, this.numberOfGuests, this.dateAndTime);
    let collectedData = {
      guests: this.numberOfGuests,
      date: this.dateAndTime,
      name: this.name,
      phone: this.phone,
      description: this.description,
    };
    this.putBooking(collectedData);
  }
  //Denna funktion navigerar användaren tillbaka till översikt av bokningar vid lyckat anrop, annars kommer ett felmeddelande om felaktig input/användaren loggas ut vid tokenproblem.
  async putBooking(data: object) {
    this.bookingsService.putBooking(this.id, data).subscribe({
      next: () => {
        this.router.navigate(['/bookingsoverview']);
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
