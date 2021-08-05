import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mapTo } from 'rxjs/operators';

@Injectable()
export class AlertService {
    constructor(private httpClient: HttpClient) {}
    open(message: string): void {
        console.log(message);
    }

    test(): Observable<string> {
        return this.httpClient.get('api/1').pipe(
            mapTo('cow'),
            catchError(() => of('cow')),
        );
    }

    someOtherMethod(): void {
        // This isn't used in MyFormComponent
    }
}
