import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessService } from './business.service';
import { ImageService } from './image.service';
import { ReviewService } from './review.service';
import { ServiceService } from './service.service';
import { UserService } from './user.service';


@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    BusinessService,
    ImageService,
    ReviewService,
    ServiceService,
    UserService
  ],
  exports: [
    BusinessService,
    ImageService,
    ReviewService,
    ServiceService,
    UserService
  ]
})
export class AppServicesModule { }
