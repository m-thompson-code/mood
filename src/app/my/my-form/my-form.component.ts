import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from '../alert.service';

@Component({
    selector: 'app-my-form',
    templateUrl: './my-form.component.html',
    styleUrls: ['./my-form.component.scss'],
})
export class MyFormComponent implements OnInit, OnDestroy {
    inputValue = 'some starting value for input';
    form: FormGroup;
    private unsub$ = new Subject<void>();
    constructor(private router: Router, private alertService: AlertService) {
        this.form = new FormGroup({});
    }

    ngOnInit(): void {
        this.alertService.test().pipe(takeUntil(this.unsub$)).subscribe();
    }

    goHome(): void {
        this.alertService.open('moo');
        this.router.navigate(['/login']);
    }

    ngOnDestroy(): void {
        this.unsub$.next();
        this.unsub$.complete();
    }
}
