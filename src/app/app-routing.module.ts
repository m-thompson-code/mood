import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './routing-components/main/main.component';
import { LoginComponent } from './routing-components/login/login.component';

import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { MyFormComponent } from './my/my-form/my-form.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'test',
        loadChildren: () => import('./my/my.module').then((mod) => mod.MyModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
