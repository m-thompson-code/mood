import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IconName, Item, Partners } from './item.model';

@Injectable({
    providedIn: 'root',
})
export class FirestoreService {
    constructor(private _firestore: AngularFirestore, private _auth: AngularFireAuth) {}

    getIcons(): Observable<Item[]> {
        const collection = this._firestore.collection<Item>('items');
        return collection.valueChanges();
    }

    getOurIcons(): Observable<Partners> {
        return this.getIcons().pipe(
            map((items) => {
                const partnerA = items.find((item) => item.email === 'mthompson@bitovi.com');
                const partnerB = items.find((item) => item.email === 'girl@friend.com');

                return {
                    partnerA: partnerA?.iconName ?? IconName.neutral,
                    partnerB: partnerB?.iconName ?? IconName.neutral,
                };
            }),
        );
    }

    setIcon(iconName: IconName): Promise<void> {
        return this._auth.currentUser.then((user) => {
            const collection = this._firestore.collection<Item>('items');

            const email = user?.email;

            if (!email) {
                throw new Error('No email! Oh no!');
            }

            return collection.doc(email).set(
                {
                    iconName,
                    email,
                },
                { merge: true },
            );
        });
    }
}
