import { Routes } from '@angular/router';
import {PersonDetailComponent} from "./persons/person-detail/person-detail.component";
import {PersonListComponent} from "./persons/person-list/person-list.component";

export const routes: Routes = [
  { path: 'persons', component: PersonListComponent },
  { path: 'person-detail', component: PersonDetailComponent },
  { path: '', redirectTo: '/persons', pathMatch: 'full'  }
];
