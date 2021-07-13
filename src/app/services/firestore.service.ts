import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IconName, Icon } from '../types';

@Injectable({
    providedIn: 'root',
})
export class FirestoreService {
    constructor(private _firestore: AngularFirestore, private _auth: AngularFireAuth) {}

    getCollection(): AngularFirestoreCollection<Icon> {
        return this._firestore.collection<Icon>('items');
    }

    getIcons(): Observable<Icon[]> {
        return this.getCollection().valueChanges();
    }

    setIconDocument(email: string, iconName: IconName): Promise<void> {
        return this.getCollection().doc(email).set(
            {
                iconName,
                email,
            },
            { merge: true },
        );
    }

    getAuthenticatedEmail(): Promise<string> {
        return this._auth.currentUser.then((user) => {
            return user?.email ?? '';
        });
    }
}
