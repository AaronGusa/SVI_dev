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
  currentAppointments: any = [];
  pastAppointments: any = [];
  has_current_appointments: boolean = false;
  has_past_appointments: boolean = false;
  cancelConfirm: boolean = false;
  indexNumber: number = null;
  delIndexNumber: number = null;
  deleteConfirm: boolean = false;

  showConfirmation: { [key: string]: boolean } = {};

constructor(private r: ActivatedRoute,
            private aServe: AppServices
  ) {}

async ngOnInit() {
  this.has_current_appointments = false;
  // console.log(this.r)
  this.username = this.r.parent.snapshot.paramMap.get('clientUsername');
  // console.log('USERNAME: ' + this.username);
  this.getUserAppointments();
}

  async getUserAppointments() {
    this.appointments = await this.aServe.getUserApps(this.username);

    // console.log('The appointemnts: ' + JSON.stringify(this.appointments));
    this.filterAppointments(this.appointments)
  }
  
  filterAppointments(appointments) {
    const today = new Date();
    

    appointments.forEach(appointment => {
        const appointmentDate = new Date(appointment.app_date);
        if (appointmentDate >= today) {
            this.currentAppointments.push(appointment);
        } else {
            this.pastAppointments.push(appointment);
        }
    });

    if (this.pastAppointments.length === 0) {
      this.has_past_appointments = false;
    } else {
      this.has_past_appointments = true;
    }

    if (this.currentAppointments.length === 0) {
      this.has_current_appointments = false;
      
    } else {
      this.has_current_appointments = true;
    }
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
    this.has_past_appointments = !this.has_past_appointments;
    // console.log(this.has_past_appointments)
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
    // // console.log(panelId);
    // // console.log(this.showConfirmation)
    // this.showConfirmation[panelId] = !this.showConfirmation[panelId];
    this.indexNumber = index;
    this.cancelConfirm = true;
}

  deleteRecord(index: number) {
    this.delIndexNumber = index;
    this.deleteConfirm = false;
  }


}
