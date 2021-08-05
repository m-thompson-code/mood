import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'excited',
})
export class ExcitedPipe implements PipeTransform {
    transform(value: string, ...args: unknown[]): unknown {
        return `${value.toUpperCase()}!`;
    }
}
