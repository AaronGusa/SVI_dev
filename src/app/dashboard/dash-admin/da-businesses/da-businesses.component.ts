import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../../app-services';

@Component({
  selector: 'app-da-businesses',
  standalone: true,
  imports: [],
  templateUrl: './da-businesses.component.html',
  styleUrl: './da-businesses.component.css'
})
export class DaBusinessesComponent implements OnInit {
  businesses: any = [];

  constructor(private bservice: BusinessService) {}

   ngOnInit() {
      this.allBusinesses();
  };

  async allBusinesses() {
    try {
      this.businesses = await this.bservice.fetchBusinesses();
    } catch (error) {
      console.log(error);
    }
  }
}
