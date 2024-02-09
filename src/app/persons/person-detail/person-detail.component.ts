import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {PersonService} from "../person.service";
import {Person} from "../person";

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './person-detail.component.html',
  styleUrl: './person-detail.component.css'
})
export class PersonDetailComponent {
  fb = inject(FormBuilder);
  personService = inject(PersonService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  selectedPerson = this.personService.selectedPerson;

  personForm = this.fb.group({
    name: [this.selectedPerson()?.name, Validators.required],
    email: [this.selectedPerson()?.email, [Validators.required, Validators.email]],
    occupation: [this.selectedPerson()?.occupation, Validators.required],
    birthday: [this.selectedPerson()?.birthday, Validators.required]
  });

  onSubmit() {
    const person = <Person>{
      name: this.personForm.value.name,
      birthday: this.personForm.value.birthday,
      email: this.personForm.value.email,
      occupation: this.personForm.value.occupation
    };

    if (this.selectedPerson()) {
      this.personService.updatePerson(person);
      this.personService.clearSelectedPerson();
    } else {
      this.personService.addPerson(person);
    }
    this.router.navigateByUrl('/persons');

  }

  ngOnDestroy() {
    this.personService.clearSelectedPerson();
  }
}
