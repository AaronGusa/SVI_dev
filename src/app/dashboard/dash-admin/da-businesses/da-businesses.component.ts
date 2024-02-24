import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BusinessService } from '../../../app-services';
import { Business } from '../../../models/business.model';


@Component({
  selector: 'app-da-businesses',
  standalone: true,
  imports: [],
  templateUrl: './da-businesses.component.html',
  styleUrl: './da-businesses.component.css'
})
export class DaBusinessesComponent implements OnInit, AfterViewInit {
  businesses: Business[] = [];


  constructor(private businessService: BusinessService) {}

 async ngOnInit() {
    await this.allBusinesses();
      this.allBusinesses();
  };

  ngAfterViewInit() {
    this.businesses;
  }
  async allBusinesses() {
    try {
      const fetchedBusinesses = await this.businessService.fetchBusinesses().toPromise();
      
      if (fetchedBusinesses !== undefined) {
        this.businesses = fetchedBusinesses;
      }; 

    } catch (error) {
      console.log(error);
    }
  }
}
