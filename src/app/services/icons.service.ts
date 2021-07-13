import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IconName, Partners } from '../types';
import { FirestoreService } from './firestore.service';

@Injectable({
    providedIn: 'root',
})
export class IconsService {
    constructor(private _firestoreService: FirestoreService) {}

    getPartnerIcons(): Observable<Partners> {
        return this._firestoreService.getIcons().pipe(
            map((icons) => {
                const partnerA = icons.find((icon) => icon.email === 'mthompson@bitovi.com');
                const partnerB = icons.find((icon) => icon.email === 'girl@friend.com');

                const partners: Partners = {
                    partnerA: partnerA?.iconName ?? IconName.neutral,
                    partnerB: partnerB?.iconName ?? IconName.neutral,
                };

                return partners;
            }),
        );
    }

    setIcon(iconName: IconName): Promise<void> {
        return this._firestoreService.getAuthenticatedEmail().then((email) => {
            if (!email) {
                throw new Error('No email! Oh no!');
            }

            return this._firestoreService.setIconDocument(email, iconName);
        });
    }
}
