import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../../app-services';
import { BusinessService } from '../../../app-services';
import { Router } from '@angular/router';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { LoadingComponent } from '../../../features/loading/loading.component';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-bus-sign',
  standalone: true,
  imports: [MatCheckboxModule, 
            LoadingComponent, 
            MatFormFieldModule, 
            MatStepperModule, 
            ReactiveFormsModule, 
            MatInputModule,
            MatCardModule,
            MatExpansionModule],
  templateUrl: './bus-sign.component.html',
  styleUrl: './bus-sign.component.css'
})
export class BusSignComponent {
  @Input() _foundUser: number;
  services: any[] = [];
  categories: any[] = [];
  selectedCategories: number[] = [];
  filteredServices: any[] = [];
  isLoading: boolean = false;
  duration: 1500;
  busServices: number[] = [];

  //form control
  bus_contact_form: FormGroup = this._formBuilder.group({busContactCtrl: ['']});
  bus_add_form: FormGroup = this._formBuilder.group({busAddCtrl: ['']});
  bus_signup_form: FormGroup
  busForm: FormGroup;

  constructor(private servService: ServiceService,
    private _formBuilder: FormBuilder,
    private busService: BusinessService,
    private r: Router) {}

ngOnInit() {
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

async fetchCategories() {
  this.isLoading = true;
  this.categories = await this.servService.fetchCategories().toPromise();
  this.isLoading = false;
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
    this.busForm.patchValue({
      b_id:"tbd",
      b_active: true,
      b_rating: -1,
      u_id: this._foundUser,
      created: new Date(),
      services: this.busServices
    });

    console.log(this.busServices);

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
    //console.log('this.busForm.value: ', this.busForm.value);
    this.isLoading = true;
    const posted = await this.busService.postBusiness(this.busForm.value);
    console.log('Business Posted: ', posted);
    
    this.isLoading = false;
    this.r.navigate(['/login']);  
  } catch (error) {
    console.error('Error Posting Business: ', error);
  }
}
}
