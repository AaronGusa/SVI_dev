import { Component } from '@angular/core';
import {MatExpansionModule, matExpansionAnimations} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DATE_PIPE_DEFAULT_OPTIONS, DatePipe } from '@angular/common';

@Component({
  selector: 'app-db-appointments',
  standalone: true,
  imports: [MatExpansionModule, MatButtonModule, MatSnackBarModule, DatePipe ],
  templateUrl: './db-appointments.component.html',
  styleUrl: './db-appointments.component.css'
})
export class DbAppointmentsComponent {
  pastAppointments: any[] = [
    {
      b_id: "23-001",
      u_id: "1004",
      dapp_req_created: "2024-01-25T00:00:00.000Z",
      dapp: "2024-02-14T00:00:00.000Z",
      sid_req: "2001",
      app_confirmed: "pending",
      dapp_created: null,
    },
    {
      b_id: "23-002",
      u_id: "1005",
      dapp_req_created: "2024-01-27T00:00:00.000Z",
      dapp: "2024-02-20T00:00:00.000Z",
      sid_req: "3001",
      app_confirmed: "confirmed",
      dapp_created: "2024-02-15T00:00:00.000Z",
    },
    {
      b_id: "23-003",
      u_id: "1006",
      dapp_req_created: "2024-01-30T00:00:00.000Z",
      dapp: "2024-02-08T13:00:00.000Z",
      sid_req: "1001",
      app_confirmed: "confirmed",
      dapp_created: "2024-02-02T10:00:00.000Z",
    },
    {
      b_id: "23-004",
      u_id: "1007",
      dapp_req_created: "2024-02-01T00:00:00.000Z",
      dapp: "2024-02-12T15:00:00.000Z",
      sid_req: "4001",
      app_confirmed: "rejected",
      dapp_created: null,
    },
    {
      b_id: "23-0027",
      u_id: "1127",
      dapp_req_created: "2024-02-13T00:00:00.000Z",
      dapp: "2024-02-22T11:00:00.000Z",
      sid_req: "2006",
      app_confirmed: "confirmed",
      dapp_created: "2024-02-16T14:00:00.000Z",
    },
    {
      b_id: "23-0028",
      u_id: "1128",
      dapp_req_created: "2024-02-14T00:00:00.000Z",
      dapp: "2024-02-22T11:00:00.000Z",
      sid_req: "5",
      app_confirmed: "pending",
      dapp_created: null,
    },
    {
      b_id: "23-0029",
      u_id: "1129",
      dapp_req_created: "2024-02-15T00:00:00.000Z",
      dapp: "2024-02-23T09:00:00.000Z",
      sid_req: "3002",
      app_confirmed: "confirmed",
      dapp_created: "2024-02-17T12:00:00.000Z",
    },
    {
      b_id: "23-0031",
      u_id: "1131",
      dapp_req_created: "2024-02-05T12:00:00.000Z",
      dapp: null,
      sid_req: "4008",
      app_confirmed: "rejected",
      dapp_created: null,
    },
    {
      b_id: "23-0032",
      u_id: "1132",
      dapp_req_created: "2024-02-08T07:00:00.000Z",
      dapp: "2024-02-22T10:00:00.000Z",
      sid_req: "1005",
      app_confirmed: "confirmed",
      dapp_created: "2024-02-16T08:00:00.000Z",
    },
    {
      b_id: "23-0033",
      u_id: "1133",
      dapp_req_created: "2024-02-10T16:00:00.000Z",
      dapp: "2024-02-16T12:00:00.000Z",
      sid_req: "4002",
      app_confirmed: "confirmed",
      dapp_created: "2024-02-12T11:00:00.000Z",
    },
    {
      b_id: "23-0034",
      u_id: "1134",
      dapp_req_created: "2024-02-12T09:00:00.000Z",
      dapp: "2024-02-22T11:00:00.000Z",
      sid_req: "2",
      app_confirmed: "pending",
      dapp_created: null,
    },
    {
      b_id: "23-0035",
      u_id: "1135",
      dapp_req_created: "2024-02-14T18:00:00.000Z",
      dapp: "2024-02-21T15:00:00.000Z",
      sid_req: "3002",
      app_confirmed: "confirmed",
      dapp_created: "2024-02-19T12:00:00.000Z",
    },
    {
      b_id: "23-0036",
      u_id: "1136",
      dapp_req_created: "2024-02-16T05:00:00.000Z",
      dapp: null,
      sid_req: "4010",
      app_confirmed: "pending",
      dapp_created: null,
    }
  ];
  currentAppointments: any[] = [
    {
      b_id: "23-001",
      u_id: "1004",
      dapp_req_created: "2024-01-25T00:00:00.000Z",
      dapp: "2024-02-14T00:00:00.000Z",
      sid_req: "2001",
      app_confirmed: "pending",
      dapp_created: null,
    },
    {
      b_id: "23-002",
      u_id: "1005",
      dapp_req_created: "2024-01-27T00:00:00.000Z",
      dapp: "2024-02-20T00:00:00.000Z",
      sid_req: "3001",
      app_confirmed: "confirmed",
      dapp_created: "2024-02-15T00:00:00.000Z",
    },
    {
      b_id: "23-003",
      u_id: "1006",
      dapp_req_created: "2024-01-30T00:00:00.000Z",
      dapp: "2024-02-08T13:00:00.000Z",
      sid_req: "1001",
      app_confirmed: "confirmed",
      dapp_created: "2024-02-02T10:00:00.000Z",
    },
    {
      b_id: "23-004",
      u_id: "1007",
      dapp_req_created: "2024-02-01T00:00:00.000Z",
      dapp: "2024-02-12T15:00:00.000Z",
      sid_req: "4001",
      app_confirmed: "rejected",
      dapp_created: null,
    },
    {
      b_id: "23-0027",
      u_id: "1127",
      dapp_req_created: "2024-02-13T00:00:00.000Z",
      dapp: "2024-02-22T11:00:00.000Z",
      sid_req: "2006",
      app_confirmed: "confirmed",
      dapp_created: "2024-02-16T14:00:00.000Z",
    },
    {
      b_id: "23-0028",
      u_id: "1128",
      dapp_req_created: "2024-02-14T00:00:00.000Z",
      dapp: null,
      sid_req: "5",
      app_confirmed: "pending",
      dapp_created: null,
    },
    {
      b_id: "23-0029",
      u_id: "1129",
      dapp_req_created: "2024-02-15T00:00:00.000Z",
      dapp: "2024-02-23T09:00:00.000Z",
      sid_req: "3002",
      app_confirmed: "confirmed",
      dapp_created: "2024-02-17T12:00:00.000Z",
    },
    {
      b_id: "23-0031",
      u_id: "1131",
      dapp_req_created: "2024-02-05T12:00:00.000Z",
      dapp: null,
      sid_req: "4008",
      app_confirmed: "rejected",
      dapp_created: null,
    },
    {
      b_id: "23-0032",
      u_id: "1132",
      dapp_req_created: "2024-02-08T07:00:00.000Z",
      dapp: "2024-02-22T10:00:00.000Z",
      sid_req: "1005",
      app_confirmed: "confirmed",
      dapp_created: "2024-02-16T08:00:00.000Z",
    },
    {
      b_id: "23-0033",
      u_id: "1133",
      dapp_req_created: "2024-02-10T16:00:00.000Z",
      dapp: "2024-02-16T12:00:00.000Z",
      sid_req: "4002",
      app_confirmed: "confirmed",
      dapp_created: "2024-02-12T11:00:00.000Z",
    },
    {
      b_id: "23-0034",
      u_id: "1134",
      dapp_req_created: "2024-02-12T09:00:00.000Z",
      dapp: null,
      sid_req: "2",
      app_confirmed: "pending",
      dapp_created: null,
    },
    {
      b_id: "23-0035",
      u_id: "1135",
      dapp_req_created: "2024-02-14T18:00:00.000Z",
      dapp: "2024-02-21T15:00:00.000Z",
      sid_req: "3002",
      app_confirmed: "confirmed",
      dapp_created: "2024-02-19T12:00:00.000Z",
    },
    {
      b_id: "23-0036",
      u_id: "1136",
      dapp_req_created: "2024-02-16T05:00:00.000Z",
      dapp: null,
      sid_req: "4010",
      app_confirmed: "pending",
      dapp_created: null,
    }
  ];

  viewPastAppointments: boolean = false;
  cancelConfirm: boolean = false;
  indexNumber: number = null;
  delIndexNumber: number = null;
  deleteConfirm: boolean = false;
  today = new Date;

  showConfirmation: { [key: string]: boolean } = {};

  

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
