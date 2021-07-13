import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IconName, Partners } from '../../types';
import { IconsService } from '../../services/icons.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent {
    // Order matters
    icons: IconName[] = [IconName.superBad, IconName.bad, IconName.neutral, IconName.good, IconName.superGood];

    partners$: Observable<Partners>;

    constructor(private _iconsService: IconsService) {
        this.partners$ = this._iconsService.getPartnerIcons();
    }

    setIcon(iconName: IconName): Promise<void> {
        return this._iconsService.setIcon(iconName);
    }
}
