import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../../features/loading/loading.component';
import { ZipSearchComponent } from './bus-searchers/zip-search/zip-search.component';
import { ServiceSearchComponent } from './bus-searchers/service-search/service-search.component';
import { CitySearchComponent } from './bus-searchers/city-search/city-search.component';
import { BusinessService, ServiceService, ImageService } from '../../app-services';
import { BusinessFIND } from '../../models/businessFind.model';
import { Service } from '../../models/service.model';
import { Category } from '../../models/category.model';
import { RefineSearchMenuComponent } from '../../features/refine-search-menu/refine-search-menu.component';
import { RatingFilterComponent } from './bus-searchers/rating-filter/rating-filter.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { ToggleFilterComponent } from './bus-searchers/toggle-filter/toggle-filter.component';
import { CommonModule, AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-find-business',
  standalone: true,
  imports: [ReactiveFormsModule,
            LoadingComponent, 
            CommonModule,
            CitySearchComponent, 
            ServiceSearchComponent, 
            ZipSearchComponent,
            RatingFilterComponent,
            ToggleFilterComponent,
            MatExpansionModule,
            MatPaginatorModule,
            MatButton,
            MatCardModule,
            RouterModule,
            AsyncPipe
          ],
  templateUrl: './find-business.component.html',
  styleUrl: './find-business.component.css',
  encapsulation: ViewEncapsulation.None
})
export class FindBusinessComponent implements OnInit, AfterViewInit {
  @ViewChild('auto') auto!: MatAutocompleteModule;
  myControl = new FormControl('');

  loading: Boolean = true;
  selectedZip: Boolean = false;
  formcontrol = new FormControl('');
  // Business Variables
  businesses: any = [];
  businessListFiltered: BusinessFIND[] = [];
  businessesProfImgs: any = [];
  // Categories and Services Variables
  categories: any = [];
  services: Service[] = [];
  servicesData: any = [];

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
    private imageService: ImageService
  ) {}

  async ngOnInit() {
    await this.fetchData();
    this.businessListFiltered = this.businesses;
    //console.log(this.businessListFiltered)
  }

  ngAfterViewInit() {
    this.businessListFiltered = this.businesses;
  }

  onInput() {
    this.selectedZip = true;
  }

  async fetchData() {
    try {
      const fetchedBusinesses = await this.businessService.fetchBusinesses().toPromise();
      const fetchedCategories = await this.serviceService.fetchCategories().toPromise();
      const fetchedProfImgs = await this.imageService.getBusProfileImages();
      const fetchedServices = await this.serviceService.fetchCategories2().toPromise();


      if (fetchedBusinesses !== undefined) {
        this.businesses = fetchedBusinesses;
      }; 

      if (fetchedCategories !== undefined) {
        this.categories = fetchedCategories;
      };

      if (fetchedProfImgs !== undefined) {
        this.businessesProfImgs = fetchedProfImgs;
        //console.log(this.businessesProfImgs);
        // Iterate through each business record
        this.businesses.forEach(business => {
        // Find corresponding b_profImage for the current business b_id
        const matchingImg = this.businessesProfImgs.find(b => b.b_id === business.b_id);

        // If there's a matching image, update the business record
        if (matchingImg) {
          business.b_profImage = matchingImg.b_profImage;
        }}
        )
        //console.log(this.businesses);
       // console.log(this.businessesProfImgs);
        //console.log(this.businessListFiltered);

        this.businessListFiltered = this.businesses;
    
        //console.log(this.businessListFiltered)

      }
      

      if (fetchedServices !== undefined ) {
        this.servicesData = fetchedServices;
      };

      this.createZipList();
      this.createCityList();
      
      if (this.zipList.length >= 1 && this.cityList.length >= 1) {
        // console.log('Ziplist line 99');
        // console.log(this.zipList);
        // console.log('CityList Line 101');
        // console.log(this.cityList);
        this.loading = false;
      }
      
      //console.log(this.businesses);
      //console.log(this.categories);
      //console.log(this.servicesData)
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
        business.b_services && Array.isArray(business.b_services) && // Check if b_services is an array
        this.selectedServices.some(serviceId =>
          business.b_services.includes(serviceId)
        )
      );
  
      //  this.businessListFiltered = this.businessListFiltered.filter(business =>
      //   this.selectedServices.some(serviceId =>
      //     business.b_services.includes(serviceId)
      //   )
      //   )

      //   };
    } 
    // else {
    //   console.log('No services found');
    // }
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

    
    //console.log(filters.selectedServices);

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
    //console.log('Entered sortRatingFilter CONFIRMED')
    this.handleCombinedFilters();
  }
  
  applyShowActiveOnly(value: boolean) {
    this.sortActiveOnly = value;
    this.handleCombinedFilters();
  }

  findSName(s_id: number): number {
    const service = this.servicesData.find((service) => service.s_id === s_id);
    return service ? service.s_name : 'Unknown Service';
  }

  async getBusPic(b_id: string) {
    const foundBusiness = this.businessesProfImgs.find(business => business.b_id === b_id);
    //console.log(foundBusiness)


    
  }

}
