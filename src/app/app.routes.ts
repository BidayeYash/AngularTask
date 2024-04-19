import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegistrationModalComponent } from './registration-modal/registration-modal.component';

export const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'userProfile', component: UserProfileComponent },
  { path: 'regModal', component: RegistrationModalComponent },
];
