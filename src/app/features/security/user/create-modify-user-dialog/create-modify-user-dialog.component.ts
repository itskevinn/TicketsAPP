import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Subscription} from 'rxjs';
import {AuthService} from 'src/app/data/services/security/auth.service';

@Component({
    selector: 'app-create-modify-user-dialog',
    templateUrl: './create-modify-user-dialog.component.html',
    styleUrls: ['./create-modify-user-dialog.component.scss']
})
export class CreateModifyUserDialogComponent implements OnInit {

    userForm: FormGroup;
    subscriptions: Subscription[] = [];
    username: string = '';

    constructor(private formBuilder: FormBuilder, private messageService: MessageService, private authService: AuthService) {
        this.userForm = this.buildUserForm();
        this.username = authService.currentUserValue.username;
    }

    ngOnInit(): void {
    }

    private buildUserForm(): FormGroup {
        return this.formBuilder.group({
            name: ['', Validators.required],
            user: ['', Validators.required],
            pass: ['', Validators.required],
        });
    }

    public confirm(): void {
        this.markFormGroupTouched(this.userForm);
        if (this.userForm.valid) {
     
        }
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched();

            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }

}
