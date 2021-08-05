import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appUnderline]',
})
export class UnderlineDirective {
    @Input() appUnderline?: string;
    constructor(private el: ElementRef) {}

    @HostListener('mouseenter') onMouseEnter() {
        this.underline(this.appUnderline || 'underline');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.underline('');
    }

    private underline(decoration: string) {
        this.el.nativeElement.style.textDecoration = decoration;
    }
}
