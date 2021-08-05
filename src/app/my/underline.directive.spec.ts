import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnderlineDirective } from './underline.directive';

@Component({
    template: '<div appUnderline>Some text</div>',
    selector: 'app-host',
})
class MockHost {
    @ViewChild(UnderlineDirective) directive!: UnderlineDirective;
}

describe('UnderlineDirective', () => {
    let component: MockHost;
    let fixture: ComponentFixture<MockHost>;
    let directive: UnderlineDirective;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MockHost, UnderlineDirective],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MockHost);
        component = fixture.componentInstance;
        fixture.detectChanges();
        directive = component.directive;
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });
});
