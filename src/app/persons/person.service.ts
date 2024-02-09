import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {Observable, shareReplay, Subscription, catchError} from "rxjs";
import {Person} from "./person";
import {toSignal} from "@angular/core/rxjs-interop";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private url = 'assets/persons.json';
  http = inject(HttpClient);
  persons = signal<Person[]>([]);
  selectedPerson = signal<Person | undefined>(undefined);

  private persons$ = this.http.get<Person[]>(this.url).subscribe(resp => this.persons.set(resp));

  addPerson(person: Person) {
    person.id = this.persons().length > 0 ? this.persons()[this.persons().length - 1].id + 1 : 1;
    this.persons().push(person);
    console.table(this.persons());
  }

  setSelectedPerson(person: Person) {
    this.selectedPerson.set(person);
  }

  clearSelectedPerson() {
    this.selectedPerson.set(undefined);
  }

  updatePerson(person: Person) {
    if (!this.selectedPerson()) return;

    const idx = this.persons().findIndex(p => p.id === this.selectedPerson()?.id);
    const persons = this.persons();
    persons[idx] = person;
    this.persons.set(persons);
  }

  deletePerson(person: Person) {
    this.persons.set(this.persons().filter(p => p.id !== person.id));
  }

  constructor() {
  }
}
