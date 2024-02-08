import { RouterModule, Routes } from '@angular/router';
import { StyleguideComponent } from './styleguide/styleguide.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './commonpages/about/about.component';
import { LoginComponent } from './commonpages/login/login.component';
import { SignupUserComponent } from './commonpages/signup-user/signup-user.component';
import { FindBusinessComponent } from './commonpages/find-business/find-business.component';
import { BusinessProfileComponent } from './searchfind/business-profile/business-profile.component';

export const routes: Routes = [
    {path: '', component: StyleguideComponent},
    {path: 'home', component: HomeComponent},
    {path: 'style-guide', component: StyleguideComponent},
    {path: 'about', component: AboutComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupUserComponent},
    {path: 'find-business', component: FindBusinessComponent},
    {path: 'business-profile/:b_id', component: BusinessProfileComponent}
];

// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
// })

// export class AppRoutingModule {}


