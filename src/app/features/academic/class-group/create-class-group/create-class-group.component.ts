import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogService, DynamicDialogComponent, DynamicDialogRef} from "primeng/dynamicdialog";
import {markFormControlsAsTouched} from "../../../../shared/functions/functions";
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {Person} from "../../../../data/models/academic/person";

@Component({
  selector: 'app-create-class-group',
  templateUrl: './create-class-group.component.html',
  styleUrl: './create-class-group.component.scss'
})
export class CreateClassGroupComponent {
  public classGroupFrom: FormGroup;
  dialogInstance: DynamicDialogComponent | undefined;
  subjectId: string = '';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder, private dialogService: DialogService, private ref: DynamicDialogRef,
              private route: ActivatedRoute) {
    this.classGroupFrom = this.buildClassGroupForm();
    this.dialogInstance = this.dialogService.getInstance(this.ref);
    this.validateRouteParam();
  }

  private buildClassGroupForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      subjectId: [this.subjectId]
    });
  }

  private validateRouteParam(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.subjectId = params['subjectId'] || null;
    });
  }

  public confirm(result: any): void {
    if (!result) {
      this.ref.close();
    }
    let person: Person;
    if (this.classGroupFrom.invalid) {
      markFormControlsAsTouched(this.classGroupFrom);
      return;
    }
    person = this.classGroupFrom.value;
    this.ref.close(person);
  }
}
