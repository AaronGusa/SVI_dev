import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

import { BusinessService } from '../../../app-services'; 
import { Business } from '../../../models/business.model';

import { LoadingComponent } from '../../../features/loading/loading.component';


@Component({
  selector: 'app-du-bus-favs',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    LoadingComponent,
    DatePipe,
    RouterLink
  ],
  templateUrl: './du-bus-favs.component.html',
  styleUrl: './du-bus-favs.component.css'
})
export class DuBusFavsComponent implements OnInit {

businesses: Business[] = [];
userFavs = [];
activeFavorites = [];
inactiveFavorites = [];
Loading: boolean = true;
favorited: Boolean = true;
// businesses = [{b_name: "Business 1", b_service: "Hair", b_rating: "⭐⭐⭐"}];
user = {
  u_id: 1,
  u_phone: "123-456-7890",
  u_email: "example@example.com",
  u_street: "123 Example St",
  u_city: "Example City",
  u_country: "Example Country",
  u_username: "exampleuser",
  u_fname: "John",
  u_lname: "Doe",
  u_zip: "12345",
  u_priv: 1,
  hashedPassword: "hashedpassword123",
  u_favs: [
      {
          b_id: "23-0001",
          s_id: [1001, 1002, 1003],
          ufav_created: new Date("2023-01-15"),
          ufav_last_updated: new Date("2023-03-20"),
          ufav_notes: "This is my favorite restaurant.",
          sub_active: true,
          ufav_unfav: null
      },
      {
          b_id: "23-0023",
          s_id: [3],
          ufav_created: new Date("2023-02-10"),
          ufav_last_updated: new Date("2023-04-05"),
          ufav_notes: "Great place for coffee!",
          sub_active: true,
          ufav_unfav: null
      },
      {
          b_id: "23-0028",
          s_id: [1, 2, 3],
          ufav_created: new Date("2023-03-05"),
          ufav_last_updated: new Date("2023-05-15"),
          ufav_notes: "They have amazing desserts.",
          sub_active: false,
          ufav_unfav: new Date("2023-07-20")
      }
  ]
};

constructor(private bServe: BusinessService) {}

async ngOnInit() {
  await this.getBusinesses();
  //const { activeFavorites, inactiveFavorites } = this.makeUFavs( this.businesses, this.user);
  //this.activeFavorites = activeFavorites;
  //this.inactiveFavorites = inactiveFavorites;
  this.Loading = false;
}

async getBusinesses() {
  try {
    const fetchedBusinesses = await this.bServe.fetchBusinesses().toPromise();
    
    if (fetchedBusinesses !== undefined) {
      this.businesses = fetchedBusinesses;
      // this.businessTrue = true;
    }; 
    this.getUserFaves();
  } catch (error) {
    console.log(error);
  }
}

getUserFaves() {
  
  const data = localStorage.getItem('fav_bus_list');
  const fav_bus = data ? JSON.parse(data) : null;
  //const fav_bus = currentdata['fav_bus']; 
  


  if (fav_bus && fav_bus.length > 0) {
    this.activeFavorites = [];

    fav_bus.forEach((b_id) => {
        const favoriteBusiness = this.businesses.find(business => business.b_id === b_id);
        if (favoriteBusiness) {
            this.activeFavorites.push(favoriteBusiness);
        }

    });

    console.log('Active favorites:', this.activeFavorites);
}

}

///////////=============================================================== Fleshed out favor
// makeUFavs(businesses: Business[], user) {
//   const activeFavorites = [];
//   const inactiveFavorites = [];

//   // Iterate through each favorite object in the user's profile
//   for (const favorite of user.u_favs) {
//       // Find the business with matching b_id
//       const business = businesses.find(b => b.b_id === favorite.b_id);
//       // If business is found, construct the UserFavorite object
//       if (business) {
//           const favoriteBusiness = {
//               ...business,
//               ufav_created: favorite.ufav_created,
//               ufav_last_updated: favorite.ufav_last_updated,
//               ufav_notes: favorite.ufav_notes,
//               sub_active: favorite.sub_active,
//               ufav_unfav: favorite.ufav_unfav
//           };
//           // Push the favorite into the appropriate array based on sub_active value
//           if (favorite.sub_active) {
//               activeFavorites.push(favoriteBusiness);
//           } else {
//               inactiveFavorites.push(favoriteBusiness);
//           }
//       }
//   }

//   return { activeFavorites, inactiveFavorites };
// }



}
