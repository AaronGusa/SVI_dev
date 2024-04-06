
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'; 
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReviewService } from '../../../app-services';
import { UserProfileService } from '../../../app-services';
import { BusinessService } from '../../../app-services';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from '../../../features/loading/loading.component';

@Component({
  selector: 'app-du-reviews',
  standalone: true,
  imports: [DatePipe, MatExpansionModule, MatButtonModule, MatSnackBarModule, LoadingComponent],
  templateUrl: './du-reviews.component.html',
  styleUrl: './du-reviews.component.css'
})
export class DuReviewsComponent implements OnInit{
    businesses: any;
    reviewArray: any;
    busreviewArray: any[] = [];
    username: string;

    isLoading: Boolean = false;

    constructor(private rServe: ReviewService,
                private r: ActivatedRoute,
                private uPServe: UserProfileService,
                private bServe: BusinessService 
                ) {}

    ngOnInit() {
        this.isLoading = true;
        this.getBusinesses();

        this.username = this.r.parent.snapshot.paramMap.get('clientUsername');

        // console.log('Username In Reviews: ' + this.username)
        this.getUserId(this.username);
        

        this.isLoading = false;

    }

    async getUserId(username) {
        const response = await this.uPServe.getUsername(username);
        await this.getReviews(response.u_id);
        // console.log('let us check' + JSON.stringify(this.businesses))
        // console.log('And the reviewArray: ' + this.reviewArray)
        //this.reviewBusinessNames();

        //this.isLoading = false;
    }

    async getBusinesses() {
        const businessesResponse = await this.bServe.fetchBusinesses().toPromise();
        
        this.businesses = JSON.parse(JSON.stringify(businessesResponse));
        // console.log('Businesses: ' + JSON.stringify(this.businesses))
    }

    async reviewBusinessNames() {
        if (!this.businesses || !this.reviewArray) {
            // console.log('Uh Oh, this.business is not loaded' + this.businesses + ' Or maybe the ReviewArray is not working ' + this.reviewArray);
            return; // Ensure businesses and reviewArray are available
        }
        // //console.log('Entered reviewBusinessNames');
        let newArray = [];
        for (let i = 0; i < this.reviewArray.length; i++) {
            const review = this.reviewArray[i];
            const matchingBusiness = this.businesses.find(business => business.b_id === review.b_id);
            if (matchingBusiness) {
                //Create a key and push the matching business b_name into the review[i]
                review.b_name = matchingBusiness.b_name;
                //add to newArray
                newArray.push(this.reviewArray[i]);
            }
        }
        //When complete set newArray as this.reviewArray
        this.reviewArray = newArray;
        // console.log('Exited reviewBusinessNames: ' + this.reviewArray);
    }

    //review.businessName = matchingBusiness.b_name; 

    async getReviews(id: number) {
        const response = await this.rServe.getUserReviews(id);
        // console.log('Response: ' + JSON.stringify(response))
        if (response.length > 0) {
            this.reviewArray = response;
            // console.log(this.reviewArray);
        } else {
            // console.log('Error in the reviewArray' + JSON.stringify(response));
        };

        this.reviewBusinessNames();
        // console.log('LOOKIE HERE!')
        // console.log(this.reviewArray);
    }

    // userId: number = 1005;


}
