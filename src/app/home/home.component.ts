import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { BusinessService, ImageService } from '../app-services';
import { LoadingComponent } from '../features/loading/loading.component';
import { BusinessFIND } from '../models/businessFind.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  businesses: any = [];
  rando: number;
  Loading: Boolean = true;
  b = {"b_rating": 5};
  businessesProfImgs: any = [];
  businessListFiltered: BusinessFIND[] = [];
  _Featured: any;

  constructor(private bServe: BusinessService,
              private iServe: ImageService) {}

  SV_testimonies = [
    {username: "Travis",
    userpic: "../../assets/images/userpics/Trav.jpeg",
    testimony: "STELLLLLLLLLLLLLLLAAAAAAAAAAAAAAAAAA"},
     {username: "Sam",
    userpic: "https://fireflyautomatix.com/wp-content/uploads/2023/12/FF-TEAM-.jpg",
    testimony: "Aaron's a real sun of a gon"},
    {username: "Aaron",
    userpic: "https://static.wixstatic.com/media/f729b5_b6a7f7b0b24c4399b94117b6ebb059ca~mv2.png/v1/crop/x_864,y_0,w_2967,h_3393/fill/w_722,h_825,al_c,q_90,usm_0.33_1.00_0.00,enc_auto/IMG_9116-AAE-24_69M.png",
    testimony: "I slept through another meeting!"},
    {username: "Other Trav",
    userpic: "https://media.licdn.com/dms/image/D5603AQEuNH-aNo6F7w/profile-displayphoto-shrink_200_200/0/1707261040582?e=2147483647&v=beta&t=S8Qff8mGKEl5gPuLxLAqn_vG0tpKW57tnP7BGXDv6Aw",
    testimony: "STALLA VAY MY GUY!"},
  ];
  
  ngOnInit(): void {
    this.getData();
    // console.log('Entered')
  }

  async getData() {
    this.businesses = await this.bServe.fetchBusinesses().toPromise();
    const fetchedProfImgs = await this.iServe.getBusProfileImages();

    if (fetchedProfImgs !== undefined) {
      
    }

    if (this.businesses !== undefined ) {
      // console.log(this.businesses.length)

      this.rando = this.getRandoNumber(this.businesses.length - 1, 0)
      // console.log(this.rando)
      this.Loading = false;
    }

    if (fetchedProfImgs !== undefined) {
      this.businessesProfImgs = fetchedProfImgs;
      // console.log(this.businessesProfImgs);
      // Iterate through each business record
      this.businesses.forEach(business => {
      // Find corresponding b_profImage for the current business b_id
      
      const matchingImg = this.businessesProfImgs.find(b => b.b_id === business.b_id);

      // If there's a matching image, update the business record
      if (matchingImg) {
        business.b_profImage = matchingImg.b_profImage;
        business.u_profImage = matchingImg.u_profImage;
      }}
      )
      // //console.log(this.businesses);
    //  // console.log(this.businessesProfImgs);
      // console.log(this.businessListFiltered);

      this.businessListFiltered = this.businesses;
  
      // console.log(this.businessListFiltered)
      this._Featured = this.businessListFiltered[this.rando]
    }
  }

  getRandoNumber(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
