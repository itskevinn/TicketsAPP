import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Person } from '../../../../data/models/academic/person';
import {
  markFormControlsAsTouched,
  setFormValues,
} from '../../../../shared/functions/functions';
import {
  DialogService,
  DynamicDialogComponent,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrl: './create-person.component.scss',
})
export class CreatePersonComponent implements OnInit, OnDestroy {
  @Output() personEventEmitter = new EventEmitter<Person>();
  dialogInstance: DynamicDialogComponent | undefined;
  private destroy$ = new Subject<void>();
  personForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    private dialogService: DialogService
  ) {
    this.personForm = this.buildPersonForm();
    this.dialogInstance = this.dialogService.getInstance(this.ref);
  }

  ngOnInit(): void {
    this.validatePerson();
  }

  private validatePerson(): void {
    if (this.dialogInstance?.data.person)
      this.setPersonFormValues(this.dialogInstance?.data.person);
  }

  private buildPersonForm(): FormGroup {
    this.personForm = this.formBuilder.group({
      id: [],
      firstName: ['', Validators.required],
      middleName: [],
      lastName: ['', Validators.required],
      secondLastName: [],
      email: ['', Validators.required],
    });
    return this.personForm;
  }

  private setPersonFormValues(person: Person) {
    setFormValues(this.personForm, person);
  }

  public confirm(result: any): void {
    if (!result) {
      this.ref.close();
    }
    let person: Person;
    if (this.personForm.invalid) {
      markFormControlsAsTouched(this.personForm);
      return;
    }
    person = this.personForm.value;
    this.ref.close(person);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
