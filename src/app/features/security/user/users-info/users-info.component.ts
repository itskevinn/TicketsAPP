import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { User } from 'src/app/data/models/security/user.model';
import { UserService } from 'src/app/data/services/security/user.service';
import { setFormValues } from 'src/app/shared/functions/functions';

@Component({
    selector: 'app-users-info',
    templateUrl: './users-info.component.html',
    styleUrls: ['./users-info.component.scss']
})
export class UsersInfoComponent implements OnInit {
    UserForm: FormGroup;
    cols: any[] = [];
    private destroy$ = new Subject<void>();
    showStudentDialog: boolean = false;
    action: string = '';
    submitted: boolean = false;
    showDeleteStudentDialog: boolean = false;
    user: User = null!;

    constructor(private usersService: UserService, private formBuilder: FormBuilder, private messageService: MessageService) {
        this.UserForm = this.buildPersonForm();
        this.cols = [
        {field: 'firstName', header: 'Primer Nombre'},
        {field: 'middleName', header: 'Segundo Nombre'},
        {field: 'lastName', header: 'Primer Apellido'},
        {field: 'secondLastName', header: 'Segundo Apellido'},
        {field: 'email', header: 'Correo electrónico'}
        ];
    }

    ngOnInit(): void {
    }
    private buildPersonForm(): FormGroup {
        this.UserForm = this.formBuilder.group({
        id: [],
        firstName: ['', Validators.required],
        middleName: [],
        lastName: ['', Validators.required],
        secondLastName: [],
        email: ['', Validators.required]
        });
        return this.UserForm;
    }

    private setPersonFormValues(student: User) {
        setFormValues(this.UserForm, student);
    }

    public showRegisterModifyStudentDialog(action: string, user?: User): void {
    this.action = action;
    if (user) {
      this.user = user;
      this.setPersonFormValues(user);
    }
    this.showStudentDialog = true;
  }


}
