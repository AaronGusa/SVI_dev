import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { DashUserComponent } from './dash-user/dash-user.component';
import { DashBusComponent } from './dash-bus/dash-bus.component';
import { DashAdminComponent } from './dash-admin/dash-admin.component';
import { DashSideMenuComponent } from './dash-side-menu/dash-side-menu.component'; 
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../app-services';
import { UserProfileService } from '../app-services/userProfile.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashSideMenuComponent,
            MatSidenavModule,
            MatButtonModule,
            MatSelectModule,
            MatFormFieldModule,
            DashUserComponent, 
            DashBusComponent,
            DashAdminComponent,
            RouterOutlet,
          ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  @Output() UserProf: User[] = [];  
  @Output() Profile: any = "";
  userProfileSubscription: Subscription;

  u_priv: number = 10;
  private Usrlvl = 3;
  private Buslvl = 2;
  private Admin  = 1;
  usrlvl = this.Usrlvl;
  buslvl = this.Buslvl;
  admin = this.Admin;
  u_name: string = "";
  prof: any;
  data: any;
  userInfo: any;

  constructor( private r: ActivatedRoute,
               private userService: UserService,
               private userProfileService: UserProfileService 
    ) {}

  async ngOnInit() {
    // Grab username from params
    this.r.params.subscribe(params => {
      console.log("r params " + params['clientUsername']);
      this.u_name = params['clientUsername'];
    });
    this.showUserData();
    // this.Profile = this.userProfileService.getUsername(this.u_name);
    //   console.log("Dashboard Investigation")
    //   console.log(typeof this.Profile)
    //   console.log(this.Profile)
    // this.userProfileSubscription = this.userProfileService.loadUserProfile(this.u_name).subscribe(userProfile => {
    //   // Handle user profile data
    // });
  }

  ngOnDestroy(): void {
    if (this.userProfileSubscription) {
      this.userProfileSubscription.unsubscribe();
    }
  }

  async loadUserProfile() {
    // Fetch client profile
    this.Profile = await this.userService.fetchUsername(this.u_name);
    console.log('Profile: ' + this.Profile)
  }

  async showUserData() {
    let response = await this.userProfileService.getUsername('testeroni')
    if (response) {
      console.log('Response: ' + response.json());
      this.u_priv = response.u_priv;
      console.log(this.u_priv)
    } else {
      console.log('No response for showUserData')
    }
  }

}
