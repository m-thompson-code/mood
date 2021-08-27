import { Component, Directive, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AlertService } from '../alert.service';

import { MyFormComponent } from './my-form.component';

describe('MyFormComponent', () => {
    let component: MyFormComponent;
    let fixture: ComponentFixture<MyFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MyFormComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MyFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
