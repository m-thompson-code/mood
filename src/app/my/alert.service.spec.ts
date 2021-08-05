import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AlertService } from './alert.service';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('AlertService', () => {
    let service: AlertService;
    let httpClient: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [AlertService],
        });
        service = TestBed.inject(AlertService);
        httpClient = TestBed.inject(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('open()', () => {
        it('should console log', () => {
            const spy = jest.spyOn(window.console, 'log').mockImplementationOnce(() => {});
            service.open('moo');
            expect(spy).toBeCalledWith('moo');
        });
    });

    describe('test()', () => {
        it('should console log', () => {
            expect.assertions(1);
            const spy = jest.spyOn(httpClient, 'get').mockImplementationOnce(() => throwError('moo'));
            service.test().subscribe((x) => {
                expect(x).toBe('cow');
            });
        });
    });
});
