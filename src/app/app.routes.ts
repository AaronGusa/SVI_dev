import { RouterModule, Routes } from '@angular/router';
import { StyleguideComponent } from './styleguide/styleguide.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', component: StyleguideComponent},
    {path: 'home', component: HomeComponent},
    {path: 'style-guide', component: StyleguideComponent}
];

// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
// })

// export class AppRoutingModule {}


