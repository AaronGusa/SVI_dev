import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'; 
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReviewService } from '../../../app-services';
import { UserProfileService } from '../../../app-services';
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
 
reviewArray: any;
username: string;

isLoading: Boolean = false;

constructor(private rServe: ReviewService,
            private r: ActivatedRoute,
            private uPServe: UserProfileService 
            ) {}

ngOnInit() {
    this.isLoading = true;
    this.username = this.r.parent.snapshot.paramMap.get('clientUsername');
    this.getUserId(this.username)
}

async getUserId(username) {
    const response = await this.uPServe.getUsername(username);

    this.getReviews(response.u_id);
    this.isLoading = false;
}

async getReviews(id: number) {
    const response = await this.rServe.getUserReviews(id);
    //console.log('Response: ' + JSON.stringify(response))
    if (response.length > 0) {
        this.reviewArray = response;
        this.isLoading = false;
    } else {
        console.log(JSON.stringify(response));
    }
}

userId: number = 1005;


}

//  localReviewArray: any[] = [
//     {
//         "_id": "64c92eb0eef1b2bf9978cb88",
//         "b_id": "23-0007",
//         "r_id": 14,
//         "u_id": 1005,
//         "cat_id": "003",
//         "s_id": "003-001",
//         "revDate": "2023-05-21T09:15:00.000Z",
//         "rating": 4,
//         "rev_content": "Great job! I would definitely come back!",
//         "active_review": true,
//         "revUpdate": "2023-07-28T17:26:40.125Z"
//     },
//     {
//         "_id": "64c92eb0eef1b2bf9978cb8d",
//         "b_id": "23-0007",
//         "r_id": 19,
//         "u_id": 1004,
//         "cat_id": "003",
//         "s_id": "003-001",
//         "revDate": "2023-05-26T09:15:00.000Z",
//         "rating": 4,
//         "rev_content": "Nice variety in the menu. Something for everyone!",
//         "active_review": true,
//         "revUpdate": "2023-08-01T19:15:00.000Z"
//     },
//     {
//         "_id": "64c92eb0eef1b2bf9978cb8e",
//         "b_id": "23-0007",
//         "r_id": 20,
//         "u_id": 1005,
//         "cat_id": "003",
//         "s_id": "003-001",
//         "revDate": "2023-05-27T09:15:00.000Z",
//         "rating": 4.8,
//         "rev_content": "Absolutely loved the dessert menu. Divine!",
//         "active_review": true,
//         "revUpdate": "2023-08-02T11:45:50.200Z"
//     },
//     {
//         "_id": "64c92eb0eef1b2bf9978cb90",
//         "b_id": "23-0007",
//         "r_id": 22,
//         "u_id": 1006,
//         "cat_id": "003",
//         "s_id": "003-001",
//         "revDate": "2023-05-29T09:15:00.000Z",
//         "rating": 4.2,
//         "rev_content": "The drinks were refreshing. Perfect for a hot day!",
//         "active_review": true,
//         "revUpdate": "2023-08-03T15:20:30.800Z"
//     },
//     {
//         "_id": "64c92eb0eef1b2bf9978cb91",
//         "b_id": "23-0007",
//         "r_id": 23,
//         "u_id": 1005,
//         "cat_id": "003",
//         "s_id": "003-001",
//         "revDate": "2023-05-30T09:15:00.000Z",
//         "rating": 5,
//         "rev_content": "Incredible flavors in every dish. A must-visit!",
//         "active_review": true,
//         "revUpdate": "2023-08-04T09:10:15.300Z"
//     },
//     {
//         "_id": "64c92eb0eef1b2bf9978cb93",
//         "b_id": "23-0007",
//         "r_id": 25,
//         "u_id": 1005,
//         "cat_id": "003",
//         "s_id": "003-001",
//         "revDate": "2023-06-01T09:15:00.000Z",
//         "rating": 4.6,
//         "rev_content": "Attentive service and a diverse menu. Loved it!",
//         "active_review": true,
//         "revUpdate": "2023-08-05T12:55:40.400Z"
//     },
//     {
//         "_id": "64c92eb0eef1b2bf9978cb94",
//         "b_id": "23-0007",
//         "r_id": 26,
//         "u_id": 1005,
//         "cat_id": "003",
//         "s_id": "003-001",
//         "revDate": "2023-06-02T09:15:00.000Z",
//         "rating": 4.4,
//         "rev_content": "Good place for gatherings. Spacious and friendly.",
//         "active_review": true,
//         "revUpdate": "2023-08-06T14:30:25.100Z"
//     },
//     {
//         "_id": "64c92eb0eef1b2bf9978cb96",
//         "b_id": "23-0007",
//         "r_id": 28,
//         "u_id": 1005,
//         "cat_id": "003",
//         "s_id": "003-001",
//         "revDate": "2023-06-04T09:15:00.000Z",
//         "rating": 4.9,
//         "rev_content": "Exceptional service and top-notch cuisine!",
//         "active_review": true,
//         "revUpdate": "2023-08-07T10:20:35.600Z"
//     },
//     {
//         "_id": "64c92eb0eef1b2bf9978cb98",
//         "b_id": "23-0007",
//         "r_id": 30,
//         "u_id": 1005,
//         "cat_id": "003",
//         "s_id": "003-001",
//         "revDate": "2023-06-06T09:15:00.000Z",
//         "rating": 4.3,
//         "rev_content": "Pleasant experience overall. Will return for sure!",
//         "active_review": true,
//         "revUpdate": "2023-08-08T16:40:50.750Z"
//     },
//     {
//         "_id": "64c92eb0eef1b2bf9978cb99",
//         "b_id": "23-0007",
//         "r_id": 31,
//         "u_id": 1005,
//         "cat_id": "003",
//         "s_id": "003-001",
//         "revDate": "2023-06-07T09:15:00.000Z",
//         "rating": 4.7,
//         "rev_content": "Tasty food and great ambiance. Loved the decor.",
//         "active_review": true,
//         "revUpdate": "2023-08-09T09:05:55.900Z"
//     },
//     {
//         "_id": "64c92eb0eef1b2bf9978cb9b",
//         "b_id": "23-0007",
//         "r_id": 33,
//         "u_id": 1005,
//         "cat_id": "003",
//         "s_id": "003-001",
//         "revDate": "2023-06-09T09:15:00.000Z",
//         "rating": 4.4,
//         "rev_content": "Friendly staff and a delightful dining experience.",
//         "active_review": true,
//         "revUpdate": "2023-08-10T11:55:30.300Z"
//     },
//     {
//         "_id": "64c92eb0eef1b2bf9978cb9d",
//         "b_id": "23-0007",
//         "r_id": 35,
//         "u_id": 1005,
//         "cat_id": "003",
//         "s_id": "003-001",
//         "revDate": "2023-06-11T09:15:00.000Z",
//         "rating": 4.9,
//         "rev_content": "Exquisite flavors and exceptional service!",
//         "active_review": true,
//         "revUpdate": "2023-08-11T15:25:25.500Z"
//     },
//     {
//         "_id": "64c92eb0eef1b2bf9978cb9e",
//         "b_id": "23-0007",
//         "r_id": 36,
//         "u_id": 1005,
//         "cat_id": "003",
//         "s_id": "003-001",
//         "revDate": "2023-06-12T09:15:00.000Z",
//         "rating": 4.2,
//         "rev_content": "The cocktails were fantastic. Creative mixology!",
//         "active_review": true,
//         "revUpdate": "2023-08-12T09:30:10.800Z"
//     },
//     {
//         "_id": "64c92eb0eef1b2bf9978cba0",
//         "b_id": "23-0007",
//         "r_id": 38,
//         "u_id": 1007,
//         "cat_id": "003",
//         "s_id": "003-001",
//         "revDate": "2023-06-14T09:15:00.000Z",
//         "rating": 4.7,
//         "rev_content": "Great value for money. Generous portions.",
//         "active_review": true,
//         "revUpdate": "2023-08-13T11:40:50.150Z"
//     },
//     {
//         "_id": "64c92eb0eef1b2bf9978cba1",
//         "b_id": "23-0007",
//         "r_id": 39,
//         "u_id": 1007,
//         "cat_id": "003",
//         "s_id": "003-001",
//         "revDate": "2023-06-15T09:15:00.000Z",
//         "rating": 4.6,
//         "rev_content": "Cozy ambiance and excellent service. Will return!",
//         "active_review": true,
//         "revUpdate": "2023-08-14T08:15:35.900Z"
//     }
// ]