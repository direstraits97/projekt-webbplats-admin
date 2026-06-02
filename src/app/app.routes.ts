import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Menuoverview } from './pages/menuoverview/menuoverview';
import { Addtomenu } from './pages/addtomenu/addtomenu';
import { Editmenu } from './pages/editmenu/editmenu';
import { Bookings } from './pages/bookings/bookings';
import { Editbookings } from './pages/editbookings/editbookings';
import { Bookingsoverview } from './pages/bookingsoverview/bookingsoverview';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'home', component: Home },
  { path: 'menuoverview', component: Menuoverview },
  { path: 'addtomenu', component: Addtomenu },
  { path: 'editmenu/:type/:id', component: Editmenu },
  { path: 'bookings', component: Bookings },
  { path: 'editbookings/:id', component: Editbookings },
  { path: 'bookingsoverview', component: Bookingsoverview },
];
