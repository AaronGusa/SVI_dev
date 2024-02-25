import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BusinessService } from '../../../app-services';
import { Business } from '../../../models/business.model';
import { LoadingComponent } from '../../../features/loading/loading.component';


@Component({
  selector: 'app-da-businesses',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './da-businesses.component.html',
  styleUrl: './da-businesses.component.css'
})
export class DaBusinessesComponent implements OnInit, AfterViewInit {
  businesses: Business[] = [];
  businessTrue: boolean = false;

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
        this.businessTrue = true;
      }; 

    } catch (error) {
      console.log(error);
    }
  }
}
