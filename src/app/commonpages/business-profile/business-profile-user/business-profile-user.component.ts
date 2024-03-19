import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../app-services';
import { LoadingComponent } from '../../../features/loading/loading.component';

@Component({
  selector: 'app-business-profile-user',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './business-profile-user.component.html',
  styleUrl: './business-profile-user.component.css'
})
export class BusinessProfileUserComponent implements OnInit {
  @Input() bData;
  @Input() profileImages;
  @Input() b_name;
  uData: any;
  isLoading: Boolean = true;
  bArray: any;

  constructor(private uServe: UserService) {}

  async ngOnInit() {
    this.isLoading = true;
    // this.bData = Object.keys(this.bData);
    this.bArray = Object.values(this.bData);
    //console.log('BDATA:' + this.bData.u_id); 
    this.getUserData(this.bData.u_id)
  }

  async getUserData(u_id) {
    this.uData = await this.uServe.fetchUserID(u_id);  
    //console.log('This user ID: ' + JSON.stringify(this.uData))

    this.isLoading = false;
  }



}
