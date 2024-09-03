import { Component, OnInit, Input, Output, OnChanges, ViewChild, AfterViewInit, ElementRef, model, EventEmitter } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ServiceService } from '../../../app-services';
import { BusinessService } from '../../../app-services';
import { Router } from '@angular/router';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { LoadingComponent } from '../../../features/loading/loading.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';

type HOOSelected = 
  | { day: number; times: any[] }
  | { flexHours: boolean }
  | { sameHours: boolean };

@Component({
  selector: 'app-bus-sign',
  standalone: true,
  imports: [MatCheckboxModule, 
            LoadingComponent, 
            MatFormFieldModule, 
            MatStepperModule, 
            ReactiveFormsModule, 
            FormsModule,
            MatInputModule,
            MatCardModule,
            MatExpansionModule,
            MatButtonToggleModule,
            MatButtonModule,
            
          ],
  templateUrl: './bus-sign.component.html',
  styleUrl: './bus-sign.component.css'
})

export class BusSignComponent implements OnInit, AfterViewInit {
  @Input() _foundUser: number;
  @Input() username: string;
  @Output() servicesList: {};
  DOW: string[] = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  DOWSelectedArray: number[] = [];
  HOO: string[] = ['6:00A', '7:00A', '8:00A', '9:00A', '10:00A', '11:00A', '12:00P', '1:00P', '2:00P', '3:00P', '4:00P', '5:00P', '6:00P', '7:00P', '8:00P', '9:00P' ] 
  @Output() HOOSelectedEmit = new EventEmitter<any>();

  
  
  HOOSelectedArray = [
    { day: 0, times: [] }, // Sunday
    { day: 1, times: [] }, // Monday
    { day: 2, times: [] }, // Tuesday
    { day: 3, times: [] }, // Wednesday
    { day: 4, times: [] }, // Thursday
    { day: 5, times: [] }, // Friday
    { day: 6, times: [] },  // Saturday
    { day: 99, times: []}, // All days
    { flexHours: true }, // Indicates hours are flexible
    { sameHours: false } //  Indicates same hours for selected days 
  ];
  services: any[] = [];
  categories: any[] = [];
  selectedCategories: number[] = [];
  filteredServices: any[] = [];
  isLoading: boolean = false;
  duration: 1500;
  busServices: number[] = [];
  sameHours: boolean = true;
  flexHours: boolean = true;

  //form control
  bus_contact_form: FormGroup = this._formBuilder.group({busContactCtrl: ['']});
  bus_add_form: FormGroup = this._formBuilder.group({busAddCtrl: ['']});
  bus_signup_form: FormGroup
  busForm: FormGroup;

  mouseDown = false;
  lastButton: HTMLElement | null = null;


  @ViewChild('toggleGroup') toggleGroup: ElementRef;

