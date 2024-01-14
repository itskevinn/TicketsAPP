import {Component} from '@angular/core';
import {ClassGroup} from "../../../../data/models/academic/class-group";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrl: './create-subject.component.scss'
})

export class CreateSubjectComponent {
  classGroups: ClassGroup[] = [];
  classGroupFrom: FormGroup;
  classGroupDialog: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.classGroupFrom = this.buildClassGroupForm();
  }

  private buildClassGroupForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  public showClassGroupDialog(): void {
    this.classGroupDialog = false;
  }
}
