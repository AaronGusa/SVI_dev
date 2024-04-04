import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessProfileImagesComponent } from './business-profile-images/business-profile-images.component';
import { BusinessProfileMenuComponent } from './business-profile-menu/business-profile-menu.component';
import { BusinessProfileUserComponent } from './business-profile-user/business-profile-user.component';
import { BusinessProfileReviewsComponent } from './business-profile-reviews/business-profile-reviews.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { ActivatedRoute, RouterModule, Params } from '@angular/router';
import { LoadingComponent } from '../../features/loading/loading.component';
import { CalendarComponent } from '../../commonelements/calendar/calendar.component';

import { BusinessService, UserService } from '../../app-services';
import { ImageService } from '../../app-services';
import { ServiceService } from '../../app-services';
import { AuthStore } from '../../app-services/auth/auth.store';



@Component({
  selector: 'app-business-profile',
  standalone: true,
  imports: [BusinessProfileImagesComponent, BusinessProfileMenuComponent, BusinessProfileUserComponent,
      BusinessProfileReviewsComponent, MatExpansionModule, MatTabsModule, RouterModule, LoadingComponent,
      CalendarComponent, MatButtonModule, MatButtonToggleModule, CommonModule],
  templateUrl: './business-profile.component.html',
  styleUrl: './business-profile.component.css'
})
export class BusinessProfileComponent implements OnInit{
  b_id: string = '';
  bData: any;
  isLoading: Boolean = true;
  profileImages: any;
  allServices: any;
  services: any;
  servComplete: any = [];
  favorited: Boolean = false;

  constructor(private aroute: ActivatedRoute,
              private bServe: BusinessService,
              private uServe: UserService,
              private iServe: ImageService,
              private sServe: ServiceService,
              public auth: AuthStore
    ) {}

  async ngOnInit() {
    this.checkFavs();
    this.isLoading = true;
    this.b_id = this.aroute.snapshot.paramMap.get('b_id');
    //this.getBusiness(this.b_id);
    this.bServe.fetchBusiness(this.b_id).subscribe((data) => {
      this.bData = data;
      this.services = this.bData.b_services;
      //console.log(this.services);
    });
    this.getBusinessProfileImages(this.b_id);
    
    
    this.fetchExtractServices();
    // console.log(this.profileImages)

  }
  
  async getBusinessProfileImages(b_id: string) {
    this.isLoading = true;
    this.profileImages = await this.iServe.getBusProfileImage(b_id);
    this.isLoading = false;
  };

  async checkFavs() {
    const data = localStorage.getItem("fav_bus_list");
    const fav_list = data ? JSON.parse(data) : null;
    //const fav_list = currentdata['fav_bus'];
    const businessID = this.aroute.snapshot.paramMap.get('b_id');
    //console.log('FavList: ' + fav_list + " " + 'B_ID: ' + " " + businessID ); 

    if (fav_list.includes(businessID)) {
      this.favorited = true;
    } else {
      this.favorited = false;
    }

  }

  // async fetchExtractServices() {
  //   const servicesData = await this.sServe.fetchServices();
  //   for (let service of this.services; let i ++ 1) {
  //     //For each s_id search servicesData, create new entry in servComplete array
      
  //   }

  // }

  async fetchExtractServices() {
    this.allServices = await this.sServe.fetchServices().toPromise();
    //console.log('ServiceData: ' + JSON.stringify(this.allServices))
     
    for (let service of this.services) {
        let foundService = await this.sServe.fetchSID(service); 
        //foundService = JSON.stringify(foundService)

        //console.log("FoundService" + foundService);
        if (foundService) {
          this.servComplete.push(foundService); // Push s_name to s_names array
        } else {
          this.servComplete.push(null); // Push null if no matching service found
        }
      }
      //console.log(this.servComplete[0])
    }

    async favoriteBus() {
      const favBusList = localStorage.getItem("fav_bus_list");
  
      const favBusArray = favBusList ? JSON.parse(favBusList) : [];
  
      const authData = localStorage.getItem("auth_data");
      const userID = authData ? JSON.parse(authData)['u_id'] : null;
      
      const businessID = this.aroute.snapshot.paramMap.get('b_id');
  
      if (userID && businessID) {
          const response = await this.uServe.favoriteUpdate(userID, businessID);
          
          this.favorited = !this.favorited;
  
          if (this.favorited) {
              if (!favBusArray.includes(businessID)) {
                  favBusArray.push(businessID);
              } else {
              }
          } else {
              const index = favBusArray.indexOf(businessID);
              if (index !== -1) {
                  favBusArray.splice(index, 1);
              } else {
                  console.log('Business not found in favorite list:', businessID);
              }
          }
  
          localStorage.setItem('fav_bus_list', JSON.stringify(favBusArray));
      } else {
          console.log("HOLY CRAP THERE'S AN ERROR");
      }
  }

    // async favoriteBus() {
    //   const localUID = localStorage.getItem("auth_data");
    //   console.log(localUID + " " + typeof localUID)

    //   const authData = localUID ? JSON.parse(localUID) : null;


    //   const userID = parseInt(authData['u_id']);
    //   console.log('Local Storage Pull Confirm: ' + userID);
    //   const businessID = this.aroute.snapshot.paramMap.get('b_id');
    //   console.log('Business Params Confirm: ' + businessID);
    //   //build payload
    //   if (userID && businessID) {
    //     const response = await this.uServe.favoriteUpdate(userID, businessID);
    //     console.log(response);
    //     this.favorited = !this.favorited;

    //     // Update auth_data.fav_bus in localStorage
    //     // Update auth_data.fav_bus in localStorage
    //     try {  
    //         if (this.favorited) {
    //             // Initialize fav_bus array if it doesn't exist
    //             console.log('authData: ', authData)
    //             authData['fav_bus'] = authData['fav_bus'] || [];
    //             console.log('Type of fav_bus:', typeof authData['fav_bus']); // Should print "object"

    //             if (!Array.isArray(authData['fav_bus'])) {
    //                 console.error('fav_bus is not an array:', authData['fav_bus']);
    //             } else {
    //                 if (!authData['fav_bus'].includes(businessID)) {
    //                     authData['fav_bus'].push(businessID);
    //                     console.log('Added businessID:', businessID);
    //                 } else {
    //                     console.log('BusinessID already exists in fav_bus:', businessID);
    //                 }
    //             }
    //         } else {
    //             // Remove businessID from fav_bus array
    //             authData['fav_bus'] = authData['fav_bus'] || [];
    //             const index = authData['fav_bus'].indexOf(businessID);
    //             if (index !== -1) {
    //                 authData['fav_bus'].splice(index, 1);
    //                 console.log('Removed businessID:', businessID);
    //             } else {
    //                 console.log('BusinessID not found in fav_bus:', businessID);
    //             }
    //         }
    //       } catch (error) {
    //         console.log("Error:" + error)
    //       }

    //     } else {
    //       console.log("HOLY CRAP THERE'S AN ERROR")
    //     }
      

    // }
}
  
