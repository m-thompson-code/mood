import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IconName } from '../types';
import { FirestoreService } from './firestore.service';

import { IconsService } from './icons.service';

const mockFirestoreService = {
    getIcons: () => of([]),
    getAuthenticatedEmail: () => Promise.resolve('mock email'),
    setIconDocument: () => Promise.resolve(),
};

describe('IconsService', () => {
    let service: IconsService;

    let firestoreService: FirestoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: FirestoreService,
                    useValue: mockFirestoreService,
                },
            ],
        });
        service = TestBed.inject(IconsService);
        firestoreService = TestBed.inject(FirestoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getPartnerIcons()', () => {
        beforeEach(() => {});
        it('should get FirestoreService.iconNames based on email', (done) => {
            jest.spyOn(firestoreService, 'getIcons').mockReturnValue(
                of([
                    {
                        iconName: IconName.superBad,
                        email: 'some@other.com',
                    },
                    {
                        iconName: IconName.bad,
                        email: 'mthompson@bitovi.com',
                    },
                    {
                        iconName: IconName.good,
                        email: 'another@email.com',
                    },
                    {
                        iconName: IconName.superGood,
                        email: 'girl@friend.com',
                    },
                ]),
            );

            expect.assertions(1);

            service.getPartnerIcons().subscribe((value) => {
                expect(value).toEqual({
                    partnerA: IconName.bad,
                    partnerB: IconName.superGood,
                });
                done();
            });
        });

        it('should default to neutral iconName if no iconName for each email', (done) => {
            jest.spyOn(firestoreService, 'getIcons').mockReturnValue(
                of([
                    {
                        iconName: IconName.superBad,
                        email: 'some@other.com',
                    },
                    {
                        iconName: IconName.good,
                        email: 'another@email.com',
                    },
                ]),
            );

            expect.assertions(1);

            service.getPartnerIcons().subscribe((value) => {
                expect(value).toEqual({
                    partnerA: IconName.neutral,
                    partnerB: IconName.neutral,
                });
                done();
            });
        });
    });

    describe('setIcon()', () => {
        it('should throw if no email is found', (done) => {
            expect.assertions(1);

            jest.spyOn(firestoreService, 'getAuthenticatedEmail').mockResolvedValue('');

            service.setIcon(IconName.neutral).catch((error) => {
                expect(error).toEqual(new Error('No email! Oh no!'));
                done();
            });
        });

        it('should set iconName for authenticated email using FirestoreService', (done) => {
            expect.assertions(1);

            jest.spyOn(firestoreService, 'getAuthenticatedEmail').mockResolvedValue('another test email');

            const spy = jest.spyOn(firestoreService, 'setIconDocument').mockResolvedValue();

            service.setIcon(IconName.superGood).then(() => {
                expect(spy).toBeCalledWith('another test email', IconName.superGood);
                done();
            });
        });
    });
});
