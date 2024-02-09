import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../../features/loading/loading.component';
import { ZipSearchComponent } from './bus-searchers/zip-search/zip-search.component';
import { ServiceSearchComponent } from './bus-searchers/service-search/service-search.component';
import { CitySearchComponent } from './bus-searchers/city-search/city-search.component';
import { BusinessService, ServiceService } from '../../app-services';
import { Business } from '../../models/business.model';
import { Service } from '../../models/service.model';
import { Category } from '../../models/category.model';
import { RefineSearchMenuComponent } from '../../features/refine-search-menu/refine-search-menu.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';



@Component({
  selector: 'app-find-business',
  standalone: true,
  imports: [ReactiveFormsModule,
            LoadingComponent, 
            CitySearchComponent, 
            ServiceSearchComponent, 
            ZipSearchComponent,
            RefineSearchMenuComponent,
            MatExpansionModule  
          ],
  templateUrl: './find-business.component.html',
  styleUrl: './find-business.component.css'
})
export class FindBusinessComponent {
  @ViewChild('auto') auto!: MatAutocompleteModule;
  myControl = new FormControl('');

  loading: Boolean = true;
  selectedZip: Boolean = false;
  formcontrol = new FormControl('');
  // Business Variables
  businesses: Business[] = [];
  businessListFiltered: Business[] = [];
  // Categories and Services Variables
  categories: Category[] = [];
  services: Service[] = [];
  selectedServices: any[] = [];
  // Zip and City Variables
  zipList: any[] = [];
  zipListFiltered: any[] = [];
  zipSelect: string = '';
  cityList: any[] = [];
  cityListFiltered: any[] = [];
  citySelect: string = '';
  zipFieldSelected: boolean = true;
  cityFieldSelected: boolean = true;

  // Refine Search Variables
  noSearch: boolean = true;
  sortName: boolean = false;
  sortRating: number = 0;
  sortActiveOnly: boolean = false;

  

  constructor(
    private businessService: BusinessService,
    private serviceService: ServiceService,
  ) {}

  async ngOnInit() {
    await this.fetchData();
    console.log(this.businesses);
      console.log(this.categories);
    this.businessListFiltered = this.businesses;
    //console.log(this.businessListFiltered)
  }

  onInput() {
    this.selectedZip = true;
  }

  async fetchData() {
    try {
      const fetchedBusinesses = await this.businessService.fetchBusinesses().toPromise();
      const fetchedCategories = await this.serviceService.fetchCategories().toPromise();
      console.log(this.businesses);
      console.log(this.categories);

      if (fetchedBusinesses !== undefined) {
        this.businesses = fetchedBusinesses;
      } else {
        [{"_id":"64cac0ceeef1b2bf990b661d","b_id":"23-0001","b_name":"Mock-tastic Nails","b_discipline":{"$numberInt":"2"},"b_street":"1234 N 5678 W","b_city":"Salt Lake City","b_state":"UT","b_zip":"84101","b_phone":"801-555-1111","b_email":"mocktasticnails@example.com","b_website":"www.mocktasticnails.com","b_services":[{"$numberInt":"1001"},{"$numberInt":"1002"},{"$numberInt":"1003"}],"b_rating":{"$numberDouble":"4.2"},"b_active":true,"u_id":{"$numberInt":"1001"},"created":"2023-08-01T12:00:00.000Z"}
        ]
      }

      if (fetchedCategories !== undefined) {
        this.categories = fetchedCategories;
      }
      this.createZipList();
      this.createCityList();
      if (this.zipList.length >= 1 && this.cityList.length >= 1) {
        console.log('Ziplist line 99');
        console.log(this.zipList);
        console.log('CityList Line 101');
        console.log(this.cityList);
        this.loading = false;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  createZipList() {
    this.zipList = [...new Set(this.businesses.map((business) => business.b_zip))];
    this.zipList.sort((a, b) => parseInt(a) - parseInt(b));
  }

  createCityList() {
    this.cityList = [...new Set(this.businesses.map((business) => business.b_city))];
    this.cityList.sort((a, b) => parseInt(a) - parseInt(b));
  }

  handleCombinedFilters() {
    const zipSelect = this.zipSelect || '';
    const citySelect = this.citySelect || '';
  
    if (zipSelect.trim() === '' && citySelect.trim() === '') {
      this.businessListFiltered = this.businesses;
    } else {
      // Filter based on zip and city
      this.businessListFiltered = this.businesses.filter(business =>
        (!zipSelect || business.b_zip.toLowerCase().includes(zipSelect.toLowerCase())) &&
        (!citySelect || business.b_city.toLowerCase().includes(citySelect.toLowerCase()))
      );
    }

    if (this.selectedServices && this.selectedServices.length > 0) {
      
  
       this.businessListFiltered = this.businessListFiltered.filter(business =>
        this.selectedServices.some(serviceId =>
          business.b_services.includes(serviceId)
        )
        );
    } else {
      console.log('No services found');
    }
     // Call the new sorting and filtering function
     this.handleSortingAndFiltering();

  }

  applyFilters(filters: { zip: string, city: string, selectedServices: number[] }) {
    let { zip, city, selectedServices = [] } = filters;
    
    if (this.zipSelect !== '' && zip === undefined) {
      filters.zip = this.zipSelect;
    } else {
      this.zipSelect = zip;
    };

    if (this.citySelect !== '' && city === undefined) {
      filters.city = this.citySelect;
    } else { 
      this.citySelect = city;
    }

    this.selectedServices = filters.selectedServices;

    
    console.log(filters.selectedServices);

    this.handleCombinedFilters();
  }

  handleSortingAndFiltering() {
    let filteredList = this.businessListFiltered.slice(); // Create a copy of the list

    if (this.sortName) {
      const searchTerm = "the ";
      filteredList.sort((a, b) => 
          //a.b_name.localeCompare(b.b_name));
          {
            const nameA = a.b_name.toLowerCase().startsWith(searchTerm) ? a.b_name.slice(searchTerm.length) : a.b_name;
            const nameB = b.b_name.toLowerCase().startsWith(searchTerm) ? b.b_name.slice(searchTerm.length) : b.b_name;
        
            return nameA.localeCompare(nameB);
          })
    }

    if (this.sortRating > 0) {
      filteredList = filteredList.filter(business => business.b_rating >= this.sortRating);
      filteredList.sort((a, b) => b.b_rating - a.b_rating);
    }

    if (this.sortActiveOnly) {
      filteredList = filteredList.filter(business => business.b_active);
    }

    this.businessListFiltered = filteredList;
  }

  onSearchSelected() {

    this.noSearch = false;
  }

  onCityFieldSelected() {
    this.noSearch = false;
  }

  

  applyFilterByName(value: boolean) {
    this.sortName = value;
    this.handleCombinedFilters();
  }
  
  applyRatingFilter(value: number) {
    this.sortRating = value;
    this.handleCombinedFilters();
  }
  
  applyShowActiveOnly(value: boolean) {
    this.sortActiveOnly = value;
    this.handleCombinedFilters();
  }

}
