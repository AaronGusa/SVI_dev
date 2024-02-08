import { Component } from '@angular/core';
import { BusinessProfileImagesComponent } from './business-profile-images/business-profile-images.component';
import { BusinessProfileMenuComponent } from './business-profile-menu/business-profile-menu.component';
import { BusinessProfileUserComponent } from './business-profile-user/business-profile-user.component';
import {MatExpansionModule} from '@angular/material/expansion';


@Component({
  selector: 'app-business-profile',
  standalone: true,
  imports: [BusinessProfileImagesComponent, BusinessProfileMenuComponent, BusinessProfileUserComponent,
            MatExpansionModule],
  templateUrl: './business-profile.component.html',
  styleUrl: './business-profile.component.css'
})
export class BusinessProfileComponent {

}
