import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { IconsService } from '../../services/icons.service';
import { IconName, Partners } from '../../types';

import { MainComponent } from './main.component';

@Component({
    selector: 'button[mat-fab]',
    template: '',
})
class MockButton {}

@Component({
    selector: 'mat-icon',
    template: '',
})
class MockIcon {}

const mockIconsService = {
    getPartnerIcons: (): Observable<Partners> =>
        of({
            partnerA: IconName.good,
            partnerB: IconName.bad,
        }),
    setIcon: () => Promise.resolve(),
};

describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;

    let iconsService: IconsService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MainComponent, MockButton, MockIcon],
            providers: [
                {
                    provide: IconsService,
                    useValue: mockIconsService,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        iconsService = TestBed.inject(IconsService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('setIcon()', () => {
        it('should use IconsService to set icon', () => {
            const spy = jest.spyOn(iconsService, 'setIcon');

            component.setIcon(IconName.superGood);

            expect(spy).toBeCalledWith(IconName.superGood);
        });
    });
});
