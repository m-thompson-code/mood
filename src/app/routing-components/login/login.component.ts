import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    form: FormGroup;

    constructor(private _snackBar: MatSnackBar, private _auth: AngularFireAuth, private _router: Router) {
        // Initialize email and password to empty strings
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
        });
    }

    /**
     * Mark FormGroup as touched and trigger validation. Returns boolean based on if form is valid
     *
     * @returns boolean - true if form is valid
     */
    formIsValid(): boolean {
        // Trigger for validity and mark form as touched
        this.form.markAllAsTouched();

        return this.form.valid;
    }

    /**
     * use FormGroup to get email and password
     *
     * @returns { email: string; password: string } - email and password
     */
    getEmailAndPassword(): { email: string; password: string } {
        const emailFormControl = this.form.get('email') as FormControl;
        const passwordFormControl = this.form.get('password') as FormControl;

        return {
            email: emailFormControl?.value ?? '',
            password: passwordFormControl?.value ?? '',
        };
    }

    /**
     * Login using Firebase Auth. Uses email and password
     *
     * @returns Promise<void | boolean> - returns boolean when navigation is involved
     */
    login(): Promise<void | boolean> {
        // Exit early if form is not valid
        if (!this.formIsValid()) {
            this.toast('Nope, your email and secret thing is bad and you should feel bad');
            return Promise.resolve();
        }

        const { email, password } = this.getEmailAndPassword();

        // Login with email and password
        return this._auth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                // Navigate to home page on success
                return this._router.navigate(['']);
            })
            .catch((error) => {
                // Show user error message if login fails
                this.toast(error.message ?? 'Unknown error. Sry not sry');
            });
    }

    /**
     * Display a message for 3 seconds
     *
     * @param message - message to show user
     */
    toast(message: string): void {
        this._snackBar.open(message, undefined, {
            duration: 3000,
        });
    }
}
