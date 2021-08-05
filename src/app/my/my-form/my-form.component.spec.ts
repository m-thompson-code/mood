import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Directive, Input, Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '../alert.service';

import { MyFormComponent } from './my-form.component';

@Component({
    template: '',
    selector: 'app-input',
})
class MockInputComponent {
    @Input() value!: string;
}

@Component({
    template: '',
    selector: 'app-button',
})
class MockButtonComponent {}

@Pipe({
    name: 'excited',
})
class MockExcitedPipe implements PipeTransform {
    transform() {}
}

@Directive({
    selector: '[appUnderline]',
})
class MockUnderlineDirective {
    @Input() appUnderline?: string;
}

const mockAlertService = {
    open: (message: string) => {},
    test: () => of('some mock return'),
} as AlertService;

describe('MyFormComponent', () => {
    let component: MyFormComponent;
    let fixture: ComponentFixture<MyFormComponent>;
    let alertService: AlertService;
    let router: Router;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MyFormComponent, MockInputComponent, MockButtonComponent, MockExcitedPipe, MockUnderlineDirective],
            imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
            providers: [
                {
                    provide: AlertService,
                    useValue: mockAlertService,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MyFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        alertService = TestBed.inject(AlertService);
        router = TestBed.inject(Router);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('goHome()', () => {
        jest.spyOn(window.console, 'log').mockImplementationOnce(() => {});
        const spy = jest.spyOn(alertService, 'open');
        const spy2 = jest.spyOn(router, 'navigate').mockImplementationOnce(() => Promise.resolve(true));
        component.goHome();
        expect(spy).toBeCalledWith('moo');
        expect(spy2).toBeCalledWith(['/login']);
    });
});
