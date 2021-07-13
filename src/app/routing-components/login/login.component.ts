import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    form: FormGroup;

    constructor(private _snackBar: MatSnackBar, private _auth: AngularFireAuth, private _router: Router) {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
        });
    }

    formIsValid(formGroup: FormGroup): boolean {
        formGroup.updateValueAndValidity();

        return formGroup.valid;
    }

    getEmailAndPassword(form: FormGroup): { email: string; password: string } {
        return {
            email: this.form.get('email')?.value ?? '',
            password: this.form.get('password')?.value ?? '',
        };
    }

    login(): Promise<void | boolean> {
        if (!this.formIsValid(this.form)) {
            this.toast('Nope, your email and secret thing is bad');
            return Promise.resolve();
        }

        const { email, password } = this.getEmailAndPassword(this.form);

        return this._auth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                return this._router.navigate(['']);
            })
            .catch((error) => {
                this.toast(error.message ?? 'Unknown error. Sry not sry');
            });
    }

    toast(message: string): void {
        this._snackBar.open(message, undefined, {
            duration: 3000,
        });
    }
}
