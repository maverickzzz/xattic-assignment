import {Component, computed, inject, signal} from '@angular/core';
import {AgePipe} from "../../age.pipe";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Person} from "../person";
import {FormsModule} from "@angular/forms";
import {PersonCardComponent} from "../person-card/person-card.component";
import {PersonService} from "../person.service";

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [
    AgePipe,
    NgForOf,
    RouterLink,
    FormsModule,
    PersonCardComponent
  ],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css'
})
export class PersonListComponent {
  searchQuery = signal<string>("");
  personService = inject(PersonService);

  // get all persons from the API
  persons = computed(() => this.personService.persons());

  // store persons filtered by search query, if query not exists, return all persons
  filteredPersons = computed(() => {
    if (this.searchQuery() === '') return this.persons();

    return this.persons().filter(p =>
      p.name.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
      p.occupation.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
      p.email.toLowerCase().includes(this.searchQuery().toLowerCase())
    )
  });

  onSearchUpdated(search: string) {
    this.searchQuery.set(search);
  }
}
