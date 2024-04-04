import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';



@Component({
  selector: 'app-service-search',
  standalone: true,
  imports: [MatExpansionModule, MatButtonToggleModule],
  templateUrl: './service-search.component.html',
  styleUrl: './service-search.component.css'
})
export class ServiceSearchComponent implements OnInit {
  @Input() categories: any[] = [];
  @Output() servicesSelected: EventEmitter<number[]> = new EventEmitter<number[]>();

  selectedCategories: number[] = [];
  services: any[] = [];
  filteredServices: any[] = [];
  showBusinessForm: boolean = false;
  panelOpenState: boolean = false;

  async ngOnInit() {
    //console.log('Service-search Line 25')
    //console.log(this.categories);
    this.sortCategories();
    //console.log("This Service Search Cat List: " + this.categories)
  }

  sortCategories() {
    this.categories.sort((a, b) => {
      if (a && a.cat && b && b.cat) {
        const catA = a.cat.toUpperCase();
        const catB = b.cat.toUpperCase();
        if (catA < catB) {
          return -1;
        }
        if (catA > catB) {
          return 1;
        }
        return 0;
      } else {
        // Handle case where 'cat' property is undefined
        return 0; // No sorting needed
      }
      // if (a && a.cat && b && b.cat) {
      //   const catA = a.cat.toUpperCase(); // Convert to uppercase for case-insensitive sorting
      //   const catB = b.cat.toUpperCase();
      
      //   if (catA < catB) {
      //     return -1; // catA comes before catB
      //   }
      //   if (catA > catB) {
      //     return 1; // catA comes after catB
      //   }
      //     return 0; // catA and catB are equal
      // }

    });
  };

  //Add selected services to array
  toggleCategory(categoryId: number) {
    const index = this.selectedCategories.indexOf(categoryId);

    if (index === -1) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories.splice(index, 1);
    }

    this.updateFilteredServices();
  }

  // Update filtered services array
  updateFilteredServices() {
    this.filteredServices = this.services.filter(service => this.selectedCategories.includes(service.cat_id));
  }


  onServiceSelected(serviceId: number) {
    const index = this.selectedCategories.indexOf(serviceId);

  if (index === -1) {
    this.selectedCategories.push(serviceId);
  } else {
    this.selectedCategories.splice(index, 1);
  }
  //console.log(this.selectedCategories);

   // Sort the array in ascending order
   this.selectedCategories.sort((a, b) => a - b);

  // Emit the updated array
  this.servicesSelected.emit(this.selectedCategories);
  }
}