  constructor(private servService: ServiceService,
    private _formBuilder: FormBuilder,
    private busService: BusinessService,
    private r: Router) {}

ngOnInit() {
  console.log('BUS_NGONINT_username: ' + this.username);
  console.log('BUS_NGONINT_foundUser: ' + this._foundUser);
  this.fetchCategories();

  this.busForm = this._formBuilder.group({
      b_id: [null],
      b_name: [null, Validators.required],
      b_email: [null, [Validators.required, Validators.email]],
      b_phone: [null],
      b_website: [null],
      b_street: [null],
      b_city: [null],
      b_state: [null],
      b_zip: [null],
      b_active: [null],
      b_services: [null],
      b_rating: [null],
      u_id: [null],
      created:[null]
    });
}

ngAfterViewInit() {
  this.toggleGroup.nativeElement.addEventListener('mousedown', () => {
    this.mouseDown = true;
  });

  this.toggleGroup.nativeElement.addEventListener('mouseup', () => {
    this.mouseDown = false;
  });

  // Array.from(this.toggleGroup.nativeElement.children).forEach((button: HTMLElement) => {
  //   button.addEventListener('mousemove', (event) => {
  //     if (this.mouseDown && event.target !== this.lastButton) {
  //       // Toggle the button
  //       (event.target as HTMLElement).click();
  //       this.lastButton = event.target as HTMLElement;
  //       // Get the hour value from the button element
  //     let hour = (event.target as HTMLElement).getAttribute('data-hour');

  //     // Run the HOOSelected function with the hour value
  //     if (hour) {
  //       this.HOOSelected(hour);
  //     }
  //     }
  //   });
  // });
  
  // Array.from(this.toggleGroup.nativeElement.children).forEach((button: HTMLElement) => {
  //   // Add a 'mousedown' event listener to run HOOSelected when the mouse button is pressed down
  //   button.addEventListener('mousedown', (event) => {
  //     let hour = (event.target as HTMLElement).getAttribute('data-hour');
  //     if (hour) {
  //       this.HOOSelected(hour);
  //     }
  //   });
  
  //   // Add a 'click' event listener to run HOOSelected when a click event occurs
  //   button.addEventListener('click', (event) => {
  //     let hour = (event.currentTarget as HTMLElement).getAttribute('data-hour');
  //     if (hour) {
  //       this.HOOSelected(hour);
  //     }
  //   });
  
  //   // Existing 'mousemove' event listener
  //   button.addEventListener('mousemove', (event) => {
  //     if (this.mouseDown && event.target !== this.lastButton) {
  //       // Toggle the button
  //       (event.target as HTMLElement).click();
  //       this.lastButton = event.target as HTMLElement;
  //     }
  //   });
  // });

  // document.addEventListener('mouseup', () => {
  //   this.mouseDown = false;
  //   this.lastButton = null;  // Reset the last button on mouse up
  // });


  //HTML SNIPPET
  // <mat-button-toggle-group #toggleGroup multiple class="hourList">
  //                           @for (hour of HOO; track $index) {
  //                               <mat-button-toggle [attr.data-hour]="hour">
  //                                   {{hour}}
  //                               </mat-button-toggle>
  //                           }
  //                       </mat-button-toggle-group>
}

// async fetchCategories() {
//   this.isLoading = true;
//   this.categories = await this.servService.fetchCategories().toPromise();
//   this.isLoading = false;
// }

async fetchCategories() {
  this.isLoading = true;
  try {
    this.categories = await this.servService.fetchCategories().toPromise();
  } catch (error) {
    console.error('Error fetching categories:', error);
  } finally {
    this.isLoading = false;
  }
}

addService2Business(serviceId: number) {
  if (this.busServices.includes(serviceId)) {
    this.busServices.splice(this.busServices.indexOf(serviceId), 1);
  } else {
    this.busServices.push(serviceId);
  };
}

async CompleteBusSign() {
  try{
    console.log('The services array: ' + this.busServices)

    this.busForm.patchValue({
      b_id:"tbd",
      b_active: true,
      b_rating: 0,
      u_id: this._foundUser,
      created: new Date(),
      b_services: this.busServices
    });

    console.log('Business Services: ' + JSON.stringify(this.busServices));

    // this.busForm = this._formBuilder.group({
    //   b_id: b_id_value,
    //   b_name: this.busForm.get('b_name').value,
    //   b_email: this.busForm.get('b_email').value,
    //   b_phone: this.busForm.get('b_phone').value,
    //   b_website: this.busForm.get('b_website').value,
    //   b_street: this.busForm.get('b_street').value,
    //   b_city: this.busForm.get('b_city').value,
    //   b_state: this.busForm.get('b_state').value,
    //   b_zip: this.busForm.get('b_zip').value,
    //   b_active: b_active_v alue,
    //   b_services: this.busServices,
    //   b_rating: b_rating_value,
    //   u_id: u_id_value,
    //   created: created_value
    // });

    //console.log('Business Form: ', this.busForm.value);

    this.processBusSignUp();

  } catch (error) {
    console.error('Error Creating Business: ', error);
  }

  //this.processBusSignUp();
} 

async processBusSignUp() {
  try{
    const busFormValue = this.busForm.value
    //console.log('this.busForm.value: ', this.busForm.value);
    this.isLoading = true;
    console.log('BUS_BusForm: ' + JSON.stringify(busFormValue)) 
    const posted: any = await this.busService.postBusiness(busFormValue);
    console.log('Business Posted: ', JSON.stringify(posted));
    
    if (posted.acknowledged === true) {
      console.log('Business Successfully POSTed!')
      this.isLoading = false;
      this.r.navigate([`/dashboard/${this.username}`]);
    } else {

      console.log('OH NOOOOOOOOOOOOOOOOOOOOO, something is still wrong!' + JSON.stringify(posted))
    };

  } catch (error) {
    console.error('Error Posting Business: ', error);
    return error;
  }
}

DOWSelected(day) {
  let index = this.DOWSelectedArray.indexOf(day);
  if (index !== -1) {
    // If day is in the array, remove it
    this.DOWSelectedArray.splice(index, 1);
    this.DOWSelectedArray.sort((a, b) => a - b);
    // console.log(day + " is removed from the array!");
  } else {
    // If day is not in the array, add it
    this.DOWSelectedArray.push(day);
    this.DOWSelectedArray.sort((a, b) => a - b);

    // console.log(day + " is added to the array!");
  }
  //console.log(this.DOWSelectedArray);
}

// HOOSelected(listnumber, time) {
//   let index = this.HOOSelectedArray.indexOf(listnumber);
  
//   if (index !== -1) {
//     if (index !== -1) {
//       // If hour is in the array, remove it
//       this.HOOSelectedArray.splice(index, 1);
//       // console.log(day + " is removed from the array!");
//     } else {
//       // If day is not in the array, add it
//       this.HOOSelectedArray.push(time);
//       // console.log(day + " is added to the array!");
//     }
//   }
//   console.log("HOO: " + this.HOOSelectedArray);
// }

HOOSelected(listnumber, time) {
  //console.log(listnumber)
  // Find the index of the day in the array
  console.log(this.DOWSelectedArray);
  let index = listnumber;
  console.log("Index: " + index)
  if (index === 99) {
    const daysOweek = 6;
    let i;
    //Check if the time is in the arrays
    for (i = 0; i < daysOweek; i++ ) {
      let timeIndex = this.HOOSelectedArray[i].times.indexOf(time);
      if (timeIndex !== -1) {
        // If the time is in the array, remove it
        this.HOOSelectedArray[i].times.splice(timeIndex, 1);
      } else {
        // If the time is not in the array, add it
        this.HOOSelectedArray[i].times.push(time);

      }
    }
  }

  if (index !== -1 && index !== 99) {
    // Check if the time is in the array
    let timeIndex = this.HOOSelectedArray[index].times.indexOf(time);
    if (timeIndex !== -1) {
      // If the time is in the array, remove it
      this.HOOSelectedArray[index].times.splice(timeIndex, 1);
    } else {
      // If the time is not in the array, add it
      this.HOOSelectedArray[index].times.push(time);

    }
  }
  this.HOOSelectedEmit.emit(this.HOOSelectedArray);
  //console.log(this.HOOSelectedArray)
  // console.log(this.HOOSelectedArray)
  // console.log("HOO Selected: " + JSON.stringify(this.HOOSelectedArray));
}

AllHOOSelected(time) {
  //console.log(this.HOOSelectedArray)
  
  let index = this.HOOSelectedArray.indexOf(time);
  if (index !== -1) {
    // If hour is in the array, remove it
    this.HOOSelectedArray.splice(index, 1);
    // console.log(day + " is removed from the array!");
  } else {
    // If day is not in the array, add it
    this.HOOSelectedArray.push(time);

    // console.log(day + " is added to the array!");
  }
  //console.log("HOO Selected: " + this.HOOSelectedArray);
}

ConsoleLog(variable) {
  // console.log('WORKS');
  console.log(variable);
}


sameHourChecker() {
  this.HOOSelectedArray = [
    { day: 0, times: [] }, // Sunday
    { day: 1, times: [] }, // Monday
    { day: 2, times: [] }, // Tuesday
    { day: 3, times: [] }, // Wednesday
    { day: 4, times: [] }, // Thursday
    { day: 5, times: [] }, // Friday
    { day: 6, times: [] },  // Saturday
    { day: 99, times: []} // All days
    ];
  this.sameHours = !this.sameHours;

  // this.checked = !this.checked;
}

flexHourChecker() {
  this.flexHours = !this.flexHours;
  let flexHoursObj = this.HOOSelectedArray.find(item => 'flexHours' in item);
  if (flexHoursObj) {
    flexHoursObj.flexHours = this.flexHours;
  } else {
    this.HOOSelectedArray.push({ flexHours: this.flexHours });
  }
}



}
