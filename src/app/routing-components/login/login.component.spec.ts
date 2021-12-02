import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'mat-form-field',
    template: '',
})
class MockFormField {}

@Component({
    selector: 'input[matInput]',
    template: '',
})
class MockInput {}

@Component({
    selector: 'button[mat-raised-button]',
    template: '',
})
class MockButton {}

@Component({
    selector: 'mat-label',
    template: '',
})
class MockLabel {}

@Component({
    selector: 'mat-error',
    template: '',
})
class MockError {}

const mockMatSnackBar = {
    open: () => {},
};

const mockAngularFireAuth = {
    signInWithEmailAndPassword: () => Promise.resolve(),
};

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    let angularFireAuth: AngularFireAuth;
    let router: Router;
    let matSnackBar: MatSnackBar;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginComponent, MockFormField, MockInput, MockButton, MockLabel, MockError],
            providers: [
                {
                    provide: MatSnackBar,
                    useValue: mockMatSnackBar,
                },
                {
                    provide: AngularFireAuth,
                    useValue: mockAngularFireAuth,
                },
            ],
            imports: [ReactiveFormsModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        angularFireAuth = TestBed.inject(AngularFireAuth);
        router = TestBed.inject(Router);
        matSnackBar = TestBed.inject(MatSnackBar);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('formIsValid()', () => {
        it('should mark FormGroup as touched and trigger validation', () => {
            component.form.get('email')?.setValue('not a real email');
            component.form.get('password')?.setValue('not a real password');

            const spy = jest.spyOn(component.form, 'markAllAsTouched');

            component.formIsValid();

            expect(spy).toBeCalledTimes(1);
        });

        it('should return false if FormGroup is not valid', () => {
            component.form.get('email')?.setValue('not a real email');
            component.form.get('password')?.setValue('');

            expect(component.formIsValid()).toBe(false);
        });

        it('should return true if FormGroup is valid', () => {
            component.form.get('email')?.setValue('some@email.com');
            component.form.get('password')?.setValue('some password');

            expect(component.formIsValid()).toBe(true);
        });
    });

    describe('getEmailAndPassword()', () => {
        it('should return empty strings if email or password form control is not defined', () => {
            component.form = new FormGroup({});

            expect(component.form.controls.email).toBeFalsy();
            expect(component.form.controls.password).toBeFalsy();
            expect(component.getEmailAndPassword()).toStrictEqual({
                email: '',
                password: '',
            });
        });

        it('should get email and password from FormGroup', () => {
            component.form.get('email')?.setValue('some@email.com');
            component.form.get('password')?.setValue('some password');

            expect(component.getEmailAndPassword()).toStrictEqual({
                email: 'some@email.com',
                password: 'some password',
            });
        });
    });

    describe('login()', () => {
        describe('when FormGroup is not valid', () => {
            beforeEach(() => {
                jest.spyOn(component, 'formIsValid').mockReturnValue(false);
            });

            it('should exit early if form is not valid', (done) => {
                expect.assertions(1);

                component.login().then((value) => {
                    expect(value).toBeUndefined();
                    done();
                });
            });

            it('should toast when form is not valid', (done) => {
                expect.assertions(1);

                const spy = jest.spyOn(component, 'toast');

                component.login().then(() => {
                    expect(spy).toBeCalledWith('Nope, your email and secret thing is bad and you should feel bad');
                    done();
                });
            });
        });

        describe('when FormGroup is valid', () => {
            beforeEach(() => {
                jest.spyOn(component, 'formIsValid').mockReturnValue(true);

                jest.spyOn(component, 'getEmailAndPassword').mockReturnValue({
                    email: 'cool@email.com',
                    password: 'super password',
                });
            });

            it('should authenticate using email and password from FormGroup', () => {
                const spy = jest.spyOn(angularFireAuth, 'signInWithEmailAndPassword');

                component.login();

                expect(spy).toBeCalledWith('cool@email.com', 'super password');
            });

            it('should navigate on success', (done) => {
                expect.assertions(1);

                const spy = jest.spyOn(router, 'navigate');

                component.login().then(() => {
                    expect(spy).toBeCalledWith(['']);
                    done();
                });
            });
            it('should toast message from error', (done) => {
                expect.assertions(1);

                jest.spyOn(angularFireAuth, 'signInWithEmailAndPassword').mockRejectedValue({ message: 'some error' });
                const spy = jest.spyOn(component, 'toast');

                component.login().then(() => {
                    expect(spy).toBeCalledWith('some error');
                    done();
                });
            });

            it('should toast default error message if error has no message', (done) => {
                expect.assertions(1);

                jest.spyOn(angularFireAuth, 'signInWithEmailAndPassword').mockRejectedValue({});
                const spy = jest.spyOn(component, 'toast');

                component.login().then(() => {
                    expect(spy).toBeCalledWith('Unknown error. Sry not sry');
                    done();
                });
            });
        });
    });

    describe('toast()', () => {
        it('should use MatSnackBar to display a message that lasts 3 seconds', () => {
            const spy = jest.spyOn(matSnackBar, 'open');

            component.toast('some message');

            expect(spy).toBeCalledWith('some message', undefined, {
                duration: 3000,
            });
        });
    });
});
