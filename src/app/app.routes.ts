import { RouterModule, Routes } from '@angular/router';
import { StyleguideComponent } from './styleguide/styleguide.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './commonpages/about/about.component';
import { LoginComponent } from './commonpages/login/login.component';
import { SignupUserComponent } from './commonpages/signup-user/signup-user.component';
import { FindBusinessComponent } from './commonpages/find-business/find-business.component';
import { BusinessProfileComponent } from './commonpages/business-profile/business-profile.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { DuProfileComponent } from './dashboard/dash-user/du-profile/du-profile.component';
import { DashUserComponent } from './dashboard/dash-user/dash-user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DuAppointComponent } from './dashboard/dash-user/du-appoint/du-appoint.component';
import { DuReviewsComponent } from './dashboard/dash-user/du-reviews/du-reviews.component';
import { DuBusFavsComponent } from './dashboard/dash-user/du-bus-favs/du-bus-favs.component';
import { DbProfileComponent } from './dashboard/dash-bus/db-profile/db-profile.component';
import { DbAppointmentsComponent } from './dashboard/dash-bus/db-appointments/db-appointments.component';
import { DbReviewsComponent } from './dashboard/dash-bus/db-reviews/db-reviews.component';
import { DbStatsComponent } from './dashboard/dash-bus/db-stats/db-stats.component';
import { DaUsersComponent } from './dashboard/dash-admin/da-users/da-users.component';
import { DaBusinessesComponent } from './dashboard/dash-admin/da-businesses/da-businesses.component';
import { DaReviewsComponent } from './dashboard/dash-admin/da-reviews/da-reviews.component';
import { DaFeedbackComponent } from './dashboard/dash-admin/da-feedback/da-feedback.component'
import { DaStatsComponent } from './dashboard/dash-admin/da-stats/da-stats.component';
import { DashAdminComponent } from './dashboard/dash-admin/dash-admin.component';
import { DashBusComponent } from './dashboard/dash-bus/dash-bus.component';
import { DashLandingComponent } from './dashboard/dash-landing/dash-landing.component';
import { authGuard, canActivateUserGuard, verifyUserGuard } from './app-services/auth/auth.guard';
import { CalendarComponent } from './commonelements/calendar/calendar.component';


export const routes: Routes = [
    {path: '', component: CalendarComponent},
    {path: 'home', title: "Home", component: HomeComponent},
    {path: 'style-guide', title: "Style", component: StyleguideComponent},
    {path: 'about', title: "About", component: AboutComponent},
    {path: 'login', title: "Login", component: LoginComponent},
    {path: 'signup', title: "Sign Up", component: SignupUserComponent},
    {path: 'find-business', title: "Business Search", component: FindBusinessComponent},
    {path: 'business-profile/:b_id', title: "Profile", component: BusinessProfileComponent},
    {path: 'dashboard/:clientUsername', title: "Dashboard", component: DashboardComponent, 
                                                            canActivate: [authGuard], 
                                                            children: [
        // Paths for dash views
        {path: '', redirectTo: 'profile', pathMatch: 'full'},
        {path: '', component: DashUserComponent, children: [    
                                                            
            {path: 'profile', component: DuProfileComponent},
            {path: 'appointments', component: DuAppointComponent},
            {path: 'reviews', component: DuReviewsComponent},
            {path: 'favorites', component: DuBusFavsComponent}
        ]},
        {path: 'business', component: DashBusComponent, children: [    
            {path: 'profile', component: DbProfileComponent},
            {path: 'appointments', component: DbAppointmentsComponent},
            {path: 'reviews', component: DbReviewsComponent},
            {path: 'stats', component: DbStatsComponent}
        ]},
        {path: 'admin', component: DashAdminComponent, children: [    
            {path: 'users', component: DaUsersComponent},
            {path: 'business', component: DaBusinessesComponent},
            {path: 'reviews', component: DaReviewsComponent},
            {path: 'stats', component: DaStatsComponent},
            {path: 'feedback', component: DaFeedbackComponent}
        ]},
    ]},



    {path: '**', component: PageNotFoundComponent},

];



