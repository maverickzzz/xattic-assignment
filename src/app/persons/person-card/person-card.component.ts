import {Component, inject, Input} from '@angular/core';
import {AgePipe} from "../../age.pipe";
import {Person} from "../person";
import {PersonService} from "../person.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-person-card',
  standalone: true,
  imports: [
    AgePipe
  ],
  templateUrl: './person-card.component.html',
  styleUrl: './person-card.component.css'
})
export class PersonCardComponent {
  @Input() person: Person = {id: -1, name: '', birthday: '', email: '', occupation: ''};

  personService = inject(PersonService);
  router = inject(Router);

  onEdit() {
    this.personService.setSelectedPerson(this.person);
    this.router.navigateByUrl('person-detail');
  }

  onDelete() {
    this.personService.deletePerson(this.person);
  }
}
