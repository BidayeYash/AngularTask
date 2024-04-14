import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'userInfo', component: UserProfileComponent},
    { path: 'regModal', component: RegisterComponent },
];
