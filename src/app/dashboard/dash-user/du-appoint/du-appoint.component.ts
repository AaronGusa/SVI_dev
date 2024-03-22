import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppServices } from '../../../app-services/app-services.module';

@Component({
  selector: 'app-du-appoint',
  standalone: true,
  imports: [MatExpansionModule, MatButtonModule, MatSnackBarModule, DatePipe],
  templateUrl: './du-appoint.component.html',
  styleUrl: './du-appoint.component.css'
})
export class DuAppointComponent {
  username: any = ''; 
  appointments: any; 
  have_appointments: boolean = false;
  viewPastAppointments: boolean = false;
  cancelConfirm: boolean = false;
  indexNumber: number = null;
  delIndexNumber: number = null;
  deleteConfirm: boolean = false;

  showConfirmation: { [key: string]: boolean } = {};

constructor(private r: ActivatedRoute,
            private aServe: AppServices
  ) {}

async ngOnInit() {
  this.have_appointments = false;
  this.username = this.r.snapshot.paramMap.get('u_username');
  console.log('USERNAME: ' + this.username);
  this.getUserAppointments();
}

  async getUserAppointments() {
    this.appointments = await this.aServe.getUserApps(this.username);

    console.log('The appointemnts: ' + JSON.stringify(this.appointments));
    this.have_appointments = true;
  }
  
  

  viewDetails() {

  }

  viewAppointment() {
    
  }

  deleteAppointment(index: number) {
    this.delIndexNumber = index;
    this.deleteConfirm = true;
  }

  cancelAppointment(index: number) {
    this.indexNumber = index;
    this.cancelConfirm = false;
  }

  viewPastAppToggle() {
    this.viewPastAppointments = !this.viewPastAppointments;
  }

  appointStatus(status: string) {
    switch (status) {
      case "confirmed":
        return "✅"; 
      case "pending":
        return "⚠️";
      case "cancelled":
        return "❌";
      default:
        return "";
    } 
  }

  // cancelConfirmation() {
  //   this.cancelConfirm = !this.cancelConfirm;
  // }

  cancelConfirmation(index: number) {
    // console.log(panelId);
    // console.log(this.showConfirmation)
    // this.showConfirmation[panelId] = !this.showConfirmation[panelId];
    this.indexNumber = index;
    this.cancelConfirm = true;
}

  deleteRecord(index: number) {
    this.delIndexNumber = index;
    this.deleteConfirm = false;
  }


}
