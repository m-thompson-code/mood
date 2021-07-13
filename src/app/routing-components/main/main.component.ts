import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IconName, Partners } from 'src/app/services/item.model';
import { FirestoreService } from '../../services/firestore.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent {
    icons: IconName[] = [IconName.superBad, IconName.bad, IconName.neutral, IconName.good, IconName.superGood];

    partners$: Observable<Partners>;

    constructor(private _firestoreService: FirestoreService) {
        this.partners$ = this._firestoreService.getOurIcons();
    }

    setIcon(iconName: IconName): Promise<void> {
        return this._firestoreService.setIcon(iconName);
    }
}
