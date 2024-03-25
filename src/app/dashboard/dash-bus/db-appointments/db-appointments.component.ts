import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DatePipe, getLocaleFirstDayOfWeek } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../../app-services';
import { BusinessService } from '../../../app-services';
import { UserService } from '../../../app-services';
import { ServiceService } from '../../../app-services';
import { LoadingComponent } from '../../../features/loading/loading.component';


@Component({
  selector: 'app-db-appointments',
  standalone: true,
  imports: [MatExpansionModule, MatButtonModule, MatSnackBarModule, DatePipe, LoadingComponent ],
  templateUrl: './db-appointments.component.html',
  styleUrl: './db-appointments.component.css'
})

export class DbAppointmentsComponent implements OnInit {
  username: any = '';
  userProf: any;
  busProf: any;
  isLoading: boolean = true;


  b_id: string;
  appointments: any;
  services: any;
  currentAppointments: any = [];
  pastAppointments: any = [];
  has_current_appointments: boolean = false;
  has_past_appointments: boolean = false;
  cancelConfirm: boolean = false;
  indexNumber: number = null;
  delIndexNumber: number = null;
  deleteConfirm: boolean = false;

  showConfirmation: { [key: string]: boolean } = {};
  categoriesSubscription: any;

  constructor(
    private r: ActivatedRoute,
    private aServe: AppointmentService,
    private bServe: BusinessService,
    private uServe: UserService,
    private sServe: ServiceService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.categoriesSubscription = this.sServe.fetchCategories()
      .subscribe({
        next: categories => {
          this.services = categories;
          //console.log(this.services)
        },
        error: error => {
          // Handle error
          console.log(error)
        }
   });
    this.has_current_appointments = false;
    this.has_past_appointments = false;
    this.username = this.r.parent.parent.snapshot.paramMap.get('clientUsername');
    this.getClientProfile();
    this.getServices();
  }

  async getClientProfile() {
    this.userProf = await this.uServe.fetchUsername(this.username);
    if (this.userProf.u_id) {
      this.getBusB_id(this.userProf.u_id);
    } else {
      console.log('UserProf delayed');
    }
    this.isLoading = false;
  }

  async getBusB_id(userID) {
    this.busProf = await this.bServe.fetchUserBusiness(userID);
    if (this.busProf.b_id) {
      this.getBusAppointments(this.busProf.b_id);
    }
  }

  getClientInfo(appointments) {
    appointments.forEach(async (appointment, i) => {
      const userProfile: any = await this.uServe.fetchUsername(appointment.u_username);
      if (userProfile) {
        appointment.u_fname = userProfile.u_fname;
        appointment.u_lname = userProfile.u_lname;
      }
    });
  }

  getBusAppointments(b_id) {
    this.aServe.getBusApps(b_id).subscribe((appointments) => {
      this.appointments = appointments;
      this.getClientInfo(this.appointments);
      this.getServices();
      this.filterAppointments(this.appointments);
    });
  }

  async getServices() {
    if (this.services.length > 0) {
      this.appointments.forEach((appointment, index) => { // Added index parameter
        const service = this.services.find(service => service.s_id === appointment.s_id);
        if (service) {
          this.appointments[index].s_name = service.s_name; // Assign s_name to the specific appointment object
          //console.log(service.s_name);
        }
      });
    } else {
      console.error("Services are not properly initialized or fetched.");
    }
    //console.log("S_name added? " + this.appointments);
  }s


  filterAppointments(appointments) {
    const today = new Date();

    appointments.forEach((appointment) => {
      const appointmentDate = new Date(appointment.app_date);
      if (appointmentDate >= today) {
        this.currentAppointments.push(appointment);
      } else {
        this.pastAppointments.push(appointment);
      }
    });

    this.has_current_appointments = this.currentAppointments.length > 0;
  }


  viewDetails() {}

  viewAppointment() {}

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
  }

  appointStatus(status: string) {
    switch (status) {
      case 'confirmed':
        return '✅';
      case 'pending':
        return '⚠️';
      case 'cancelled':
        return '❌';
      default:
        return '';
    }
  }

  cancelConfirmation(index: number) {
    this.indexNumber = index;
    this.cancelConfirm = true;
  }

  deleteRecord(index: number) {
    this.delIndexNumber = index;
    this.deleteConfirm = false;
  }

  confirmAppointment(index: number) {
    console.log(this.currentAppointments[index]);
  }
}
