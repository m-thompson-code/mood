import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { Icon, IconName } from '../types';

import { FirestoreService } from './firestore.service';

const mockAngularFirestore = {
    collection: () => ({
        valueChanges: () => of(),
        doc: () => ({
            set: () => {},
        }),
    }),
};

const mockAngularFireAuth = {
    currentUser: Promise.resolve({
        email: 'my@email.com',
    }),
};

describe('FirestoreService', () => {
    let service: FirestoreService;

    let angularFirestore: AngularFirestore;
    let angularFireAuth: AngularFireAuth;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: AngularFirestore,
                    useValue: mockAngularFirestore,
                },
                {
                    provide: AngularFireAuth,
                    useValue: mockAngularFireAuth,
                },
            ],
        });
        service = TestBed.inject(FirestoreService);
        angularFirestore = TestBed.inject(AngularFirestore);
        angularFireAuth = TestBed.inject(AngularFireAuth);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getCollection()', () => {
        it('should use firestore to get collection of items', () => {
            const spy = jest.spyOn(angularFirestore, 'collection');

            service.getCollection();

            expect(spy).toBeCalledWith('items');
        });
    });

    describe('getIcons', () => {
        it('should return Observable of item values', () => {
            const mockObservable = of();

            const mock = { valueChanges: () => mockObservable } as AngularFirestoreCollection;
            jest.spyOn(angularFirestore, 'collection').mockReturnValue(mock);

            expect(service.getIcons()).toBe(mockObservable);
        });
    });

    describe('getAuthenticatedEmail()', () => {
        it('should use firebase auth to get authenticated email', (done) => {
            expect.assertions(1);

            service.getAuthenticatedEmail().then((email) => {
                expect(email).toBe('my@email.com');
                done();
            });
        });
    });

    describe('setIconDocument()', () => {
        it('should use firestore document set', () => {
            const mockSet = (data: Icon) => Promise.resolve();

            const mockDoc = {
                set: mockSet,
            } as AngularFirestoreDocument<Icon>;

            const mockCollection = {
                doc: () => mockDoc,
            } as AngularFirestoreCollection<Icon>;

            jest.spyOn(service, 'getCollection').mockReturnValue(mockCollection);

            const spy = jest.spyOn(mockDoc, 'set');

            service.setIconDocument('some email', IconName.neutral);

            expect(spy).toBeCalledWith(
                {
                    iconName: IconName.neutral,
                    email: 'some email',
                },
                {
                    merge: true,
                },
            );
        });
    });
});
