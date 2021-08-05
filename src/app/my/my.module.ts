import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFormComponent } from './my-form/my-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AlertService } from './alert.service';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { ExcitedPipe } from './excited.pipe';
import { HttpClientModule } from '@angular/common/http';
import { UnderlineDirective } from './underline.directive';

const routes: Routes = [
    {
        path: '',
        component: MyFormComponent,
    },
];

@NgModule({
    declarations: [MyFormComponent, InputComponent, ButtonComponent, ExcitedPipe, UnderlineDirective],
    imports: [HttpClientModule, ReactiveFormsModule, RouterModule.forChild(routes), CommonModule],
    providers: [AlertService],
})
export class MyModule {}
