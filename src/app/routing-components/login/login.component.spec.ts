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

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginComponent, MockFormField, MockInput, MockButton, MockLabel, MockError],
            providers: [
                { provide: MatSnackBar, useValue: mockMatSnackBar },
                { provide: AngularFireAuth, useValue: mockAngularFireAuth },
            ],
            imports: [ReactiveFormsModule, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
