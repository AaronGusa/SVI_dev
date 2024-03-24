import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppServices } from '../../../app-services/app-services.module';
import { BusinessService } from '../../../app-services';
import { UserService } from '../../../app-services';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-db-appointments',
  standalone: true,
  imports: [MatExpansionModule, MatButtonModule, MatSnackBarModule, DatePipe ],
  templateUrl: './db-appointments.component.html',
  styleUrl: './db-appointments.component.css'
})
export class DbAppointmentsComponent {
  username: any = ''; 
  userProf: any;
  busProf: any;

  b_id: string;
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
            private aServe: AppServices,
            private bServe: BusinessService,
            private uServe: UserService
  ) {}

  async ngOnInit() {
    this.has_current_appointments = false;
    this.username = this.r.parent.parent.snapshot.paramMap.get('clientUsername');
    await this.getClientProfile(); // Wait for getClientProfile to finish before proceeding
  }
  
  async getClientProfile() {
    this.userProf = await this.uServe.fetchUsername(this.username); // Wait for fetchUsername to resolve
    
    if (this.userProf.u_id) {
      await this.getBusB_id(this.userProf.u_id); // Now call getBusB_id after userProf is set
    } else {
      console.log('UserProf delayed');
    }
  }
  
  async getBusB_id(userID) {
    //console.log('UserID passed in: ' + userID)
    this.busProf = await this.bServe.fetchUserBusiness(userID);
    
    if (this.busProf.b_id) {
      await this.getBusAppointments(this.busProf.b_id)
    }

  }

  async getClientInfo(appointments) {
    for (let i = 0; i < appointments.length; i++) {
      const appointment = appointments[i];
      const userProfile: any = await this.uServe.fetchUsername(appointment.u_username);
      if (userProfile) {
        appointment.u_fname = userProfile.u_fname; // Assuming 'u_fname' is the property for user first name
        appointment.u_lname = userProfile.u_lname; // Assuming 'u_lname' is the property for user last name
      }
    }
  }

  async getBusAppointments(b_id) {
    this.appointments = await this.aServe.getBusApps(b_id);
    await this.getClientInfo(this.appointments);
    //console.log('The appointemnts: ' + JSON.stringify(this.appointments));
    this.filterAppointments(this.appointments);
    //await this.getClientInfo(this.appointments);
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
