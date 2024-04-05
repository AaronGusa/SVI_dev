import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from '../../../app-services';

@Component({
  selector: 'app-business-profile-images',
  standalone: true,
  imports: [],
  templateUrl: './business-profile-images.component.html',
  styleUrl: './business-profile-images.component.css'
})
export class BusinessProfileImagesComponent implements OnInit{
@Input() b_id: string;
@Input() allServices: any;
data: any;
imagesAndServices: any;
s_name: string;

constructor(
    private iServe: ImageService
) {}

ngOnInit(): void {
  this.getBusImages();
}

async getBusImages() {
  this.data = await this.iServe.fetchBusImages(this.b_id);
  if (this.data !== undefined) {
    this.imagesAndServices = this.data[0].b_images;
    this.imagesAndServices = this.imagesAndServices[0];
    this.s_name = this.findServiceNameById(this.imagesAndServices.s_id)
    console.log(this.imagesAndServices);

  }
}

findServiceNameById(id: number): string | undefined {
  const service = this.allServices.find(service => service.s_id === id);
  return service ? service.s_name : undefined;
}


}
