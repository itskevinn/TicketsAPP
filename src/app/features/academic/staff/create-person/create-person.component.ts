import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {Person} from "../../../../data/models/academic/person";
import {markFormControlsAsTouched, setFormValues} from "../../../../shared/functions/functions";

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrl: './create-person.component.scss'
})
export class CreatePersonComponent implements OnInit, OnDestroy {

  personForm: FormGroup;
  private destroy$ = new Subject<void>();
  @Input() data?: any;
  @Output() personEventEmitter = new EventEmitter<Person>();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.personForm = this.buildPersonForm();
  }

  ngOnInit(): void {
    this.validatePerson();
  }

  private validatePerson(): void {
    if (this.data.person)
      this.setPersonFormValues(this.data.person);
  }

  private buildPersonForm(): FormGroup {
    this.personForm = this.formBuilder.group({
      id: [],
      firstName: ['', Validators.required],
      middleName: [],
      lastName: ['', Validators.required],
      secondLastName: [],
      email: ['', Validators.required]
    });
    return this.personForm;
  }

  private setPersonFormValues(person: Person) {
    setFormValues(this.personForm, person);
  }

  public confirm(): void {
    let person: Person;
    if (this.personForm.invalid) {
      markFormControlsAsTouched(this.personForm);
      return;
    }
    person = this.personForm.value;
    this.returnPerson(person);
  }

  private returnPerson(person: Person): void {
    this.personEventEmitter.emit(person);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
